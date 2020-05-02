import Card from './card';
import Player from './player';
import _ from "underscore";

export default class Deck {    
    number_of_decks: number;
    cards: Card[] = [];
    trump: Card;

    constructor(number_of_decks: number) {
        this.number_of_decks = number_of_decks;
        this.shuffle();
    }    

    public shuffle(): void {
        this.cards = [];
        this.trump = undefined;

        for (let i = 0; i < this.number_of_decks; i++)
        {
            this.cards = this.cards.concat(this.getSingleDeck());
        }

        this.cards = _.shuffle(this.cards);
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public getTrump(): Card {
        return this.trump;
    }

    public flipTrump(): Card {
        if (this.trump == undefined) {
            this.trump = this.cards.pop();
        }
        
        return this.trump;
    }

    public deal(number_of_cards: number, player_list: Player[]) {
        this.shuffle();
        player_list.forEach(player => {
            let hand: Card[] = [];
            for (let i: number = 0; i < number_of_cards; i++)
            {
                hand.push(this.cards.pop());
            }
            player.setHand(hand);
        });
        this.flipTrump();
    }

    public getRemainingCardsInDeck(): number {
        return this.cards.length;
    }


    private getSingleDeck(): Card[] {
        let cards: Card[] = [];
        let suits: string[] = ['h', 'd', 's', 'c'];
        suits.forEach(suit => {
            for (let i = 2; i < 15; i++) {
                cards.push(new Card(suit, i));
            }    
        });    

        return cards;           
    }
}

// export = Deck;