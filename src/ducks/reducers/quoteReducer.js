const initialState ={
    stockQuote: ''

}


//action variables

const GET_STOCK_QUOTE = 'GET_STOCK_QUOTE'

//action functions

export function getStockQuote(value){
    
    return {
        type: GET_STOCK_QUOTE,
        payload: value
    }
}



export default function quoteReducer(state = initialState, action){
    const {type, payload} = action 

    switch(type){
        case GET_STOCK_QUOTE:
            return {...state, stockQuote: payload }

        default: {
            return state
        }
    }

};