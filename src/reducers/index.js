import {combineReducers} from 'redux'
import GameReducer from './reducer-game'

const rootReducer = combineReducers({game: GameReducer})

export default rootReducer
