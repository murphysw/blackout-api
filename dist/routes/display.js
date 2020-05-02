"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const displayController_1 = __importDefault(require("../controllers/displayController"));
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
/* GET Pregame details */
router.get('/games/:game_id/pregame', displayController_1.default.getPregameDetails);
/* GET Scoreboard */
router.get('/games/:game_id/scoreboard', displayController_1.default.getScoreboard);
/* GET Gameboard */
router.get('/games/:game_id/gameboard', displayController_1.default.getGameboard);
/* GET player details */
router.get('/games/:game_id/players/:player_id', displayController_1.default.getPlayerDetails);
module.exports = router;
//# sourceMappingURL=display.js.map