"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const gameController_1 = __importDefault(require("../controllers/gameController"));
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
/* GET current games */
router.get('/games/', gameController_1.default.getCurrentGames);
/* POST initialize game */
router.post('/games/', gameController_1.default.initializeGame);
/* POST add Player */
router.post('/games/:game_id/players', gameController_1.default.addPlayer);
/* DELETE remove player */
router.delete('/games/:game_id/players/:player_id', gameController_1.default.removePlayer);
/* POST Finalize setup */
router.post('/games/:game_id/finalizesetup', gameController_1.default.finalizeSetup);
/* POST Begin round */
router.post('/games/:game_id/beginround', gameController_1.default.beginRound);
/* POST Place bid */
router.post('/games/:game_id/players/:player_id/placebid', gameController_1.default.placeBid);
/* POST Play card */
router.post('/games/:game_id/players/:player_id/placecard', gameController_1.default.playCard);
/* POST Finish round */
router.post('/games/:game_id/finishround', gameController_1.default.finishRound);
/* POST Clear table */
router.post('/games/:game_id/cleartable', gameController_1.default.clearTable);
module.exports = router;
//# sourceMappingURL=games.js.map