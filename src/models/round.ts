import PlayedCard from './playedCard';
import Card from './card';
import Deck from './deck';
import Player from './player';

export default class Round {    
    index: number;
    bids: {[player_id: string]: number} = {};
    tricks_taken: {[player_id: string]: number} = {};
    current_hand: PlayedCard[] = [];
    score: {[player_id: string]: number} = {};
    player_list: Player[] = [];
    bidding_complete: boolean = false;
    round_finished: boolean = false;
    current_bidder_index: number;
    current_player_index: number;
    dealer_index: number
    leader_index: number;
    deck: Deck;

    constructor(index: number, player_list: Player[], dealer: number, deck: Deck) {
        this.index = index;
        this.player_list = player_list;
        this.dealer_index = dealer; 
        let leftOfDealer: number = (dealer + 1) % player_list.length;
        this.current_bidder_index = leftOfDealer;
        this.leader_index = leftOfDealer;
        this.current_player_index = leftOfDealer;
        this.deck = deck;
        this.deck.deal(index, player_list);
        for (let player of player_list) {
            this.tricks_taken[player.id] = 0;
        }
    }

    public isRoundFinished(): boolean {
        return this.round_finished;
    }

    public isBiddingComplete(): boolean {
        return this.bidding_complete;
    }

    public getIndex(): number {
        return this.index;
    }

    public getBids(): {[player_id: string]: number} {
        return this.bids;
    }

    public getBid(player_id: string): number {
        return this.bids[player_id];
    }

    public getScore(): {[player_id: string]: number} {
        return this.score;
    }

    public getTricksTaken(): {[player_id: string]: number} {
        return this.tricks_taken;
    }

    public getTricksTakenByPlayer(player_id: string): number {
        return this.tricks_taken[player_id];
    }

    public getBidsTotal(): number {
        let total: number = 0;
        for (let key in this.bids) {
            total += this.bids[key];
        }            
        return total;
    }

    public getTricksTakenTotal(): number {
        let total: number = 0;
        for (let key in this.tricks_taken) {
            total += this.tricks_taken[key];
        }            
        return total;
    }

    public getCurrentHand(): PlayedCard[] {
        return this.current_hand;
    }

    public getCurrentPlayerId(): string {
        if (this.bidding_complete) {
            return this.player_list[this.current_player_index].getId();
        } else {
            return this.player_list[this.current_bidder_index].getId();
        }
    }

    public getLeaderId(): string {
        if (this.leader_index)
        return this.player_list[this.leader_index].getId();
    }

    public getDealerId(): string {
        return this.player_list[this.dealer_index].getId();
    }

    public placeBid(player_id: string, bid: number) {
        if (this.current_bidder_index === this.getPlayerIndex(player_id))
        {
            this.bids[player_id] = bid;
            this.setNextBidder();
        }

        if (Object.keys(this.bids).length == this.player_list.length) {
            this.bidding_complete = true;
        }
    }

    public playCard(player_id: string, card: Card): void
    {
        if (this.bidding_complete == false || this.current_hand.length >= this.player_list.length) {
            return;
        }
        // player is the current index
        if (this.current_player_index === this.getPlayerIndex(player_id))
        {
            let currentPlayer: Player = this.player_list[this.current_player_index];            

            if (currentPlayer.playCard(card, this.current_hand[0])) {                
                this.current_hand.push(new PlayedCard(card, player_id));
                this.setNextPlayer();                
                if (this.current_hand.length == this.player_list.length) {
                    let trickTaker: string = this.calculateTrickTaker(); // calculate the winner of the hand
                    this.finishHand(trickTaker);
                }
            } else {
                throw new Error('INVALID');
            }        
        }
    }

    public getProjectHandWinner(): string {
        return this.calculateTrickTaker();
    }

    public getPlayerIndex(player_id: string): number {
        return this.player_list.findIndex(p => p.id == player_id);
    }

    public getTrump(): Card {
        return this.deck.getTrump();
    }

    private finishHand(trickTaker: string): void {
        this.addTrickTaken(trickTaker);
        let trickTakerIndex = this.getPlayerIndex(trickTaker);
        this.leader_index = trickTakerIndex
        this.current_player_index = trickTakerIndex;
        if (this.getTricksTakenTotal() == this.index)
        {
            // round over
            this.calculateScore();
            this.round_finished = true;
        }
    }

    private addTrickTaken(player_id: string) {
        this.tricks_taken[player_id] = this.tricks_taken[player_id] ? this.tricks_taken[player_id] + 1 : 1;
    }

    private calculateTrickTaker(): string {
        if (this.current_hand.length === 0) {
            return '';
        }
        let winning_card: PlayedCard = this.current_hand[0];
        this.current_hand.forEach(card => {
            if (!winning_card.isBetterCard(card, this.deck.getTrump().getSuit())) {
                winning_card = card;
            }            
        });
        return winning_card.played_by;
    }

    private calculateScore(): {[player_id: string]: number}
    {
        for (let player in this.bids) {
            if (this.bids[player] === this.tricks_taken[player]) {
                this.score[player] = this.bids[player] + 10;
            } else {
                this.score[player] = 0;
            }
        }

        return this.score;
    }

    private setNextBidder(): void {
        this.current_bidder_index = (this.current_bidder_index + 1) % this.player_list.length
    }

    private setNextPlayer(): void {
        this.current_player_index = (this.current_player_index + 1) % this.player_list.length
    }
}

// export = Round;