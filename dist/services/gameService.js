"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = __importDefault(require("../models/game"));
const card_1 = __importDefault(require("../models/card"));
let games = {};
class GameService {
    static initializeGame(name) {
        let game = new game_1.default();
        game.setGameName(name);
        games[game.getGameId()] = game;
        return game.getGameId();
    }
    static removeGame(game_id) {
        let game = games[game_id];
        if (game && !game.game_started) {
            delete games[game_id];
        }
        else {
            throw new Error('INVALID');
        }
    }
    static addPlayer(game_id, name) {
        let game = games[game_id];
        let id = '';
        if (game) {
            id = game.addPlayer(name);
        }
        return id;
    }
    static removePlayer(game_id, identifier) {
        let game = games[game_id];
        if (game) {
            game.removePlayer(identifier);
            game.removePlayerByName(identifier);
        }
    }
    static finalizeSetup(game_id) {
        let game = games[game_id];
        if (game) {
            game.finalizeSetup();
        }
    }
    static beginRound(game_id) {
        let game = games[game_id];
        if (game) {
            game.beginRound();
        }
    }
    static placeBid(game_id, player_id, bid) {
        let game = games[game_id];
        if (game) {
            game.getCurrentRound().placeBid(player_id, bid);
        }
    }
    static playCard(game_id, player_id, suit, value) {
        let game = games[game_id];
        if (game) {
            let card = new card_1.default(suit, value);
            game.getCurrentRound().playCard(player_id, card);
        }
    }
    static finishRound(game_id) {
        let game = games[game_id];
        if (game) {
            game.finishRound();
        }
    }
    static clearTable(game_id) {
        let game = games[game_id];
        if (game) {
            game.clearTable();
        }
    }
    static getCurrentGames() {
        let currentGames = [];
        for (let game in games) {
            let gameObject = games[game];
            if (!gameObject.isGameFinished()) {
                currentGames.push({ name: gameObject.game_name, id: gameObject.game_id, start_date: gameObject.created_time });
            }
        }
        return currentGames.sort((a, b) => a.start_date - b.start_date);
    }
    static getScoreboard(game_id) {
        let scoreboard;
        let game = games[game_id];
        if (game) {
            let gameScoreboard = game.scoreboard;
            let round = game.getCurrentRound();
            scoreboard = {
                scores: gameScoreboard.scores,
                totals: gameScoreboard.totals,
                players: game.getPlayers(),
                current_bids: {
                    bids: round.getBids(),
                    round: round.getIndex()
                }
            };
        }
        return scoreboard;
    }
    static getPlayerDetails(game_id, player_id) {
        let details;
        let game = games[game_id];
        if (game) {
            let player = game.getPlayerById(player_id);
            if (player) {
                details = {
                    player: player
                };
            }
        }
        return details;
    }
    static getGameboard(game_id) {
        let gameboard;
        let game = games[game_id];
        if (game) {
            let round = game.getCurrentRound();
            gameboard = {
                game_started: game.isGameStarted(),
                round_finished: round.isRoundFinished(),
                bidding_complete: game.isBiddingComplete(),
                cards_remaining_in_deck: game.getRemainingCardsInDeck(),
                current_hand: round.getCurrentHand(),
                current_round: round.getIndex(),
                current_player_id: round.getCurrentPlayerId(),
                dealer_id: round.getDealerId(),
                leader_id: round.getLeaderId(),
                number_of_decks: game.getNumberOfDecks(),
                players: game.getPlayers(),
                tricks_taken: round.getTricksTaken(),
                trump: round.getTrump(),
                projected_hand_winner: round.getProjectHandWinner(),
                game_finished: game.isGameFinished()
            };
        }
        return gameboard;
    }
    static getPregameDetails(game_id) {
        let details;
        let game = games[game_id];
        if (game) {
            details = {
                decks_required: game.getNumberOfDecks(),
                player_list: game.getPlayers(),
                game_started: game.game_started
            };
        }
        return details;
    }
}
exports.default = GameService;
// export = GameService;
//# sourceMappingURL=gameService.js.map