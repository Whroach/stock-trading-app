const initialState = {
    profile: []

}


const GET_PROFILE = 'GET_PROFILE'

export function getProfile(profileObj){


    return {
        type: GET_PROFILE,
        payload: profileObj
    }

}


export default function profileReducer(state = initialState, action){

    const {type, payload } = action


    switch(type){
        case GET_PROFILE: 

        return {...state, profile: payload}

        default: {
            return state

        }
    }

}