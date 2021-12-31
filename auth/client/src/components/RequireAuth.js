import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const RequireAuth =(props) =>{

    const auth = useSelector(state=> state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth){
            navigate('/')
        }
    }, [auth])
    return props.children
}

//<RequireAuth>  here is the component we want to protect </RequireAuth>

export default RequireAuth
