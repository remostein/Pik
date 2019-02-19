import Game from './models/Game';
import Setup from './models/Setup';
import Player from './models/Player';
import Guess from './models/Guess';
import Team from './models/Team';
import {
    elements,
    elementStrings
} from './views/base';
import * as setupView from './views/setupView';
import * as gameView from './views/gameView';
import Settings from './models/Settings';

/**
 * GAME CONTROLLER
 */

//*******************************
//********** PAGE1 **************
//*******************************/

// 1. Init
const init = () => {
    console.log('Application has started');
    // enable tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    // 1.1 Reveal page 1
    document.getElementById('page1').style.display = 'block';
    setupDefaultEventListeners();
    elements.player0.focus();

}

// 2. ADD event listeners to:
// 2.1 Input text players names
const setupDefaultEventListeners = () => {
    // Players names default Textboxes 
    Array.from(elements.playersNames).forEach(textbox => {
        setupTextboxColorEventListener(textbox, elements.btnNextPage1, enableBtn, checkPlayersNames, disableBtn);
        setupTextboxHoverBtnDeleteEventListener(textbox);
        setupBtnDeletePlayerEventListener(textbox.nextElementSibling);
    });

    // 2.2 Set event listener for add-player button
    elements.btnAddPlayer.addEventListener('click', () => {
        const playerID = setup.playerID;
        // add player textbox to UI
        setupView.addPlayer(playerID);
        disableBtn(elements.btnNextPage1);
        setup.playerID++;
        settings.playersCount++;

        // Set event listener for textbox and delete button
        const newPlayerTextbox = document.getElementById(elementStrings.playerTextboxID + playerID);
        setupTextboxColorEventListener(newPlayerTextbox, elements.btnNextPage1, enableBtn, checkPlayersNames, disableBtn);
        setupTextboxHoverBtnDeleteEventListener(newPlayerTextbox);

        const newPlayerBtnDelete = document.getElementById(elementStrings.btnDeletePlayerID + playerID);
        setupBtnDeletePlayerEventListener(newPlayerBtnDelete);

        // Add focus to new textbox
        newPlayerTextbox.focus();
    });

    // 2.3 Set event listener for Next button
    elements.btnNextPage1.addEventListener('click', () => {
        if (!elements.btnNextPage1.classList.contains('disabled')) {
            moveToPage2();
            setup.currentPage = 2;
        }
    });

    // 2.4 Set Settings event listeners
    setupSettingsEventListeners();

    // 2.5 Set event listeners for NavBar
    // Set active TAB

    $("nav .nav-link").on("click", function () {

        // Highlight tab only if it's not restart tab
        if (this.id !== "restart-tab") {
            $(".nav-item").find(".active").removeClass("active");
            $(this).addClass("active");
        }
    });

    // Settings Tab
    elements.settingsTab.addEventListener('click', () => {
        initSettings(setup.currentPage);
        setupView.showPage(elements.settingsPage, elements.gameContainers);

    });

    // Game Tab
    elements.gameTab.addEventListener('click', () => {
        setupView.showPage(document.getElementById(`page${setup.currentPage}`), elements.gameContainers);
    });

    // Rules Tab
    elements.rulesTab.addEventListener('click', () => {
        setupView.showPage(elements.rulesPage, elements.gameContainers);
    });

    // Restart Tab
    elements.restartTab.addEventListener('click', () => {
        $("#restart-modal").modal('show');
    });

    // Modal restart buttons event listeners
    $("#modal-btn-restart-yes").on("click", function () {
        $("#restart-modal").modal('hide');
        window.location.href = window.location.pathname + window.location.search + window.location.hash;
    });

    $("#modal-btn-restart-no").on("click", function () {
        $("#restart-modal").modal('hide');

    });
};

