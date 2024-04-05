import { useState } from "react";
import "./Otp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Otp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();

  function handleChange(e, index) {
    if (isNaN(e.target.value)) return false;

    setOtp([...otp.map((data, indx) => indx === index ? e.target.value : data)]);

    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  const handleSubmit = () => {
    // Join the OTP array elements into a single string
    const otpString = otp.join('');
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
      <center>
    
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </center>
    </div>
  );
}