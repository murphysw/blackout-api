import GameService from '../services/gameService';

export default class GameController {

    static async getCurrentGames(req:any, res:any, next:any) {
        res.json({games: GameService.getCurrentGames()});
        // next();
    }

    static async initializeGame(req:any, res:any) {
        let name: string = req.body.name;
        let id: string = GameService.initializeGame(name);  
        res.json({game_id: id})
    };

    static async removeGame(req:any, res:any, next:any) {
        let game_id: string = req.params.game_id;
        try {
            GameService.removeGame(game_id);  
            res.json({})
        } catch(err) {
            next(err);
        }  
    };

    static addPlayer(req:any, res:any) {
        let game_id: string = req.params.game_id;
        let name: string = req.body.name;
        let player_id: string = GameService.addPlayer(game_id, name);
        res.json({player_id: player_id});
    };

    static removePlayer(req:any, res:any) {
        let game_id: string = req.params.game_id;
        let player_id: string = req.params.player_id;
        GameService.removePlayer(game_id, player_id);
        res.json({})
    };

    static finalizeSetup(req:any, res:any) {
        let game_id: string = req.params.game_id;
        GameService.finalizeSetup(game_id);
        res.json({})
    };

    static beginRound(req:any, res:any) {
        let game_id: string = req.params.game_id;        
        GameService.beginRound(game_id);
        res.json();
    };

    static placeBid(req:any, res:any) {
        let game_id: string = req.params.game_id;
        let player_id: string = req.params.player_id;
        let bid: number = req.body.bid;
        GameService.placeBid(game_id, player_id, bid);
        res.json();
    };

    static playCard(req:any, res:any) {
        let game_id: string = req.params.game_id;
        let player_id: string = req.params.player_id;
        let suit: string = req.body.suit;
        let value: number = req.body.value;
        GameService.playCard(game_id, player_id, suit, value);
        res.json();
    };

    static finishRound(req:any, res:any) {
        let game_id: string = req.params.game_id;        
        GameService.finishRound(game_id);
        res.json();
    };
    
    static clearTable(req:any, res:any) {
        let game_id: string = req.params.game_id;        
        GameService.clearTable(game_id);
        res.json();
    };
}

// export = GameController;