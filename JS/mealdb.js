const errorCorrection = document.getElementById('error-correction');
const errorSearch = document.getElementById('error-search');
errorCorrection.style.display = 'none';
errorSearch.style.display = 'none';
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const singleMeal = document.getElementById('single-meal');
    const searchResult = document.getElementById('search-result');
    let searchText = searchField.value;
    if (searchField.value == '') {
        errorSearch.style.display = 'block';
        errorCorrection.style.display = 'none';
        searchResult.innerHTML = '';
    }
    else {
        errorCorrection.style.display = 'none';
        errorSearch.style.display = 'none';
        singleMeal.innerHTML = '';
        searchField.value = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error))
    }

}
const displayError = error => {
    errorCorrection.style.display = 'block';
    errorSearch.style.display = 'none';
}
const displaySearchResult = (meals) => {
    /*  if (meals.length = '') {
         const errorCorrection = document.getElementById('error-correction');
         errorCorrection.style.display = 'block';
     } */

    // console.log(meals);
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';

    for (const meal of meals) {
        console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
    </div>
      `;
        searchResult.appendChild(div);
    }
}
const loadMealDetails = (mealId) => {
    // console.log(mealId);
    const urlMealId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(urlMealId)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
}
const displayMealDetails = (meal) => {
    console.log(meal);
    const singleMeal = document.getElementById('single-meal');
    singleMeal.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    // div.style.width = '18rem';
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        <a href="${(meal.strYoutube)}" class="btn btn-primary font-monospace">Watch Video</a>
    </div>
    `;
    singleMeal.appendChild(div);
}