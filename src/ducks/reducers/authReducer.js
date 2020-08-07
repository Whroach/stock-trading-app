const initialState = {
    user: {}

}


//action type variables

const GET_USER = 'GET_USER'
const HANDLE_DEPOSITS = 'HANDLE_DEPOSITS'
const LOGOUT_USER = 'LOGOUT_USER'



//action function

export function getUser(account){
    console.log(account)

    return{
        type: GET_USER,
        payload: account
    }
}

export function depositFunds(value){
    return {
        type: HANDLE_DEPOSITS,
        payload: value

    }
}

export function logout(){
    return {
        type: LOGOUT_USER,
        payload: {}
    }

}




export default function authReducer(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case GET_USER:
            return {...state, user: payload};
        case HANDLE_DEPOSITS: 
            return {...state, user: payload};
        case LOGOUT_USER:
            return {...state,user:payload}
        
        default: 
            return state
    }
}