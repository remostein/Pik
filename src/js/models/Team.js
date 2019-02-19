export default class Team {
    constructor (id, size, players) {
        this.size = size;
        this.id = id;
        this.players = players;
        this.score = 0;
        this.name = 'Team ' + (id + 1);
        this.currentPlayerIndex = 0;
    }

    setName (name) {
        this.name = name;
    }

    setColor (color) {
        this.color = color;
    }

    addPoint() {
        this.score++;
    }

    setCurrentPlayer(player) {
        this.currentPlayer = player;
        this.currentPlayerIndex = this.players.findIndex(el => player.id === el.id);
    }

    setCurrentPlayerWithIndex(playerIndex) {
        if(playerIndex < this.players.length){
            this.currentPlayer = this.players[playerIndex];
            this.currentPlayerIndex = playerIndex;
            return true;
        } else return false;

    }

    moveToNextPlayer() {
        this.currentPlayerIndex++;
        this.currentPlayerIndex %= this.players.length;
        this.currentPlayer = this.players[this.currentPlayerIndex];
    }

    sortPlayersByScore() {
        this.players.sort((a,b) => b.score - a.score);
        return this.players;
    }

}