const setupSettingsEventListeners = () => {

    // 2.4 Set event listener for min input / teams / time / back buttons
    elements.btnsTeams.addEventListener('click', e => {
        if (e.target.matches('#btn-teams-up, .fa-angle-double-up')) {
            settings.updateTeams('up');
        }
        if (e.target.matches('#btn-teams-down, .fa-angle-double-down')) {
            settings.updateTeams('down');
        }
        setupView.updateTeams(settings.teamsCount);
    });

    elements.btnsTimer.addEventListener('click', e => {
        if (e.target.matches('#btn-timer-up, .fa-angle-double-up')) {
            settings.updateTimer('up');
        }
        if (e.target.matches('#btn-timer-down, .fa-angle-double-down')) {
            settings.updateTimer('down');
        }
        setupView.updateTimer(settings.timer);
    });

    elements.btnsMinInputs.addEventListener('click', e => {
        if (e.target.matches('#btn-min-inputs-up, .fa-angle-double-up')) {
            settings.updateMinInputs('up');
        }
        if (e.target.matches('#btn-min-inputs-down, .fa-angle-double-down')) {
            settings.updateMinInputs('down');
        }
        setupView.updateMinInputs(settings.minInputsPP);
    });

    elements.btnsNumOfPhotos.addEventListener('click', e => {
        if (e.target.matches('#btn-numOfPhotos-up, .fa-angle-double-up')) {
            settings.updateNumOfPhotos('up');
        }
        if (e.target.matches('#btn-numOfPhotos-down, .fa-angle-double-down')) {
            settings.updateNumOfPhotos('down');
        }
        setupView.updateNumOfPhotos(settings.numOfPhotos);
    });

    // jQuery selector for the checkboxes
    $('#enable-pause-btn').change(function () {
        if ($(this).is(':checked')) {
            settings.setPause(true);
        } else {
            settings.setPause(false);
        }
    });

    $('#enable-skip-btn').change(function () {
        if ($(this).is(':checked')) {
            settings.setSkip(true);
        } else {
            settings.setSkip(false);
        }
    });

    $('#enable-countdown-btn').change(function () {
        if ($(this).is(':checked')) {
            settings.setCountdown(true);
        } else {
            settings.setCountdown(false);
        }
    });

    setupBackButton();
};

// Setupr for all the back buttons in the app (all point back to the game)
const setupBackButton = () => {

    Array.from(elements.btnsBack).forEach(btn => {
        btn.addEventListener('click', () => {
            setupView.showPage(document.getElementById(`page${setup.currentPage}`), elements.gameContainers);
            $(".nav-item").find(".active").removeClass("active");
            $("#game-tab").addClass("active");
        });
    });
};

// Checks the current page and shows settings accordingly
const initSettings = (curPage) => {
    if (curPage >= 2) {
        alert('In order to see all settings options, please read the RULES')
        document.querySelector('.set-min-inputs').style.display = 'none';
    }

    if (curPage >= 3) {
        document.querySelector('.set-timer').style.display = 'none';
        document.querySelector('.set-teams').style.display = 'none';
        document.querySelector('#random-teams-toggle').style.display = 'none';
    }
}

// Recive a textbox, a btn and 2 functions, the first function enable the btn and the other disable the btn
const setupTextboxColorEventListener = (textbox, btn, funcEnable, condition, funcDisable) => {
    textbox.addEventListener('input', () => {
        // if input is not empty than change color to green
        if (textbox.value !== "") {
            textbox.style.borderColor = elementStrings.colorGreen;
            // check if all players have names
            funcEnable(btn, condition);
        } else {
            // if textbox is not filled, change border color to red and disable next button
            textbox.style.borderColor = elementStrings.colorRed;
            funcDisable(btn);
        }
    });
};

// Setup the event listener for SHOWING the delete player buttons, when settings.playersCount > settings.minPlayers
const setupTextboxHoverBtnDeleteEventListener = (textbox) => {
    const elementID = textbox.id.split('-')[1];
    // Get the delete btn of this textbox
    const element = document.getElementById(elementStrings.btnDeletePlayerID + elementID);
    // Display delete btn when mouse enters textbox area
    textbox.addEventListener('mouseenter', () => {
        if (settings.playersCount > settings.minPlayers) {
            element.style.display = 'inline-block';
        }
    });

    // Hide delete btn when mouse leaves textbox's parent area
    element.parentElement.addEventListener('mouseleave', () => {
        element.style.display = 'none';
    });
};

