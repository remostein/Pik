import Guess from './Guess';

export default class Player {
    constructor (name, id) {
        this.name = name;
        this.id = id;
        this.guessList = [];
        this.guessesID = 0;
        this.score = 0;
        // a list of all the guesses the player got right!
        this.bucket = [];
    }

    addGuessToList (guess) {
        const newGuess = new Guess(guess, this.guessesID, this.id);
        this.guessList.push(newGuess);
        this.guessesID++;
        return this.guessesID - 1;
    }

    deleteGuess (guessID) {
        const index = this.guessList.findIndex(el => el.id === guessID);
        this.guessList.splice(index,1); 
    }

    getGuessListLength () {
        return this.guessList.length;
    }

    addCorrectGuess (stage, time, guess) {
        this.bucket.push({stage, time, guess});
    }

    async fetchGuessesImg() {
        if (this.guessList.length > 0) {
            try {
                this.guessList.forEach(async el => await el.getPhoto());
            } catch (err) {
                console.log(err);
            }
            
        }
        
    }

}

