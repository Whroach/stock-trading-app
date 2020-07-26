import quotesReducer from '../ducks/reducers/quotesReducer'
import authReducer from '../ducks/reducers/authReducer'
import profileReducer from './reducers/profileReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    quotesReducer, 
    authReducer,
    profileReducer

})

export default allReducers