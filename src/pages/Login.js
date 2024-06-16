import React, { useContext, useState } from 'react';
import { Context  } from '../index';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://hospital-management-system-backend-edeu.onrender.com/api/v1/user/login", 
        {email, password, confirmPassword, role : "Patient"}, 
        {
          withCredentials : true, 
          headers : {"Content-Type" : "application/json"}
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        navigateTo("/");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

      })
      
    } 
    catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthenticated){
    return <Navigate to={"/"} />
  }

  return (
    <div className='container form-component login-form'>
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <p>Log in to access your patient portal and manage your health records securely.</p><p> New to ZeeCare? Register now to access your personal health information.</p>

      <form onSubmit={handleLogin}>
        <input 
          type='text' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Email' 
        />
        <input 
          type='password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Password' 
        />
        <input 
          type='password' 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder='Confirm Password' 
        />

        <div style={{
            gap : "10px",
            justifyContent : "flex-end",
            flexDirection : "row",
          }}
        >
          <p style={{marginBottom : 0}}>Not Register</p>
          <Link 
            to={"/register"}
            style={{
              textDecoration : "none",
              alignItems : "center",
              color: "#271776ca"
            }}
          >
            Register Now
          </Link>
        </div>

        <div
          style={{
            justifyContent : "center",
            alignItems : "center"
          }}
        >
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login