// Enabling deletion of players only if the team count is enough
// ((settings.playersCount - 1) / settings.teamsCount) >= 2
const setupBtnDeletePlayerEventListener = (btn) => {
    const elementID = btn.id.split('-')[1];
    btn.addEventListener('click', () => {
        // clear textbox from UI
        if (((settings.playersCount - 1) / settings.teamsCount) >= 2) {
            const element = document.getElementById(elementStrings.newPlayerTextboxID + elementID);
            element.parentNode.removeChild(element);
            settings.playersCount--;
            enableBtn(elements.btnNextPage1, checkPlayersNames);
        } else {
            alert(`Cannot delete player, must decrement teams: ${settings.playersCount} players and ${settings.teamsCount} teams. Current players per team : ${settings.playersCount / settings.teamsCount} `);
        }
    });
}

// A boolean function to pass as an argument with enableBtn
const checkPlayersNames = () => {
    if (settings.playersCount === setupView.checkPlayersNames()) {
        return true;
    } else return false;
}

// 3. Enable button
// Checks if btn (next) can be enabled to allow to move to next page
const enableBtn = (btn, condition) => {
    if (typeof (condition) === "boolean") {
        if (condition) {
            btn.classList.remove('disabled');
        }
    } else {
        if (condition()) {
            btn.classList.remove('disabled');
        }
    }

};

const disableBtn = btn => {
    if (!btn.classList.contains('disabled')) {
        btn.classList.add('disabled');
    }
};


//*******************************
//********** PAGE2 **************
//*******************************/

const moveToPage2 = () => {
    // 4. Setup page2
    // 4.1. Add to setup players list
    const playersList = setupView.getPlayersNames();
    setup.setPlayersList(playersList);
    // Set current player
    setup.setCurrentPlayer(setup.playersList.list[0]);
    // 4.2 Create players names to display
    setupView.createNamesDisplay(elements.playersNamesDisplay, '', setup.playersList.list[0].name, setup.playersList.list[1].name);
    // 4.3 Clear page
    setupView.clearPage2();
    // 4.4 Set event listener for page 2
    setupEventlisteners2();

    // Reveal page2
    document.getElementById(elementStrings.page1).style.display = 'none';
    document.getElementById(elementStrings.page2).style.display = 'block';
};

const setupEventlisteners2 = () => {
    // Set event listener to color guess textbox
    setupTextboxColorEventListener(elements.textboxAddGuess, elements.btnAddGuess, enableBtn, true, disableBtn);
    // Set event listener to btn ADD GUESS
    elements.btnAddGuess.addEventListener('click', () => {
        if (!elements.btnAddGuess.classList.contains('disabled'))
            addNameToGuess(setup.getCurrentPlayer());
    });

    // Setup btn Next player classList (depends on min inputs)
    if (settings.minInputsPP > 0) {
        elements.btnNextPage2.classList.add('disabled');
    }

    // Set event listener to btn NEXT PLAYER
    elements.btnNextPage2.addEventListener('click', () => {

        if (!elements.btnNextPage2.classList.contains('disabled')) {
            // Save the current player guesses
            setup.guessList.push(...setup.getCurrentPlayer().guessList);
            // Fetch guess images

            setup.getCurrentPlayer().fetchGuessesImg();

            // Check if there is one more player
            if (setup.playersList.isNextPlayer()) {
                // Set the new current player
                setup.setCurrentPlayer(setup.playersList.getNextPlayer());
                // Clear page for next player
                setupView.clearPage2();
                const curIndex = setup.playersList.getCurrentIndex();
                const list = setup.playersList.list;
                // Check if there are two more players
                if (setup.playersList.isNextPlayer(1)) {
                    // Rotate players names display  
                    runAnimation(elements.playersNamesDisplay, "run-animation-left", 1000, setupView.createNamesDisplay, [elements.playersNamesDisplay, list[curIndex - 1].name, list[curIndex].name, list[curIndex + 1].name]);

                } else {
                    // Rotate players names display and change next button text to done
                    elements.btnNextPage2.innerHTML = 'Done';
                    runAnimation(elements.playersNamesDisplay, "run-animation-left", 1000, setupView.createNamesDisplay, [elements.playersNamesDisplay, list[curIndex - 1].name, list[curIndex].name, '']);
                }

            } else {
                // End of players list - 
                // Setup game - teams, current player, bucket for guesses + randomize
                // Clears previous players name display for future use.
                elements.playersNamesDisplay.innerHTML = '';
                setup.currentPage = 3;
                moveToPage3();
            }
        }
    });
}

