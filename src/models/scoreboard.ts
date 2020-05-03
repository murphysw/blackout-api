import Round from './round';

export default class Scoreboard {    

    scores: {[index: number]: {[player_id: string]: number}} = {};
    totals: {[player_id: string]: number} = {};
    
    constructor() { }

    public getScores(): {[index: number]: {[player_id: string]: number}} {
        return this.scores;
    }

    public getTotals(): {[player_id: string]: number} {
        return this.totals;
    }

    public addRound(round: Round): void {
        if (round.isRoundFinished()) {
            this.scores[round.getIndex()] = round.getScore();
            this.refreshTotals();
        }
    }

    private refreshTotals(): void {
        this.totals = {};
        for (let index in this.scores) {
            for (let player in this.scores[index]) {
                if (!this.totals[player]) {
                    this.totals[player] = 0;
                }
                this.totals[player] = this.totals[player] + this.scores[index][player];
            }
        }
    }

}

// export = Scoreboard;