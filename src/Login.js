import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from './Image/username.png';
import email from './Image/email.png';
import passwordImg from './Image/password.png';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  

  const handleLogin = () => {
    const credentials = {
        emailId: 'Arshath',
        password: 'Welcome1#'
    };
 
   
//const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjE0MiwidXNlcl90eXBlX2lkIjoxLCJwZXJtaXNzaW9ucyI6WyJtb2R1bGVzOioiLCJ1c2VyOmFkbWluIl0sInNlc3Npb25faWQiOiI2NWRmNjc4Mi02ZjhkLTQ4NTQtYTEzYi00ZmQxMTc4Y2VmNWIiLCJpYXQiOjE3MTIxMzgyNDQsImV4cCI6MTcxMjE2NzA0NH0.L1mVcFCnmXseTE8t6E4Fqu9_k9lAZED-1R54UlntT8M'; 
     
        axios.post("https://uat.valorpaytech.com/api/loginOTP", credentials, {
            headers: {
                //Authorization: `Bearer ${authToken}`
            }
        })
        .then(res => {
            console.log(res.data); 
            navigate('/Otp');
           
        })
        .catch(error => {
            console.error('Error logging in:', error);
            setError('Invalid username or password'); 
        });
    };
  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <h1>Login Page</h1>
            <div>
              <img src={email} alt="email" className="email" />
              <input
                type="text"
                placeholder="Username"
                className="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="second-input">
              <img src={passwordImg} alt="password" className="email" />
              <input
                type="password"
                placeholder="Password"
                className="name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div >
              <button className ='login-button' onClick={handleLogin}>Log In</button>
            </div>
            <p className="link">
              <Link to="#">Forgot password</Link>
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
