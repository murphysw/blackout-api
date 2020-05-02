"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    getSuit() {
        return this.suit;
    }
    getValue() {
        return this.value;
    }
    equals(card) {
        return card.suit == this.suit && card.value == this.value;
    }
    /// Returns true if this card is better than the one supplied
    isBetterCard(newCard, trump) {
        // new card matches current suit, return if the current card is higher (current wins in tie)
        if (this.suit === newCard.suit) {
            return (this.value >= newCard.value);
        }
        else {
            // new card is trump, new card is better
            if (newCard.suit === trump) {
                return false;
            }
            else {
                // new card is off suit, current card is better
                return true;
            }
        }
    }
}
exports.default = Card;
// export = Card;
//# sourceMappingURL=card.js.map