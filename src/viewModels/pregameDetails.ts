import Player from '../models/player';

export default interface PregameDetailsDisplay {
    player_list: Player[];
    decks_required: number;
    game_started: boolean;
}

// export = PregameDetailsDisplay;