import { combineReducers } from 'redux'

// Databases
import CharactersReducer from './reducer-characters'
import PokedexReducer from './reducer-pokedex'
// import TypesReducer from './reducer-types'
// import MovesReducer from './reducer-moves'
// import ItemsReducer from './reducer-items'

// Active Game
import PlayerReducer from './reducer-player'
import FoeReducer from './reducer-foe'
import PlayerPokemonReducer from './reducer-player-pokemon'
import FoePokemonReducer from './reducer-foe-pokemon'

const rootReducer = combineReducers({
  characters: CharactersReducer,
  pokedex: PokedexReducer,
  // types: TypesReducer,
  // moves: MovesReducer,
  // items: ItemsReducer,
  // foeDamage: GameReducer,
  player: PlayerReducer,
  foe: FoeReducer,
  player_pokemon: PlayerPokemonReducer,
  foe_pokemon: FoePokemonReducer
})

export default rootReducer