const addNameToGuess = (currentPlayer) => {
    // Add name to guess to Game's Guess List
    const guess = elements.textboxAddGuess.value;
    const checkIfExist = currentPlayer.guessList.findIndex(el => el.guess.toLowerCase() === guess.toLowerCase());
    // Check if guess exist for current player
    if (checkIfExist === -1) {
        // Add guess to player's guess list
        const guessID = currentPlayer.addGuessToList(guess);
        // Add name to guess to UI
        setupView.addGuessToList(guess, guessID);
        // Set event listener for delete button
        document.getElementById(elementStrings.btnDeleteGuess + guessID).addEventListener('click', () => {
            const check = deleteGuess(guessID, currentPlayer);
            if (check) {
                // Update guess count Label
                elements.guessCountLabel.innerHTML = currentPlayer.getGuessListLength();
            }
        });
    } else alert('guess already exist');

    // Clear textbox
    elements.textboxAddGuess.value = '';
    elements.textboxAddGuess.style.borderColor = elementStrings.colorRed;
    elements.textboxAddGuess.focus();

    // Disable Add guess btn
    disableBtn(elements.btnAddGuess);

    // Update guess count Label
    elements.guessCountLabel.innerHTML = currentPlayer.getGuessListLength();

    // Update guess count color if passed the min guesses
    if (currentPlayer.getGuessListLength() >= settings.minInputsPP) {
        setupView.changeGuessCounterColor('green');
        enableBtn(elements.btnNextPage2, true);
    } else {
        setupView.changeGuessCounterColor('red');
        disableBtn(elements.btnNextPage2);
    }
};

const deleteGuess = (guessID, currentPlayer) => {
    if (currentPlayer.deleteGuess(guessID) == -1) {
        alert('could not delete from database');
        return false;

        // Deletion succeed from game data
    } else {
        setupView.deleteGuess(guessID);

        // Update guess count color if is less than the min guesses
        if (currentPlayer.getGuessListLength() < settings.minInputsPP) {
            setupView.changeGuessCounterColor('red');
            disableBtn(elements.btnNextPage2);
        }
        return true;
    }
}

// runs animation on elements for time seconds, while executing func(...arg) after time has passed
const runAnimation = (element, animation, time, func, args) => {
    "use strict";
    element.classList.add(animation);
    setTimeout(() => {
        func(...args);
        element.classList.remove(animation);
        void element.offsetWidth;
    }, time);
}


//*******************************
//********** PAGE3 **************
//*******************************/

const moveToPage3 = () => {
    // Create Teams based on teams count and playersList
    setup.prepareGame(settings.isRandTeams, settings.teamsCount);

    // Show teams / teams name
    setup.setCurrentTeam(setup.teamsList[0]);

    // Setup teams Display
    setupView.createNamesDisplay(elements.teamsNamesDisplay, '', setup.teamsList[0].name, setup.teamsList[1].name);

    // Setup event listeners for page3
    setupEventListeners3();

    // ClearPage3 and prep with players names
    setupView.clearPage3(setup.currentTeam.players);

    // Reveal page3
    document.getElementById(elementStrings.page2).style.display = 'none';
    document.getElementById(elementStrings.page3).style.display = 'block';
}

