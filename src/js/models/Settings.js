export default class Settings {
    constructor() {
        this.minPlayers = 4;
        this.playersCount = 4;
        this.teamsCount = 2; //default teams
        this.timer = 60; //time in seconds
        this.minInputsPP = 4; //min inputs per player
        this.isRandTeams = true;
        this.isPauseEnable = false;
        this.isSkipEnable = false;
        this.numOfPhotos = 1;
        this.isCountdown = true;
    }

           // SETTINGS //
           updateTeams(type) {
            if (type == 'up') {
                //check if playersCount / (teamsCount + 1) >= 2
                if ((this.playersCount / (this.teamsCount + 1)) >= 2) {
                    this.teamsCount++;
                    return true;
                } else {
                    alert(`Not enough players (${this.playersCount}), min 2 players per team ${this.playersCount / (this.teamsCount + 1)}`);
                    return false;
                }
            }
            if (type == 'down') {
                if (this.teamsCount <= 2) {
                    alert('Minimum 2 teams allowed')
                    return false;
                } else {
                    this.teamsCount--;
                    return true;
                }
            }
        }
    
        updateTimer(type) {
            // update timer
            if (type == 'up') {
                //check if 
                if (this.timer < 300) {
                    this.timer += 10;
                    return true;
                } else {
                    alert(`Can't set round for more than 5 min`);
                    return false;
                }
            }
            if (type == 'down') {
                if (this.timer <= 10) {
                    //do shit///
                    alert('Minimum 10 seconds per round');
                    return false;
                } else {
                    this.timer -= 10;
                    return true;
                }
            }
        }
    
        updateMinInputs(type) {
            if (type == 'up') {
                this.minInputsPP++;
                return true;
            }
            if (type == 'down') {
                if (this.minInputsPP === 0) {
                    alert('Cannot have a negative value')
                    return false;
                } else if (this.minInputsPP === 1) {
                    alert('Min inputs disabled (Min input is 0)')
                }
                this.minInputsPP--;
                return true;
            }
        }

        updateNumOfPhotos(type) {
            if (type == 'up') {
                if (this.numOfPhotos === 3) {
                    alert('Cannot set more than 3 photos');
                    return false;
                } else {
                    this.numOfPhotos++;
                    return true;
                }
            }
            if (type == 'down') {
                if (this.numOfPhotos === 0) {
                    alert('Cannot have a negative value')
                    return false;
                } else if (this.numOfPhotos === 1) {
                    alert('Photos are disabled (Min input is 0)')
                }
                this.numOfPhotos--;
                return true;
            }
        }

        setPause(booli) {
            this.isPauseEnable = booli;
        }

        setSkip(booli) {
            this.isSkipEnable = booli;
        }

        setCountdown(booli) {
            this.isCountdown = booli;
        }
}