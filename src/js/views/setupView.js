import {
    elements,
    elementStrings
} from './base';

//*******************************
//********** PAGE1 **************
//*******************************/

// Checks the amount of players names textboxes that are not empty, and returns the count
export const checkPlayersNames = () => {
    let count = 0;
    $('input[type=text]').each(function () {
        if (this.classList.contains(elementStrings.playerName) && this.value !== "") {
            count++;
        }
    })
    return count;
};

// Insert a new textbox for a new player
export const addPlayer = (id) => {
    const markup = `
    <div class="new-player" id="new_player-${id}">
        <input type="text" placeholder="Player's name" class="player-name" id="player-${id}">
        <span class="btn-delete btn-delete-player" id="btn_delete_player-${id}">
            <i class="far fa-times-circle"></i>
        </span>
    </div>
    `;
    elements.playersList.insertAdjacentHTML('beforeend', markup);

};

export const updateTeams = (count) => {
    document.getElementById('id-teams').innerHTML = count;
};

export const updateTimer = (time) => {
    document.getElementById('id-timer').innerHTML = convertSecToMinString(time);
};

export const updateMinInputs = (count) => {
    document.getElementById('min-inputs').innerHTML = count;
};

export const updateNumOfPhotos = (count) => {
    document.getElementById('numOfPhotos').innerHTML = count;
};

const convertSecToMinString = (seconds) => {
    const min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    if (sec == 0) sec = '00';
    return `${min}:${sec}`;
};

export const getPlayersNames = () => {

    const playersList = Array.from(elements.playersNames).map(player => [player.value, player.id.split('-')[1]]);
    return playersList;
};

//*******************************
//********** PAGE2 **************
//*******************************/


export const createNamesDisplay = (element, firstName, secondName, thirdName, color = '#99999999') => {
    // Clear display
    element.innerHTML = '';
    const markup = `
    <div class="name-left col-sm">
        <h5 class="title t-disabled" style="color:${color};">${firstName}</h5>
    </div>
    <div class="name-center col-sm">
        <h5 class="title" id="label-mainName">${secondName}</h5>
    </div>
    <div class="name-right col-sm">
        <h5 class="title t-disabled">${thirdName}</h5>
    </div>
    `;
    element.insertAdjacentHTML('beforeend', markup);
}

export const addGuessToList = (guess, id) => {
    const markup = `
    <div class="guess-item item" id="guess-${id}">
        <div class="guess-title">${guess}</div>
        <span class="btn-delete btn-delete-guess" id="btn_delete_guess-${id}">
            <i class="far fa-times-circle"></i>
        </span>
    </div>
    `;
    elements.playersGuessList.insertAdjacentHTML('beforeend', markup);
}

export const deleteGuess = (guessID) => {
    const element = document.getElementById('guess-' + guessID);
    element.parentNode.removeChild(element);
}

export const changeGuessCounterColor = color => {
    if (color === 'red') {
        elements.guessCountLabel.style.cssText = "border-color: rgb(255, 132, 132); background-color: rgba(255, 132, 132, 0.5);";
    } else if (color === 'green') {
        elements.guessCountLabel.style.cssText = "border-color: #28a745; background-color: #28a74631;";
    }
}

export const clearPage2 = () => {
    // Change UI : clear guesses, counter and counter's color
    elements.guessCountLabel.innerHTML = '0';
    changeGuessCounterColor('red');
    elements.playersGuessList.innerHTML = '';
    elements.textboxAddGuess.value = '';
    elements.textboxAddGuess.focus();
}

// group is a querySelectorAll object of all the pages
// page is the page we want visible
export const showPage = (page, group) => {
    const resultsArr = Array.from(group);
    resultsArr.forEach(el => {
        el.style.display = 'none';
    });

    page.style.display = 'block';
}

//*******************************
//********** PAGE3 **************
//*******************************/

export const clearPage3 = (players) => {
    // Clear previous team players
    elements.teamsPlayers.innerHTML = '';
    
    // Add team players
    Array.from(players).forEach(player => {
        addPlayerToList(player.name, player.id);
    });

    // Clear textbox / focus / color plate 
    elements.textboxTeamsName.value = '';
    elements.textboxTeamsName.style.borderColor = elementStrings.colorRed;
    elements.textboxTeamsName.focus();
    document.getElementById('teamsColor').style.backgroundColor = '#ffffff';
    document.getElementById('teams-players').style.color = '#ffffff';
}

export const addPlayerToList = (name, id) => {
    const markup = `
    <div class="guess-item item" id="team_player-${id}">
        <div class="guess-title">${name}</div>
    </div>
    `;
    elements.teamsPlayers.insertAdjacentHTML('beforeend', markup);
}