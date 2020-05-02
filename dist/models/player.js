"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(name) {
        this.hand = [];
        this.name = name;
        this.id = Math.round(Math.random() * 100000).toString();
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getHand() {
        return this.hand;
    }
    setHand(hand) {
        this.hand = hand;
    }
    getCardIndexInHand(card) {
        return this.hand.findIndex(c => c.equals(card));
    }
    playCard(card, lead) {
        if (this.handContainsCard(card)) {
            if (lead && lead.card.suit != card.suit && this.handContainsLeadSuit(lead.card.suit)) {
                return false;
            }
            let hand_index = this.getCardIndexInHand(card);
            this.hand.splice(hand_index, 1);
            return true;
        }
        else {
            return false;
        }
    }
    handContainsCard(card) {
        var hand_index = this.getCardIndexInHand(card);
        return (hand_index > -1);
    }
    handContainsLeadSuit(suit) {
        return this.hand.findIndex((c) => c.suit === suit) !== -1;
    }
}
exports.default = Player;
// export = Player;
//# sourceMappingURL=player.js.map