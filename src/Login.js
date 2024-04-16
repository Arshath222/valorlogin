import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "./Image/username.png";
import email from "./Image/email.png";
import passwordImg from "./Image/password.png";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //

   const enteredCredentials = {
    emailId: username,
    password: password
   };

  //   const correctCredentials = {
  //     emailId: 'Arshath',
  //     password: 'Welcome1#'
  //   };

  //   if (
  //     enteredCredentials.emailId === correctCredentials.emailId &&
  //     enteredCredentials.password === correctCredentials.password
  //   ) {
  //     axios.post("https://uat.valorpaytech.com/api/loginOTP", enteredCredentials)
  //       .then(res => {
  //         console.log(res.data);
  //         navigate('/Otp');
  //       })
  //       .catch(error => {
  //         console.error('Error logging in:', error);
  //         setError('An error occurred while logging in.');
  //       });
  //   } else {
  //     setError('Invalid username or password');
  //   }
  // };
  const handleLogin = () => {
    axios.post('https://uat.valorpaytech.com/api/loginOTP',enteredCredentials).then(res => {


      console.log("res", res)
      if(res.status===200){
        localStorage.setItem('user',JSON.stringify(res.data.user))
        if(res.data.data.faData.response.is_enable_2fa === 1){
          navigate('/Otp'); 
        }else{
          navigate('/Device'); 
        }
       
      }
    }).catch(err => {
      console.log("err ", err )
      if(err.response.status===500){
        setError(err.response.data.message)
        localStorage.removeItem('user')
      }
    })
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
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="second-input">
              <img src={passwordImg} alt="password" className="email" />
              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div>
              <button disabled={!username || !password } className="login-button" onClick={handleLogin}>
                Log In
              </button>
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
