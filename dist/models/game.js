"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = __importDefault(require("./player"));
const round_1 = __importDefault(require("./round"));
const deck_1 = __importDefault(require("./deck"));
const scoreboard_1 = __importDefault(require("./scoreboard"));
class Game {
    constructor() {
        this.players = {};
        this.game_started = false;
        this.game_finished = false;
        this.current_round = 10;
        this.rounds = {};
        this.game_id = Math.round(Math.random() * 10000).toString();
        this.scoreboard = new scoreboard_1.default();
        this.created_time = Date.now();
    }
    getGameId() {
        return this.game_id;
    }
    getGameName() {
        return this.game_name;
    }
    setGameName(name) {
        this.game_name = name;
    }
    getPlayers() {
        let players = [];
        for (let key in this.players) {
            players.push(this.players[key]);
        }
        return players;
    }
    getPlayerById(id) {
        return this.players[id];
    }
    addPlayer(name) {
        if (this.game_started === true) {
            return 'ERROR_GAME_STARTED';
        }
        let p = new player_1.default(name);
        let pid = p.getId();
        this.players[pid] = p;
        return pid;
    }
    removePlayer(id) {
        delete this.players[id];
    }
    removePlayerByName(name) {
        let id;
        for (let key in this.players) {
            if (this.players[key].name === name) {
                id = key;
                break;
            }
        }
        if (id) {
            delete this.players[id];
            return true;
        }
        return false;
    }
    finalizeSetup() {
        this.game_started = true;
        let number_of_decks = this.getNumberOfDecks();
        this.deck = new deck_1.default(number_of_decks);
        this.beginRound();
    }
    getCurrentRound() {
        return this.rounds[this.current_round];
    }
    getCurrentRoundIndex() {
        return this.current_round;
    }
    getPlayerCount() {
        return Object.keys(this.players).length;
    }
    isGameFinished() {
        return this.game_finished;
    }
    isBiddingComplete() {
        return this.getCurrentRound().isBiddingComplete();
    }
    isGameStarted() {
        return this.game_started;
    }
    getNumberOfDecks() {
        let total_needed_for_first_round = (this.getPlayers().length * 10) + 1;
        let number_of_decks = Math.floor((total_needed_for_first_round / 52));
        if (total_needed_for_first_round % 52 > 0) {
            number_of_decks++;
        }
        return number_of_decks;
    }
    getRemainingCardsInDeck() {
        return this.deck.getRemainingCardsInDeck();
    }
    getScoreboard() {
        return this.scoreboard;
    }
    beginRound() {
        if (!this.game_started) {
            return;
        }
        let current = this.getCurrentRound();
        if (current != undefined && current.round_finished) {
            this.finishRound();
            current = this.getCurrentRound();
        }
        if (current == undefined) {
            let dealer;
            dealer = (10 - this.current_round) % this.getPlayerCount();
            this.rounds[this.getCurrentRoundIndex()] = new round_1.default(this.getCurrentRoundIndex(), Object.values(this.players), dealer, this.deck);
        }
    }
    finishRound() {
        this.scoreboard.addRound(this.getCurrentRound());
        this.current_round--;
        if (this.current_round < 1) {
            // finish game
            this.game_finished = true;
        }
    }
    clearTable() {
        if (this.getCurrentRound().current_hand.length === this.getPlayers().length) {
            this.getCurrentRound().current_hand = [];
        }
    }
}
exports.default = Game;
// export = Game;
//# sourceMappingURL=game.js.map