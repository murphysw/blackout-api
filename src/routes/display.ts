import DisplayController from '../controllers/displayController';

import express from 'express';

var router = express.Router();
    
/* GET Pregame details */
router.get('/games/:game_id/pregame', DisplayController.getPregameDetails);

/* GET Scoreboard */
router.get('/games/:game_id/scoreboard', DisplayController.getScoreboard);

/* GET Gameboard */
router.get('/games/:game_id/gameboard', DisplayController.getGameboard);

/* GET player details */
router.get('/games/:game_id/players/:player_id', DisplayController.getPlayerDetails);
    

export = router;
