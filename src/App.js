import React, { useEffect, useState } from 'react';
import './Login.css' ;
import Login from './Login';
import { Routes,Route } from 'react-router-dom';
import Otp from './Otp';
import Device from './Device';



function App(){
  // const [data,setData] = useState(null);

  // useEffect(()=>{
  //   fetch('/api')
  //   .then((res)=>res.json())
  //   .then((data)=> {
  //     console.log("data", data)
  //     setData(data.message)
  //   });
  // },[]);
  return(
    <div className='App'>
  {/* <p>{!data ? "Loading..." : data}</p> */}
    <Routes>
    
    <Route path='/' element ={<Login/>}/>
      <Route path='/Otp' element ={<Otp/>}/>
      <Route path='/Device' element ={<Device/>}/>
    </Routes>
    </div>
  )
}
export default App