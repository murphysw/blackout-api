"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gameService_1 = __importDefault(require("../services/gameService"));
class GameController {
    static getCurrentGames(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ games: gameService_1.default.getCurrentGames() });
            // next();
        });
    }
    static initializeGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = gameService_1.default.initializeGame();
            res.json({ game_id: id });
        });
    }
    ;
    static addPlayer(req, res) {
        let game_id = req.params.game_id;
        let name = req.body.name;
        let player_id = gameService_1.default.addPlayer(game_id, name);
        res.json({ player_id: player_id });
    }
    static removePlayer(req) {
        let game_id = req.params.game_id;
        let player_id = req.params.player_id;
        gameService_1.default.removePlayer(game_id, player_id);
    }
    static finalizeSetup(req) {
        let game_id = req.params.game_id;
        gameService_1.default.finalizeSetup(game_id);
    }
    static beginRound(req, res) {
        let game_id = req.params.game_id;
        gameService_1.default.beginRound(game_id);
        res.json();
    }
    static placeBid(req, res) {
        let game_id = req.params.game_id;
        let player_id = req.params.player_id;
        let bid = req.body.bid;
        gameService_1.default.placeBid(game_id, player_id, bid);
        res.json();
    }
    static playCard(req, res) {
        let game_id = req.params.game_id;
        let player_id = req.params.player_id;
        let suit = req.body.suit;
        let value = req.body.value;
        gameService_1.default.playCard(game_id, player_id, suit, value);
        res.json();
    }
    static finishRound(req, res) {
        let game_id = req.params.game_id;
        gameService_1.default.finishRound(game_id);
        res.json();
    }
    static clearTable(req, res) {
        let game_id = req.params.game_id;
        gameService_1.default.clearTable(game_id);
        res.json();
    }
}
exports.default = GameController;
// export = GameController;
//# sourceMappingURL=gameController.js.map