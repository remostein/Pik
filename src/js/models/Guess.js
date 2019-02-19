import axios from 'axios';
import {key, proxy, cx} from '../config';

export default class Guess {
    constructor (guess, id, player) {
        this.guess = guess;
        this.id = id;
        this.player = player;
    }

    async getPhoto() {
        try {
            const res = await axios(`https://www.googleapis.com/customsearch/v1?q=${this.guess}&cx=${cx}&imgSize=medium&searchType=image&key=${key}`);
            this.img = [res.data.items[0].link, res.data.items[1].link, res.data.items[2].link];
            console.log(this.guess + ':');
            console.log(this.img);
        } catch (err) {
            alert(err);
            console.log(err);
        }
    }

    insertStaticPhoto(imgs) {
        this.img = imgs;
    }
}