const setupEventListeners3 = () => {

    //Add event listener to Teams name textbox (color)
    setupTextboxColorEventListener(elements.textboxTeamsName, elements.btnNextPage3, enableBtn, true, disableBtn);

    //Add event listener to Teams name textbox (name change)
    elements.textboxTeamsName.addEventListener('input', () => {
        document.getElementById('label-mainName').innerHTML = elements.textboxTeamsName.value;
    });

    //Change color using jscolor
    $(document).on('change', '#teamsColor', function () {
        //document.getElementById('teamsColor').value = '';
        $("#label-mainName").css('color', '#' + this.jscolor.styleElement.attributes.value.value);
        $("#teams-players").css('color', '#' + this.jscolor.styleElement.attributes.value.value);
    });

    //Add event listener to NEXT TEAM BTN
    elements.btnNextPage3.addEventListener('click', () => {
        // If next Team is not disabled
        if (!elements.btnNextPage3.classList.contains('disabled')) {
            // Set teams name and color (save)
            setup.currentTeam.setColor('#' + elements.teamsColor.jscolor.styleElement.attributes.value.value);

            // Making the color fade for previous team name display
            const color = '#' + elements.teamsColor.jscolor.styleElement.attributes.value.value + '88';
            const name = elements.textboxTeamsName.value;
            setup.currentTeam.setName(name);
            const curTeamIndex = setup.currentTeam.id;

            //     Team name display function     //
            // More than 1 team ahead
            if (setup.currentTeam.id !== setup.teamsList.length - 1) {

                if (setup.currentTeam.id === setup.teamsList.length - 2) {
                    // One team before the last one
                    runAnimation(elements.teamsNamesDisplay, "run-animation-left", 1000, setupView.createNamesDisplay, [elements.teamsNamesDisplay, name, setup.teamsList[curTeamIndex + 1].name, '', color])
                    //Change next team button to Done
                    elements.btnNextPage3.innerHTML = 'DONE';
                } else {
                    //More than 2 teams ahead
                    runAnimation(elements.teamsNamesDisplay, "run-animation-left", 1000, setupView.createNamesDisplay, [elements.teamsNamesDisplay, name, setup.teamsList[curTeamIndex + 1].name, setup.teamsList[curTeamIndex + 2].name, color])

                }
                // Set page3 for next team - display players list and teams name
                setup.setCurrentTeam(setup.teamsList[curTeamIndex + 1])
                setTimeout(() => {
                    setupView.clearPage3(setup.currentTeam.players);
                }, 1000);

            } else {
                // Last team - Setup has ended //
                // Reset current team / player
                setup.setCurrentTeam(setup.teamsList[0]);
                // Clear teams name display for future use
                elements.teamsNamesDisplay.innerHTML = '';
                // Move to page 4
                setup.currentPage = 4;
                moveToPage4();
            }
        }
    });
};


//*******************************
//********** PAGE4 **************
//*******************************/

const moveToPage4 = () => {
    // Create a game object
    //////////// uncomment when done testing 

    game = new Game(setup.teamsList, setup.guessList, settings);
    setup.currentPage = 4;

    // Set event listeners
    setupEventListeners4(game);

    // Set first team
    game.setCurrentTeam(game.teamsList[0]);

    // Set for all teams current player - their first player
    game.teamsList.forEach(el => el.setCurrentPlayer(el.players[0]));

    // Set game current player
    game.setCurrentPlayer(game.currentTeam.players[0]);

    // Main game UI setup names display
    gameView.setupNamesDisplay('', '', game.teamsList[0].currentPlayer.name, game.teamsList[0].color, game.teamsList[0].name, game.teamsList[1].currentPlayer.name, game.teamsList[1].color);
    gameView.clearGameBoard(0, game.settings.timer, game.currentPlayer.name);

    // Reveal page4
    document.getElementById(elementStrings.page3).style.display = 'none';
    document.getElementById(elementStrings.page4).style.display = 'block';
    showRulesForNextRound();

    console.log(game);
}

