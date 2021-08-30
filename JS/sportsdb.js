const searchTeam = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.teams))
}
const displaySearchResult = teams => {
    const searchResult = document.getElementById('search-result');
    for (const team of teams) {
        console.log(team)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div onclick="displaySingleTeam()" class="card h-100">
        <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${team.strStadium}</h5>
            <p class="card-text">${team.strStadiumDescription.slice(0, 150)}</p>
        </div>
    </div>
      `;
        searchResult.appendChild(div);
    }
}