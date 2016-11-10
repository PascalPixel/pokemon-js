import { combineReducers } from 'redux'

// Databases
import PlayersReducer from './reducer-players'
import PokedexReducer from './reducer-pokedex'
import TypesReducer from './reducer-types'
import MovesReducer from './reducer-moves'
import ItemsReducer from './reducer-items'

// Active Game
import GameReducer from './reducer-game'

const rootReducer = combineReducers({
  players: PlayersReducer,
  pokedex: PokedexReducer,
  types: TypesReducer,
  moves: MovesReducer,
  items: ItemsReducer,
  game: GameReducer
})

export default rootReducer
