import {elements} from './base';

export const roundMsg = round => {
    if (round === 1){
        return "Round 1: Try revealing to your teammates the name that pops up through any means except telling them the name itself or a very similar name";
    }
    if (round === 2) {
        return "Round 2: Try revealing to your teammates the name that pops up through pantomime. Remember, you CANNOT say a word :)";
    }
    if (round === 3) {
        return "Final round: Try revealing to your teammates the name that pops up while only using one word, after saying that word, you cannot say another word untill the time is up.";     
    }
}

export const setupNamesDisplay = (name1, color1, name2, color2, teamName, name3, color3) => {
    // Clear display
    elements.inGamePlayersDisplay.innerHTML = '';
    const color1fade = color1 + '88';
    const color3fade = color3 + '88';
    const markup = `
        <div class="name-left col-sm">
            <h5 class="title t-disabled" style="color:${color1fade};">${name1}</h5>
        </div>
        <div class="name-center col-sm">
            <h5 class="title" id="label-mainName" style="color:${color2};">[${teamName}] ${name2}</h5>
        </div>
        <div class="name-right col-sm">
            <h5 class="title t-disabled" style="color:${color3fade};">${name3}</h5>
        </div>
        `;
    elements.inGamePlayersDisplay.insertAdjacentHTML('beforeend', markup);
}

export const clearGameBoard = (teamScore, timer, currPlayerName) => {
    // Clear player score and insert team score
    Array.from(elements.inGamePlayerScore).forEach(el => el.innerHTML = 0);
    Array.from(elements.inGameTeamScore).forEach(el => el.innerHTML = teamScore);

    // Reset timer
    elements.inGameTimer.innerHTML = convertSecToMinString(timer);

    // Clear previous guesses and photo
    elements.inGameNameToGuess.innerHTML = '';
    elements.inGamePhoto0.setAttribute('src', '');
    elements.inGamePhoto1.setAttribute('src', '');
    elements.inGamePhoto2.setAttribute('src', '');

    Array.from(elements.playerNameScore).forEach(el => {
        el.innerHTML = currPlayerName.toUpperCase() + '\'S SCORE';
    });
}

export const addPointToPlayer = (playerScore, teamScore) => {
    Array.from(elements.inGamePlayerScore).forEach(el => el.innerHTML = playerScore);
    Array.from(elements.inGameTeamScore).forEach(el => el.innerHTML = teamScore);
}

// For the timer
export const convertSecToMinString = (seconds) => {
    const min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    if (sec < 10) sec = '0' + sec;
    return `${min}:${sec}`;
};

// Swap photos when there are more than 1 photo in settings
export const swapPhotos = index => {
    const tempSrc = elements.inGamePhoto0.src;
    if (index === 1) {
        elements.inGamePhoto0.src = elements.inGamePhoto1.src;
        elements.inGamePhoto1.src = tempSrc;
    }
    if (index === 2) {
        elements.inGamePhoto0.src = elements.inGamePhoto2.src;
        elements.inGamePhoto2.src = tempSrc;
    }
}

export const renderTeamResultsRest = (place, team) => {
    const markup = `
    <br>
    <div class="results-team-title">
        ${place}.
    </div>
    <div class="results-team-title" id="team-name_${team.id}">
        ${team.name}
    </div>
    <div class="results-score">
        SCORE
    </div>
    <div class="results-score" id="results-team-score_${team.id}">
        ${team.score}
    </div>
    <div class="results-show-more" id="btn-results-more_${team.id}">
            <i class="fas fa-arrow-alt-circle-down"></i>
    </div>

    <div class="container res-team-container" style="display: none" id="res-team-more_${team.id}">
        <table class="table table-dark table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody id="team-table_${team.id}">
                
            </tbody>
        </table>
    </div>
    
    `;
    document.getElementById('results-rest-teams').insertAdjacentHTML('beforeend', markup);
    renderTeamResults(document.getElementById(`team-table_${team.id}`), team);
}

export const renderTeamResults = (element, team) => {

    let markup = ``;
    for (let i = 0; i < team.players.length; i++) {
        markup += renderPlayerResults(team.players[i]);
    }
    element.innerHTML = markup;
}

const renderPlayerResults = player => {
    const markup = `
    
    <tr>
        <td>${player.name}</td>
        <td>${player.score}</td>
        <td><i class="fas fa-info-circle" data-toggle="collapse" data-target=".results-player_${player.id}"></i></td>
    </tr>
    <tr>
        <td colspan="3" class="hiddenRow">
            <div class="collapse results-player_${player.id} hiddenRow">
                <table class="table">
                    <thead>
                    </thead>
                    <tbody class="tbody-details">
                        ${renderPlayersStats(player.bucket)}

                    </tbody>
                </table>

            </div>
        </td>
    </tr>

    `;
    return markup;
}

const renderPlayersStats = bucket => {
    let markup = ``;
    if (bucket.length === 0) {
        markup = `<tr><td>Player score is 0 - no stats</td></tr>`;
    } else if (bucket.length > 0) {
        for (let i = 0; i < bucket.length; i++) {
            markup += `
            <tr>
                <td>Stage ${bucket[i].stage}</td>
                <td>${convertSecToMinString(bucket[i].time)}</td>
                <td>${bucket[i].guess.guess}</td>
            </tr>
            `;
        }

    }
    return markup;

}