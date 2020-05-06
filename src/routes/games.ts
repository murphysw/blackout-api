import GameController from '../controllers/gameController';
import express from 'express';

var router = express.Router();

/* GET current games */
router.get('/games/', GameController.getCurrentGames);

/* POST initialize game */
router.post('/games/', GameController.initializeGame);

/* DELETE remove game */
router.delete('/games/:game_id', GameController.removeGame);

/* POST add Player */
router.post('/games/:game_id/players', GameController.addPlayer);

/* DELETE remove player */
router.delete('/games/:game_id/players/:player_id', GameController.removePlayer);

/* POST Finalize setup */
router.post('/games/:game_id/finalizesetup', GameController.finalizeSetup);

/* POST Begin round */
router.post('/games/:game_id/beginround', GameController.beginRound);

/* POST Place bid */
router.post('/games/:game_id/players/:player_id/placebid', GameController.placeBid);

/* POST Play card */
router.post('/games/:game_id/players/:player_id/placecard', GameController.playCard);

/* POST Finish round */
router.post('/games/:game_id/finishround', GameController.finishRound);

/* POST Clear table */
router.post('/games/:game_id/cleartable', GameController.clearTable);

export = router;