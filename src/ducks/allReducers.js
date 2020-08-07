import quoteReducer from '../ducks/reducers/quoteReducer'
import authReducer from '../ducks/reducers/authReducer'
import profileReducer from './reducers/profileReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    quoteReducer, 
    authReducer,
    profileReducer

})

export default allReducers