const setupEventListeners4 = () => {
    // Start BUTTON
    elements.btnStart.addEventListener('click', () => {

        if(game.guessList.length === 0) {
            alert("Cannot start game without any names to guess, soon we'll add automatic name generator, but untill then, please press RESTART");
        } else {

            game.isRunning = true;

            // Hide Start btn and Show other buttons
            elements.btnStart.style.display = 'none';
    
            for (let i = 0; i < settings.numOfPhotos; i++) {
                document.getElementById('guessPhoto' + i).setAttribute('src', game.mixedGuessList[game.currGuessIndex].img[i]);
                document.getElementById('guessPhoto' + i).style.display = 'none';
            }
    
            // Setting timeOffset for countdown settings (if ON or OFF)
            let timeOffset = 0;
            if (settings.isCountdown) {
                // Start countdown
                getReady(3);
                timeOffset = 4000;
            } else {
                // Start timer
                startTimer(game.settings.timer);
                elements.countdownLabel.style.display = 'none';
            }
    
            // What happens after the countdown is finished
            setTimeout(() => {
                // Player's starts his turn here
                displayGuess();
                elements.btnGotit.style.display = 'inline-block';
                if (game.settings.isPauseEnable) {
                    elements.btnPause.style.display = 'inline-block';
                    game.setPause(false);
                }
                if (game.settings.isSkipEnable) {
                    elements.btnSkip.style.display = 'inline-block';
                }
            }, timeOffset);

        }

    });

    // GOT IT BUTTON
    elements.btnGotit.addEventListener('click', async () => {
        if (game.isRunning) {

            // Add correct guess to players bucket with time
            game.currentPlayer.addCorrectGuess(game.currStage, game.currTime, game.mixedGuessList[game.currGuessIndex]);

            // inc player and team score
            game.currentPlayer.score++;
            game.currentTeam.score++;

            // inc player and team score UI
            gameView.addPointToPlayer(game.currentPlayer.score, game.currentTeam.score);

            // Move and show next guess
            game.currGuessIndex++;
            if (game.currGuessIndex < game.mixedGuessList.length) {
                displayGuess();
            } else {
                game.isRunning = false;
            }
        }
    });

    // SKIP BUTTON (optional)
    elements.btnSkip.addEventListener('click', () => {
        game.currGuessIndex++;
        if (game.currGuessIndex < game.mixedGuessList.length) {
            displayGuess();
        } else {
            game.isRunning = false;
        }
    });

    // PAUSE BUTTON (optional)
    elements.btnPause.addEventListener('click', () => {
        if (game.isPaused) {
            // Game is already paused - needs to resume

            // Change text on btn to pause
            elements.btnPauseText.innerHTML = 'PAUSE';
            elements.btnGotit.style.display = 'inline-block';
            game.isPaused = false;
            startTimer(game.currTime);
        } else {
            // Game was running and now is paused

            // Change text on btn to resume
            elements.btnPauseText.innerHTML = 'RESUME';
            elements.btnGotit.style.display = 'none';
            game.isPaused = true;
        }
    });

    // Swap photos event listener
    elements.inGamePhoto1.addEventListener('click', () => gameView.swapPhotos(1));
    elements.inGamePhoto2.addEventListener('click', () => gameView.swapPhotos(2));
}


const displayGuess = () => {
    elements.inGameNameToGuess.innerHTML = game.mixedGuessList[game.currGuessIndex].guess;

    for (let i = 0; i < settings.numOfPhotos; i++) {
        document.getElementById('guessPhoto' + i).setAttribute('src', game.mixedGuessList[game.currGuessIndex].img[i]);
        document.getElementById('guessPhoto' + i).style.display = 'block';
    }
}

// Sets off if isCountdown is true
const getReady = time => {
    elements.countdownLabel.style.display = 'block';
    elements.countdownLabel.innerHTML = time;
    game.setCurrTime(time);
    time--;
    if (time < 0) {
        elements.countdownLabel.innerHTML = 'GO!';
        setTimeout(() => {
            elements.countdownLabel.style.display = 'none';
            startTimer(game.settings.timer)
        }, 1000);

    } else {
        setTimeout(() => {
            getReady(time)
        }, 1000);
    }
}

// Starts the timer and continue recursively
const startTimer = time => {
    if (game.isRunning) {
        if (!game.isPaused) {
            elements.inGameTimer.innerHTML = gameView.convertSecToMinString(time);
            game.setCurrTime(time);
            time--;
            if (time < 10) {
                // Flicker when timer is less than 10 seconds
                elements.inGameTimer.style.backgroundColor = '#ff848477';
                if (time > -1) {
                    setTimeout(() => {
                        // after 0.5 seconds change background color back to create flicker effect
                        elements.inGameTimer.style.backgroundColor = '#28a74631';
                    }, 500);
                }
            }
            if (time < -1) {
                alert('Time\'s up');
                endOfTurn();
            } else {

                // The recursive action
                setTimeout(() => {
                    startTimer(time)
                }, 1000);
            }
        } else {
            // DO NOTHING
        }
    } else {
        endOfTurn();
    }
}

