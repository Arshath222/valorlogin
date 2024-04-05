import React from 'react';
import './Login.css' ;
import Login from './Login';
import { Routes,Route } from 'react-router-dom';
import Otp from './Otp';
import Device from './Device';


function App(){
  return(
    <div className='App'>
  
    <Routes>
    
    <Route path='/' element ={<Login/>}/>
      <Route path='/Otp' element ={<Otp/>}/>
      <Route path='/Device' element ={<Device/>}/>
    </Routes>
    </div>
  )
}
export default App