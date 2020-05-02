import Card from './card';

export default class PlayedCard {
    card: Card;
    played_by: string; 

    constructor(card: Card, played_by:string) {
        this.card = card;
        this.played_by = played_by;
    }

    public isBetterCard(card: PlayedCard, trump: string): boolean {
        return this.card.isBetterCard(card.getCard(), trump);
    }

    public getCard(): Card {
        return this.card;
    }

    public getPlayerId(): string {
        return this.played_by;
    }

}

// export = PlayedCard;