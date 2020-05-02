export default class Card {
    suit: string;
    value: number;

    constructor(suit: string, value: number) {
        this.suit = suit;
        this.value = value;
    }

    public getSuit(): string {
        return this.suit;
    }

    public getValue(): number {
        return this.value;
    }

    public equals(card: Card): boolean {
        return card.suit == this.suit && card.value == this.value;
    }


    /// Returns true if this card is better than the one supplied
    public isBetterCard(newCard: Card, trump: string): boolean {
        // new card matches current suit, return if the current card is higher (current wins in tie)
        if (this.suit === newCard.suit) {            
            return (this.value >= newCard.value);
        } else {
            // new card is trump, new card is better
            if (newCard.suit === trump) {
                return false            
            } else {
                // new card is off suit, current card is better
                return true;
            }
        }        
    }
}

// export = Card;