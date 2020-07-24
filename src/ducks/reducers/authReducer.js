const initialState = {
    user: {}

}


//action type variables

const GET_USER = 'GET_USER'


//action function

export function getUser(account){
    return{
        type: GET_USER,
        payload: account
    }
}


export default function authReducer(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case GET_USER: 
            return {...state, user: payload}
        
        default: 
            return state
    }
}