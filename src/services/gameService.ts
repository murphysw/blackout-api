import Game from '../models/game';
import Card from '../models/card';
import PlayerDetailsDisplay from '../viewModels/playerDetails';
import Player from '../models/player';
import PregameDetailsDisplay from '../viewModels/pregameDetails';
import ScoreboardDisplay from '../viewModels/Scoreboard';
import Scoreboard from '../models/scoreboard';
import Round from '../models/round';
import GameboardDisplay from '../viewModels/gameboard';

let games: {[game_id: string]: Game} = {};

export default class GameService {
    static initializeGame(name: string): string {
        let game: Game = new Game();
        game.setGameName(name);
        games[game.getGameId()] = game;
        return game.getGameId();
    }

    static addPlayer(game_id: string, name: string): string {
        let game: Game = games[game_id];
        let id: string = '';
        if (game) {
            id = game.addPlayer(name);
        }
        return id;
    }

    static removePlayer(game_id: string, identifier: string): void {
        let game: Game = games[game_id];
        if (game) {
            game.removePlayer(identifier);
            game.removePlayerByName(identifier);
        }
    }

    static finalizeSetup(game_id: string): void {
        let game: Game = games[game_id];
        if (game) {
            game.finalizeSetup();
        }
    }

    static beginRound(game_id: string): void {
        let game: Game = games[game_id];
        if (game) {
            game.beginRound();
        }
    }

    static placeBid(game_id: string, player_id: string, bid: number): void {
        let game: Game = games[game_id];
        if (game) {
            game.getCurrentRound().placeBid(player_id, bid);
        }
    }

    static playCard(game_id: string, player_id: string, suit: string, value: number): void {
        let game: Game = games[game_id];
        if (game) {
            let card: Card = new Card(suit, value);
            game.getCurrentRound().playCard(player_id, card);
        }
    }
    
    static finishRound(game_id: string): void {
        let game: Game = games[game_id];
        if (game) {
            game.finishRound();
        }
    }

    static clearTable(game_id: string): void {
        let game: Game = games[game_id];
        if (game) {
            game.clearTable();
        }
    }

    static getCurrentGames(): {name:string, id:string}[] {
        let currentGames: {name:string, id:string}[] = [];
        for (let game in games) {
            let gameObject: Game = games[game];
            if (!gameObject.isGameFinished()) {
                currentGames.push({name: gameObject.game_name, id: gameObject.game_id});
            }
        }
        return currentGames;
    }

    static getScoreboard(game_id: string): any {
        let scoreboard: ScoreboardDisplay;
        let game: Game = games[game_id];
        if (game) {
            let gameScoreboard: Scoreboard = game.scoreboard;
            let round: Round = game.getCurrentRound();

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

    static getPlayerDetails(game_id: string, player_id: string): any {
        let details: PlayerDetailsDisplay;
        let game: Game = games[game_id];
        if (game) {            
            let player: Player = game.getPlayerById(player_id);
            if (player) {
                details = { 
                    player: player
                };
            }            
        }
        return details;
    }

    static getGameboard(game_id: string) {
        let gameboard: GameboardDisplay;
        let game: Game = games[game_id];
        if (game) {
            let round: Round = game.getCurrentRound();
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
                projected_hand_winner: round.getProjectHandWinner()
            };
        }
        return gameboard;
    }

    static getPregameDetails(game_id: string) {
        let details: PregameDetailsDisplay;
        let game: Game = games[game_id];
        if (game) {
            details = {
                decks_required: game.getNumberOfDecks(),
                player_list: game.getPlayers(),
                game_started: game.game_started
            }            
        }
        return details;
    }
}

// export = GameService;