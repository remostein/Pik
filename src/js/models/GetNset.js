export default class GetNset {

    setCurrentPlayer(player) {
        this.currentPlayer = player;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    setCurrentTeam(team){
        this.currentTeam = team;
    }

    getCurrentTeam() {
        return this.currentTeam;
    }

    // Shuffle an array using the Fisher-Yates shuffle (inplace and O(n))
     shuffle (array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

}