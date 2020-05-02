import GameService from '../services/gameService';

export default class DisplayController {

    static getScoreboard(req:any, res:any) {
        let game_id: string = req.params.game_id;
        let json: any = GameService.getScoreboard(game_id);
        res.json(json);
    }

    static getPlayerDetails(req:any, res:any) {
        let game_id: string = req.params.game_id;
        let player_id: string = req.params.player_id;
        let json: any = GameService.getPlayerDetails(game_id, player_id);
        res.json(json);
    }

    static getGameboard(req:any, res:any) {
        let game_id: string = req.params.game_id;
        let json: any = GameService.getGameboard(game_id);
        res.json(json);
    }

    static getPregameDetails(req:any, res:any) {
        let game_id: string = req.params.game_id;
        let json: any = GameService.getPregameDetails(game_id);
        res.json(json);
    }

}

// export = DisplayController;