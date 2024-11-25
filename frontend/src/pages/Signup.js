import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Signup = () => {

  const [signupInfo, setSignUpInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const serverUrl = "https://auth-mern-app-1-api.vercel.app";

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    const copySignUpInfo = {...signupInfo}
    copySignUpInfo[name] = value;
    setSignUpInfo(copySignUpInfo)
  }

  console.log(`SignUp Info: `, signupInfo);

  const handleSignUp = async(e) => {
    e.preventDefault()
    const {name, email, password} = signupInfo;
    if(!name || !email || !password) {
      return handleError('name, email and password are required')
    }

    try {
      const url = `${serverUrl}/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })
      const result = await response.json();
      const {success, message, error} = result;

      if(success) {
        handleSuccess(message)
        setTimeout(() => {
            navigate('/login')
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
      <h1>Sign Up</h1>
      <form onSubmit={(e) => handleSignUp(e)}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            type='text'
            name='name'
            autoFocus
            placeholder='Enter your name...'
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='text'
            name='email'
            placeholder='Enter your email...'
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={signupInfo.password}
          />
        </div>
        <button>Sign Up</button>
        <span>Already have an accout ?
          <Link to="/login"> Login</Link>
        </span>
      </form>

      <ToastContainer  />
    </div>
  )
}

export default Signup