const endOfTurn = () => {

    // Show start
    elements.btnStart.style.display = 'block';

    // // // Need to check if other buttons were enabled
    elements.btnGotit.style.display = 'none';
    elements.btnPause.style.display = 'none';
    elements.btnSkip.style.display = 'none';
    elements.inGameTimer.style.backgroundColor = '#28a74631';

    // Check current game stage
    game.isRunning = false;
    // if all guesses have been passed move to next stage
    if (game.mixedGuessList.length <= game.currGuessIndex) {
        if (game.currStage < 3) {
            game.currStage++;
            game.currGuessIndex = 0;

            // shuffle guess list again
            game.shuffleGuessList();
            alert('The round has ended, moving on to stage - ' + game.currStage);
            setupNextTurn(game);
            showRulesForNextRound();
        } else {
            // All 3 Rounds have been played
            alert('Game Over!');
            moveToResults();
        }
    } else {
        setupNextTurn(game);
    }
}

// Shows the rules before each round using the modal
const showRulesForNextRound = () => {
    // show rules for next round
    document.getElementById('modalBody').innerHTML = gameView.roundMsg(game.currStage);
    document.getElementById('modalLabel').innerHTML = "Round " + game.currStage + " Rules";
    $('#myModal').modal('show');
}

// Setup the game display before a new player starts the game
const setupNextTurn = game => {
    // Save name and color of last player for next names display
    const tempPlayerName1 = game.currentPlayer.name;
    const tempPlayerColor1 = game.currentTeam.color;
    // Move to next player //
    // Update game's currTeam and currPlayer
    game.moveToNextTeam();

    // Update UI with new team / player
    runAnimation(elements.inGamePlayersDisplay, "run-animation-left", 1000, gameView.setupNamesDisplay, [tempPlayerName1, tempPlayerColor1, game.currentPlayer.name, game.currentTeam.color, game.currentTeam.name, game.fetchNextPlayer().name, game.fetchNextTeam().color]);

    gameView.clearGameBoard(game.currentTeam.score, game.settings.timer, game.currentPlayer.name);
}

// Happens after the 3rd round
const moveToResults = () => {
    setupView.showPage(elements.resultsPage, elements.gameContainers);
    // Sort players in each team by score
    game.teamsList.forEach(team => {
        team.sortPlayersByScore();
    });
    // Sort teams by score
    const sortedTeamsList = game.getSortedTeamsList();
    const winTeam = document.getElementById('winning-team-name');
    // Render winning team's name, color, and score
    winTeam.innerHTML = sortedTeamsList[0].name;
    winTeam.style.color = sortedTeamsList[0].color;
    document.getElementById('results-win-team-score').innerHTML = sortedTeamsList[0].score;

    // Render the entire winning team
    gameView.renderTeamResults(document.getElementById('winning-team-table'), sortedTeamsList[0]);

    // Render the rest of the teams
    for (let i = 1; i < sortedTeamsList.length; i++) {
        gameView.renderTeamResultsRest(i + 1, sortedTeamsList[i]);

        document.getElementById(`btn-results-more_${sortedTeamsList[i].id}`).addEventListener('click', () => {
            const teamStat = document.getElementById(`res-team-more_${sortedTeamsList[i].id}`);
            if (teamStat.style.display === 'none') {
                teamStat.style.display = 'block';
            } else teamStat.style.display = 'none';
        });
    }
}

let game;
const setup = new Setup();
const settings = new Settings();
init();


/////////////////////////////////// FOR TESTING 2 /////////////////////////
///////////////////////////////////////////////////////////////////////////

