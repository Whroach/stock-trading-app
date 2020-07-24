const initialState ={
    stockQuotes: []

}


//action variables

const GET_STOCK_QUOTES = 'GET_STOCK_QUOTES'

//action functions

export function getStockQuotes(value){
    
    return {
        type: GET_STOCK_QUOTES,
        payload: value
    }
}



export default function quotesReducer(state = initialState, action){
    const {type, payload} = action 

    switch(type){
        case GET_STOCK_QUOTES:
            return {...state, stockQuotes: payload }

        default: {
            return state
        }
    }

};