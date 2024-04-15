import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Otp.css";

export default function Otp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e, index) {
    if (isNaN(e.target.value)) return false;

    setOtp([...otp.map((data, indx) => indx === index ? e.target.value : data)]);

    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.trim() === "") {
      setErrorMessage("Please enter OTP");
      return;
    }
    if(otpString.length !== 6){
      setErrorMessage("Please enter 6 digit OTP");
      return;
    } 
    navigate('/Device');
    axios.post('https://uat.valorpaytech.com/api/login', { otp: otpString })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error('Error submitting OTP:', error);
      });
  };

  return (
    <div className="container">
      <div className="center-content">
        <h3>Enter OTP</h3>
      </div>

      <div className='otp-area'>
        {otp.map((data, i) => {
          return <input className="input-box"
            key={i}
            type="text"
            value={data}
            maxLength={1}
            onChange={(e) => handleChange(e, i)}
          />;
        })}
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <center>
        <button className="submit-button" onClick={handleSubmit}>Verify</button>
      </center>
    </div>
  );
}
