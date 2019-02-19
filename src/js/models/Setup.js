import GetNset from './GetNset';
import PlayersList from './PlayersList';
import Team from './Team';

//*******************************
//********** PAGE1 **************
//*******************************/

export default class Setup extends GetNset {
    constructor() {
        super();
        this.playerID = 4; //number to start counting ID's from
        this.currentPage = 1;
        this.guessList = [];
        this.guessesID = 0;
    }

    setPlayersList(playersList) {
        this.playersList = new PlayersList(playersList);
    }

    getPlayersList() {
        return this.playersList.list;
    }

    prepareGame(isRandTeams, teamsCount) {
        // Create teams
        const randPlayersList = isRandTeams? super.shuffle(this.playersList.list.slice()) : this.playersList.list; 
        console.log(randPlayersList);
        this.teamsList = createRandTeams(teamsCount, randPlayersList);
    }
};

const createRandTeams = (teamsCount, players) => {
    const res = players.length % teamsCount;
    const base = Math.floor(players.length / teamsCount);
    const TeamsList = [];
    let index = 0;

    // If players spread is even
    for (let i = 0; i < teamsCount - res; i++) {
        //// slice makes shallow copy of player - not good 
        const tempTeam = new Team(i, base, players.slice(index, index + base));
        index += base;
        TeamsList.push(tempTeam);
    }
    for (let i = 0; i < res; i++) {
        const tempTeam = new Team(i + teamsCount - res, base + 1, players.slice(index, index + base + 1));
        index += base + 1;
        TeamsList.push(tempTeam);
    }
    return TeamsList;
}

