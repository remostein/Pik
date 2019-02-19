import GetNset from './GetNset';
import Player from './Player';
import PlayersList from './PlayersList';
import Team from './Team';

export default class Game extends GetNset {
    constructor(teamsList, guessList, settings) {
        super();
        this.teamsList = teamsList;
        this.guessList = guessList;
        this.shuffleGuessList();
        this.currGuessIndex = 0;
        this.currTeamIndex = 0;
        this.isRunning = false;
        this.currStage = 1;
        this.settings = settings;
        this.isPaused = false;
    }

    // Create mix guess list - copy of original ordered list, but shuffled
    shuffleGuessList() {
        this.mixedGuessList = super.shuffle(this.guessList.slice());
    }

    setCurrTime(time) {
        this.currTime = time;
    }

    // Sets next team as current team, and sets its current player to be game's current player
    moveToNextTeam() {
        // Update team's currPlayer / index
        this.currentTeam.moveToNextPlayer();
        this.currTeamIndex++;
        this.currTeamIndex %= this.teamsList.length;
        super.setCurrentTeam(this.teamsList[this.currTeamIndex]);
        super.setCurrentPlayer(this.currentTeam.currentPlayer);
        // Reshuffle the rest of the guess list, so next player wont nececerily get the last players guess
        let toGuessArr = this.mixedGuessList.slice();
        let guessedArr = toGuessArr.splice(0, this.currGuessIndex);
        super.shuffle(toGuessArr);
        this.mixedGuessList = guessedArr.concat(toGuessArr);
    }

    fetchNextPlayer() {
        let index = this.currTeamIndex + 1;
        index %= this.teamsList.length;
        return this.teamsList[index].currentPlayer;
    }

    fetchNextTeam() {
        let index = this.currTeamIndex + 1;
        index %= this.teamsList.length;
        return this.teamsList[index];
    }

    setPause(booli) {
        this.isPaused = booli;
    }

    getSortedTeamsList() {
        this.teamsList.sort((a,b) => b.score - a.score);
        return this.teamsList;
    }

}