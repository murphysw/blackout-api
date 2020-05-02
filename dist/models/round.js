"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playedCard_1 = __importDefault(require("./playedCard"));
class Round {
    constructor(index, player_list, dealer, deck) {
        this.bids = {};
        this.tricks_taken = {};
        this.current_hand = [];
        this.score = {};
        this.player_list = [];
        this.bidding_complete = false;
        this.round_finished = false;
        this.index = index;
        this.player_list = player_list;
        this.dealer_index = dealer;
        let leftOfDealer = (dealer + 1) % player_list.length;
        this.current_bidder_index = leftOfDealer;
        this.leader_index = leftOfDealer;
        this.current_player_index = leftOfDealer;
        this.deck = deck;
        this.deck.deal(index, player_list);
        for (let player of player_list) {
            this.tricks_taken[player.id] = 0;
        }
    }
    isRoundFinished() {
        return this.round_finished;
    }
    isBiddingComplete() {
        return this.bidding_complete;
    }
    getIndex() {
        return this.index;
    }
    getBids() {
        return this.bids;
    }
    getBid(player_id) {
        return this.bids[player_id];
    }
    getScore() {
        return this.score;
    }
    getTricksTaken() {
        return this.tricks_taken;
    }
    getTricksTakenByPlayer(player_id) {
        return this.tricks_taken[player_id];
    }
    getBidsTotal() {
        let total = 0;
        for (let key in this.bids) {
            total += this.bids[key];
        }
        return total;
    }
    getTricksTakenTotal() {
        let total = 0;
        for (let key in this.tricks_taken) {
            total += this.tricks_taken[key];
        }
        return total;
    }
    getCurrentHand() {
        return this.current_hand;
    }
    getCurrentPlayerId() {
        if (this.bidding_complete) {
            return this.player_list[this.current_player_index].getId();
        }
        else {
            return this.player_list[this.current_bidder_index].getId();
        }
    }
    getLeaderId() {
        if (this.leader_index)
            return this.player_list[this.leader_index].getId();
    }
    getDealerId() {
        return this.player_list[this.dealer_index].getId();
    }
    placeBid(player_id, bid) {
        if (this.current_bidder_index === this.getPlayerIndex(player_id)) {
            this.bids[player_id] = bid;
            this.setNextBidder();
        }
        if (Object.keys(this.bids).length == this.player_list.length) {
            this.bidding_complete = true;
        }
    }
    playCard(player_id, card) {
        if (this.bidding_complete == false || this.current_hand.length >= this.player_list.length) {
            return;
        }
        // player is the current index
        if (this.current_player_index === this.getPlayerIndex(player_id)) {
            let currentPlayer = this.player_list[this.current_player_index];
            if (currentPlayer.playCard(card, this.current_hand[0])) {
                this.current_hand.push(new playedCard_1.default(card, player_id));
                this.setNextPlayer();
                if (this.current_hand.length == this.player_list.length) {
                    let trickTaker = this.calculateTrickTaker(); // calculate the winner of the hand
                    this.finishHand(trickTaker);
                }
            }
        }
    }
    getPlayerIndex(player_id) {
        return this.player_list.findIndex(p => p.id == player_id);
    }
    getTrump() {
        return this.deck.getTrump();
    }
    finishHand(trickTaker) {
        this.addTrickTaken(trickTaker);
        let trickTakerIndex = this.getPlayerIndex(trickTaker);
        this.leader_index = trickTakerIndex;
        this.current_player_index = trickTakerIndex;
        if (this.getTricksTakenTotal() == this.index) {
            // round over
            this.calculateScore();
            this.round_finished = true;
        }
    }
    addTrickTaken(player_id) {
        this.tricks_taken[player_id] = this.tricks_taken[player_id] ? this.tricks_taken[player_id] + 1 : 1;
    }
    calculateTrickTaker() {
        let winning_card = this.current_hand[0];
        this.current_hand.forEach(card => {
            if (!winning_card.isBetterCard(card, this.deck.getTrump().getSuit())) {
                winning_card = card;
            }
        });
        return winning_card.played_by;
    }
    calculateScore() {
        for (let player in this.bids) {
            if (this.bids[player] === this.tricks_taken[player]) {
                this.score[player] = this.bids[player] + 10;
            }
            else {
                this.score[player] = 0;
            }
        }
        return this.score;
    }
    setNextBidder() {
        this.current_bidder_index = (this.current_bidder_index + 1) % this.player_list.length;
    }
    setNextPlayer() {
        this.current_player_index = (this.current_player_index + 1) % this.player_list.length;
    }
}
exports.default = Round;
// export = Round;
//# sourceMappingURL=round.js.map