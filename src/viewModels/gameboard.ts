import Player from '../models/player';
import Card from '../models/card';
import PlayedCard from '../models/playedCard';

export default interface GameboardDisplay {
    players: Player[];
    number_of_decks: number;
    cards_remaining_in_deck: number;
    game_started: boolean;
    current_round: number;
    trump: Card;
    tricks_taken: {[player_id: string]: number};
    current_hand: PlayedCard[];
    bidding_complete: boolean;
    round_finished: boolean;
    current_player_id: string;
    dealer_id: string;
    leader_id: string;    
    projected_hand_winner: string;
    game_finished: boolean;
}

// export = GameboardDisplay;