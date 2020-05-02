import Card from './card';
import PlayedCard from './playedCard';

export default class Player {   
    name: string;
    id: string;
    hand: Card[] = [];
    
    constructor(name: string) {
        this.name = name;
        this.id = Math.round(Math.random() * 100000).toString();
    }

    public getName(): string {
        return this.name;
    }

    public getId(): string {
        return this.id;
    }

    public getHand(): Card[] {
        return this.hand;
    }

    public setHand(hand: Card[]): void {
        this.hand = hand;
    }

    public getCardIndexInHand(card:Card): number {
        return this.hand.findIndex(c => c.equals(card));
    }

    public playCard(card: Card, lead: PlayedCard): boolean {
        if (this.handContainsCard(card)) {
            if (lead && lead.card.suit != card.suit && this.handContainsLeadSuit(lead.card.suit)) {
                return false;
            }
            let hand_index: number = this.getCardIndexInHand(card);
            this.hand.splice(hand_index, 1);
            return true;
        } else {
            return false;
        }        
    }

    private handContainsCard(card: Card): boolean {
        var hand_index: number = this.getCardIndexInHand(card);
        return (hand_index > -1);
    }

    private handContainsLeadSuit(suit: string): boolean {
        return this.hand.findIndex((c) => c.suit === suit) !== -1;
    }

}

// export = Player;