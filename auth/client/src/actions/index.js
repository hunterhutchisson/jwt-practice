
import types from './actionTypes';
import axios from './axios'

//api call
//dispatch

//error message

//store.dispatch

//function that returns an object
//instead using thunk return a function

//registering
export const signUp = (formData, cb) => async (dispatch)=>{
    try{
        //make api call to server /register route
        //expects email, password in header

        let response = await axios.post('/register', formData) //second argument is an object what we want to send. formdata already object

        //in the response is a token = response.data.token
        //take the token dispatch to reducer
        //store token in state

        dispatch({
            type: types.AUTH_USER,
            data: response.data.token
        })

        //invoke callback to redirect user
        cb()

        //store token in local store
        localStorage.setItem('token', response.data.token)
    } catch(err){
        console.log('error message:', err);
        //dispatch to reducer
        dispatch({
            type: types.ERR,
            data: err
        })
    }
}


//logging in
export const signIn = (formData, cb) => async (dispatch) => {
    try{
        //make an api call to /login
        let response = await axios.post('/login', formData)
        dispatch({
            type: types.AUTH_USER,
            data: response.data.token
        })

        //invoke callback to redirect user
        cb()

        //store token in local storage
        localStorage.setItem('token', response.data.token)
    } catch(err){

    }
}

export const signOut = (cb) => dispatch =>{
    dispatch({
        types: types.AUTH_USER,
        data: ""
    })
    //clear local storage
    localStorage.removeItem('token')
    cb()
}

export const checkToken = () => async dispatch => {
    if(localStorage.token){
        try{
            let response = await axios.get('/protected', {
                headers: {
                    'authorization': localStorage.token
                }
            })
            if(response.data.isValid)
            dispatch({
                type: types.AUTH_USER,
                data: localStorage.token
            })
        } catch(err){

        }
    }
}