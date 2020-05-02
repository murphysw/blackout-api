"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gameService_1 = __importDefault(require("../services/gameService"));
class DisplayController {
    static getScoreboard(req, res) {
        let game_id = req.params.game_id;
        let json = gameService_1.default.getScoreboard(game_id);
        res.json(json);
    }
    static getPlayerDetails(req, res) {
        let game_id = req.params.game_id;
        let player_id = req.params.player_id;
        let json = gameService_1.default.getPlayerDetails(game_id, player_id);
        res.json(json);
    }
    static getGameboard(req, res) {
        let game_id = req.params.game_id;
        let json = gameService_1.default.getGameboard(game_id);
        res.json(json);
    }
    static getPregameDetails(req, res) {
        let game_id = req.params.game_id;
        let json = gameService_1.default.getPregameDetails(game_id);
        res.json(json);
    }
}
exports.default = DisplayController;
// export = DisplayController;
//# sourceMappingURL=displayController.js.map