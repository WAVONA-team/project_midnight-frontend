import { createReactPlayer } from './ReactPlayer';
import players from './players';

// Fall back to FilePlayer if nothing else can play the URL
const fallback = players[players.length - 1];

export default createReactPlayer(players, fallback);
