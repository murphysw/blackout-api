"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayedCard {
    constructor(card, played_by) {
        this.card = card;
        this.played_by = played_by;
    }
    isBetterCard(card, trump) {
        return this.card.isBetterCard(card.getCard(), trump);
    }
    getCard() {
        return this.card;
    }
    getPlayerId() {
        return this.played_by;
    }
}
exports.default = PlayedCard;
// export = PlayedCard;
//# sourceMappingURL=playedCard.js.map