import quotesReducer from '../ducks/reducers/quotesReducer'
import authReducer from '../ducks/reducers/authReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    quotesReducer, 
    authReducer

})

export default allReducers