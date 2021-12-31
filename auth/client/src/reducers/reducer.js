import types from '../actions/actionTypes';

const initialState = {
   auth: "",
   error: ""
}

const reducerTemplate = (state = initialState, action) => {

    switch(action.type){
        case types.AUTH_USER:
            return {
                ...state,
                auth: action.data
            }
        case types.ERR:
            return {
                ...state,
                error: action.data
            }
        default:
            return state;
    } 
}


export default reducerTemplate