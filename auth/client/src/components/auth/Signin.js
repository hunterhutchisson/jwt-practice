import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from "../../actions";


const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({email, password}, ()=>{
      navigate('/feature')
    }))
  }
  
  return( 
  <div className="mt-5">
  
    <div className="grid align__item">

      <div className="register">

        <img height="100px" src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4" alt=""/>
       

        <h2>Sign In</h2>

        <form onSubmit={handleSubmit} className="form">

            <div className="form__field">
              <input type="email" placeholder="info@mailaddress.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="form__field">
              <input type="password" placeholder="••••••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <div className="form__field">
              <input type="submit" value="Log In" />
            </div>

        </form>

        <p>Don't have an account? <Link to="/signup">Register Here</Link></p>

      </div>

    </div>
  
  </div>);
};

export default Signin;
