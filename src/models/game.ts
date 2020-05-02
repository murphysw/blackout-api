import Player from './player';
import Round from './round';
import Deck from './deck';
import Scoreboard from './scoreboard';

export default class Game {    
    game_id: string;
    players: {[player_id: string]: Player} = {};    
    game_started: boolean = false;
    game_finished: boolean = false;
    current_round: number = 10;    
    rounds: {[index: number]: Round} = {};    
    deck: Deck;
    scoreboard: Scoreboard;

    constructor() {
        this.game_id = Math.round(Math.random() * 10000).toString();
        this.scoreboard = new Scoreboard();
    }

    public getGameId(): string {
        return this.game_id;
    }

    public getPlayers(): Player[] {
        let players: Player[] = [];
        for (let key in this.players) {
            players.push(this.players[key]);
        }

        return players;
    }

    public getPlayerById(id: string) {
        return this.players[id];
    }

    public addPlayer(name: string): string {
        if (this.game_started === true) {
            return 'ERROR_GAME_STARTED';
        }
        let p: Player = new Player(name);
        let pid: string =  p.getId();
        this.players[pid] = p;
        return pid;
    }

    public removePlayer(id: string): void {
        delete this.players[id];
    }

    public removePlayerByName(name: string): boolean {
        let id: string;
        for (let key in this.players) {
            if (this.players[key].name === name) {
                id = key;
                break;
            }
        }
        if (id) {
            delete this.players[id];
            return true;
        }
        return false;
    }

    public finalizeSetup(): void {
        this.game_started = true;
        let number_of_decks = this.getNumberOfDecks();
        this.deck = new Deck(number_of_decks);
        this.beginRound();
    }

    public getCurrentRound(): Round {
        return this.rounds[this.current_round];
    }

    public getCurrentRoundIndex(): number {
        return this.current_round;
    }

    public getPlayerCount(): number {
        return Object.keys(this.players).length;
    }

    public isGameFinished(): boolean {
        return this.game_finished;
    }

    public isBiddingComplete(): boolean {
        return this.getCurrentRound().isBiddingComplete();
    }

    public isGameStarted(): boolean {
        return this.game_started;
    }

    public getNumberOfDecks(): number {
        let total_needed_for_first_round = (this.getPlayers().length * 10) + 1;
        let number_of_decks = Math.floor((total_needed_for_first_round / 52));
        if (total_needed_for_first_round % 52 > 0) {
            number_of_decks++;
        }
        return number_of_decks;
    }

    public getRemainingCardsInDeck(): number {
        return this.deck.getRemainingCardsInDeck();
    }

    public getScoreboard(): Scoreboard {
        return this.scoreboard;
    }

    public beginRound(): void {
        if (!this.game_started) {
            return;
        }

        let current = this.getCurrentRound();
        if (current != undefined && current.round_finished) {
            this.finishRound();
            current = this.getCurrentRound();
        } 
        
        if (current == undefined) {
            let dealer: number;
            dealer = (10 - this.current_round) % this.getPlayerCount();
            this.rounds[this.getCurrentRoundIndex()] = new Round(this.getCurrentRoundIndex(), Object.values(this.players), dealer, this.deck);
        }
    }

    public finishRound(): void {
        this.scoreboard.addRound(this.getCurrentRound());
        this.current_round--;
        if (this.current_round < 1)
        {
            // finish game
            this.game_finished = true;
        }
    }

    public clearTable(): void {
        if (this.getCurrentRound().current_hand.length === this.getPlayers().length) {
            this.getCurrentRound().current_hand = [];
        }
    }

}

// export = Game;