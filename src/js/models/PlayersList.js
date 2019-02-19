import Player from './Player';

export default class PlayersList {
    constructor(playersList) {
        this.list = createPlayersList(playersList);
        this.currentIndex = 0;
    }

    isNextPlayer(offset = 1) {
        if (this.list.length === this.currentIndex + offset) {
            return false;
        } else return true;
    }

    getNextPlayer() {
        this.currentIndex++;
        return this.list[this.currentIndex]
    }

    getPlayerByID(playerID) {
        const curPlayer = this.list.findIndex(el => el.id === playerID);
        return this.list[curPlayer + 1];
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    resetIndex() {
        this.currentIndex = 0;
    }

}

// playersList is an array of players, each player is represnted as such: [players-name, players-id]
const createPlayersList = (playersList) => {
    const newPlayersList = [];
    Array.from(playersList).forEach(player => {
        const newPlayer = new Player(player[0], player[1]);
        newPlayersList.push(newPlayer);
    });
    return newPlayersList;
}