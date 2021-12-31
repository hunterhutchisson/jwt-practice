import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from "../../actions";

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  //collect info from form
  //dispatch action with form data
  //after the action is dispatched, and the user is authenticated,
  //redirect our user to homepage, or protected

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp({email, password}, ()=>{
      navigate('/')
    }))
  }
  

  return (
  <div className="mt-5">
  
    <div className="grid align__item">

      <div className="register">

            <img height="100px" src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4" alt=""/>

            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit} className="form">

              <div className="form__field">
                <input type="email" placeholder="enter email address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>

              <div className="form__field">
                <input type="password" placeholder="enter password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
              </div>

              <div className="form__field">
                <input type="submit" value="Sign Up" />
              </div>

          </form>

          <p>Already have an account? <Link to="/signin">Log in</Link></p>

      </div>

    </div>
  
  </div>);
};

export default Signup;
