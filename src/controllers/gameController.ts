import GameService from '../services/gameService';

export default class GameController {

    static async getCurrentGames(req:any, res:any, next:any) {
        res.json({games: GameService.getCurrentGames()});
        // next();
    }

    static async initializeGame(req:any, res:any) {
        let id: string = GameService.initializeGame();  
        res.json({game_id: id})
      };

    static addPlayer(req:any, res:any) {
        let game_id: string = req.params.game_id;
        let name: string = req.body.name;
        let player_id: string = GameService.addPlayer(game_id, name);
        res.json({player_id: player_id});
    }

    static removePlayer(req:any) {
        let game_id: string = req.params.game_id;
        let player_id: string = req.params.player_id;
        GameService.removePlayer(game_id, player_id);
    }

    static finalizeSetup(req:any) {
        let game_id: string = req.params.game_id;
        GameService.finalizeSetup(game_id);
    }

    static beginRound(req:any, res:any) {
        let game_id: string = req.params.game_id;        
        GameService.beginRound(game_id);
        res.json();
    }

    static placeBid(req:any, res:any) {
        let game_id: string = req.params.game_id;
        let player_id: string = req.params.player_id;
        let bid: number = req.body.bid;
        GameService.placeBid(game_id, player_id, bid);
        res.json();
    }

    static playCard(req:any, res:any) {
        let game_id: string = req.params.game_id;
        let player_id: string = req.params.player_id;
        let suit: string = req.body.suit;
        let value: number = req.body.value;
        GameService.playCard(game_id, player_id, suit, value);
        res.json();
    }

    static finishRound(req:any, res:any) {
        let game_id: string = req.params.game_id;        
        GameService.finishRound(game_id);
        res.json();
    }
    
    static clearTable(req:any, res:any) {
        let game_id: string = req.params.game_id;        
        GameService.clearTable(game_id);
        res.json();
    }
}

// export = GameController;