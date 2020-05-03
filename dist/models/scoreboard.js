"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Scoreboard {
    constructor() {
        this.scores = {};
        this.totals = {};
    }
    getScores() {
        return this.scores;
    }
    getTotals() {
        return this.totals;
    }
    addRound(round) {
        if (round.isRoundFinished()) {
            this.scores[round.getIndex()] = round.getScore();
            this.refreshTotals();
        }
    }
    refreshTotals() {
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
exports.default = Scoreboard;
// export = Scoreboard;
//# sourceMappingURL=scoreboard.js.map