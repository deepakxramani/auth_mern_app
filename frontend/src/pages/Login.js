import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const serverUrl = "https://auth-mern-app-1-api.vercel.app";

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    const copyLoginInfo = {...loginInfo}
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo)
  }

  console.log(`Login Info: `, loginInfo);

  const handleLogin = async(e) => {
    e.preventDefault()
    const { email, password} = loginInfo;
    if(!email || !password) {
      return handleError('Email and Password are required')
    }

    try {
      const url = `${serverUrl}/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
      const result = await response.json();
      const {success, message, jwtToken, name ,error} = result;

      if(success) {
        handleSuccess(message)
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name)
        setTimeout(() => {
            navigate('/home')
        },1000)

      } else if(error) {
        const details = error?.details[0].message
        handleError(details);
        
      } else if(success) {
        handleError(success)
      }

      console.log(result);
    } catch (err) {
        handleError(err)
    }
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={(e) => handleLogin(e)}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='text'
            name='email'
            placeholder='Enter your email...'
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={loginInfo.password}
          />
        </div>
        <button>Login</button>
        <span>Don't have an accout ?
           <Link to="/signup" > Sign Up</Link>
        </span>
      </form>

      <ToastContainer  />
    </div>
  )
}

export default Login;