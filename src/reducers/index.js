import { combineReducers } from 'redux'
import TrainersReducer from './reducer-trainers'

const rootReducer = combineReducers({
  trainers: TrainersReducer
})

export default rootReducer