/*

const initTest = () => {
    setupSettingsEventListeners();

    // 2.5 Set event listeners for NavBar
    // Set active TAB

    $("nav .nav-link").on("click", function () {
        $(".nav-item").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    // Settings Tab
    elements.settingsTab.addEventListener('click', () => {
        initSettings(4);
        setupView.showPage(elements.settingsPage, elements.gameContainers);

    });
    // Game Tab
    elements.gameTab.addEventListener('click', () => {
        setupView.showPage(document.getElementById(`page${setup.currentPage}`), elements.gameContainers);
    });
    // Rules Tab
    elements.rulesTab.addEventListener('click', () => {
        setupView.showPage(elements.rulesPage, elements.gameContainers);
    });
    // About Tab
    elements.restartTab.addEventListener('click', () => {
        setupView.showPage(elements.aboutPage, elements.gameContainers);
    }); 

    
    moveToPage4();

    // TEST RESULTS
    /*
    document.getElementById('resultsPage').style.display = 'block';

    document.getElementById('btn-results-more_2').addEventListener('click', () => {
        const teamStat = document.getElementById('res-team-more_2');
        if (teamStat.style.display === 'none') {
            teamStat.style.display = 'block';
        } else teamStat.style.display = 'none';
        
    });
    */

/*
}

const playerslist1 = [];
const playerslist2 = [];
const tempplayer1 = new Player('omer', 0);
const tempplayer2 = new Player('hen', 5);
playerslist1.push(tempplayer1);
playerslist1.push(tempplayer2);
const tempplayer4 = new Player('guy', 4);
const tempplayer5 = new Player('mano', 3);
playerslist2.push(tempplayer4);
playerslist2.push(tempplayer5);


const guesslist = [new Guess('Avi Bitter', 0, tempplayer1), new Guess('סטטיק', 1, tempplayer2), new Guess('Avi Cohen', 2, tempplayer5), new Guess('Britney', 3, tempplayer4)];

const imglist = [
    ["https://m.media-amazon.com/images/M/MV5BYmNiMmZlYTgtMzkwYy00N2FmLTgzYmItNzhjMjEyNGU4NGY5XkEyXkFqcGdeQXVyNDYzMDMxOTc@._V1_UY300.jpg",
        "https://ytimg.googleusercontent.com/vi/dCzRy63sXvM/mqdefault.jpg",
        "https://i.gifer.com/fetch/w300-preview/85/85dce91d0f4b8df5746a00cff8bec535.gif"
    ],
    ["https://img2.androidappsapk.co/300/a/4/6/com.thunkable.android.turtkvnkl765.kallllll.png",
        "https://e.snmc.io/i/300/w/68af515f3328123bab0cb0068ad71fe8/7005660",
        "https://lastfm-img2.akamaized.net/i/u/300x300/767e76a2b8d36be1f2a6c10ef856557f.png"
    ],
    ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Avi_Cohen.jpg/200px-Avi_Cohen.jpg", "https://media.licdn.com/dms/image/C4D03AQHO83xf6h-j7g/profile-displayphoto-shrink_200_200/0?e=1554336000&v=beta&t=9Ho8Qowpx8IGULwbLuAtZlPAnwAcQyZ-orQALGY8khY", "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/30/1293733781787/Avi-Cohen-007.jpg?width=300&quality=85&auto=format&fit=max&s=8dfe77fc2c167565364a51e7dcd1a80c"],
    ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Britney_Spears_2013_%28Straighten_Crop%29.jpg/200px-Britney_Spears_2013_%28Straighten_Crop%29.jpg",
        "https://i.ytimg.com/vi/t0bPrt69rag/maxresdefault.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/da/Britney_Spears_2013_%28Straighten_Crop%29.jpg"
    ]
];

for (let i = 0; i < guesslist.length; i++) {
    guesslist[i].insertStaticPhoto(imglist[i]);
}

const teamlist = [new Team(0, 3, playerslist1), new Team(1, 3, playerslist2)];
teamlist[0].setColor('#ff763a');
teamlist[1].setColor('#e45fd2');

const settings = new Settings();
const game = new Game(teamlist, guesslist, settings);
const setup = new Setup();


initTest();

//////////////////////////////////////////////////////////////////////
*/
