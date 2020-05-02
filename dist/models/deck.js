"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
const underscore_1 = __importDefault(require("underscore"));
class Deck {
    constructor(number_of_decks) {
        this.cards = [];
        this.number_of_decks = number_of_decks;
        this.shuffle();
    }
    shuffle() {
        this.cards = [];
        this.trump = undefined;
        for (let i = 0; i < this.number_of_decks; i++) {
            this.cards = this.cards.concat(this.getSingleDeck());
        }
        this.cards = underscore_1.default.shuffle(this.cards);
    }
    getCards() {
        return this.cards;
    }
    getTrump() {
        return this.trump;
    }
    flipTrump() {
        if (this.trump == undefined) {
            this.trump = this.cards.pop();
        }
        return this.trump;
    }
    deal(number_of_cards, player_list) {
        this.shuffle();
        player_list.forEach(player => {
            let hand = [];
            for (let i = 0; i < number_of_cards; i++) {
                hand.push(this.cards.pop());
            }
            player.setHand(hand);
        });
        this.flipTrump();
    }
    getRemainingCardsInDeck() {
        return this.cards.length;
    }
    getSingleDeck() {
        let cards = [];
        let suits = ['h', 'd', 's', 'c'];
        suits.forEach(suit => {
            for (let i = 2; i < 15; i++) {
                cards.push(new card_1.default(suit, i));
            }
        });
        return cards;
    }
}
exports.default = Deck;
// export = Deck;
//# sourceMappingURL=deck.js.map