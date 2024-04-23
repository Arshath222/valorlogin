import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "./Image/username.png";
import email from "./Image/email.png";
import passwordImg from "./Image/password.png";
import cursor from './Image/username.png';
import ReCAPTCHA from 'react-google-recaptcha'
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
  //     setError();
  //   }
  // };

   const dummyClick = () => {
   console.log('Dummy')
  }
  const handleLogin = () => {
    axios.post('https://uat.valorpaytech.com/api/login',enteredCredentials).then(res => {


      console.log("res", res)
      if(res.status===200){
        localStorage.setItem('user',JSON.stringify(res.data.user))
        if(res?.data?.data?.faData?.response?.is_enable_2fa === 1){
          navigate('/Otp'); 
        }else{
              
          navigate('/Device'); 
        }
       
      }else{
        setError('Invalid username or password')
      }
    }).catch(err => {
      setError('Invalid username or password')
      
      if(err.response.status===500){
   
        localStorage.removeItem('user')
      }
    })
  };
  console.log("errrrrorrr",error)

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
           
            <div>
              <button disabled={!username || !password } className="login-button" onClick={handleLogin}>
                Log In
                <ReCAPTCHA style={{ visibility: 'hidden' }}  size='invisible' sitekey={'6LcFH1cbAAAAAJNCaq7-zTaOdM3crVviOj1HGgsO'} 
                //onClick={dummyClick}
                // onChange={this.handleChange} 
                // onExpired={this.redoCaptcha}
                 />
              </button>
              {error && <p className="error" style={{color:'red'}}>{error}</p>}
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

//let myVar = prompt("Please provide review for the website")
//console.log(myVar)
//console.log(Math.ceil(4.1))
//console.log(Math.floor(4.1))
//console.log(Math.trunc(4.1))
//console.log(Math.pow(5,4))
//console.log(Math.random())
//console.log(Math.random())
//console.log(Math.floor(Math.random()*10))

//console.log(Math.floor(Math.random())+1)

//console.log(Math.floor(Math.random()*10)+1)

//console.log(Math.floor(Math.random()*10)+1)

//let myVariable = "Mohammed Arshath";
//let randomLetter = myVariable[Math.floor(Math.random()*myVariable.length)]
//console.log(randomLetter)
//console.log(randomLetter)
//console.log(randomLetter)

//const myVariable1 = "mohammedarshath";
//const myVariable2 = "msharukhkumardw";
//if(myVariable1.length == myVariable2.length){
  //console.log('both are same values');
//}
//else{
  //console.log('Values are different');
//}
/*const expr = 'Papayas';
switch (expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'Mangoes':
    console.log('Mangoes are $0.80 a pound.');
    break;

  case 'Papayas':
    console.log('papayas are $2.79 a pound.');
    // Expected output: "Mangoes and papayas are $2.79 a pound."
    break;
  default:
    console.log(`Sorry, we are out of ${expr}.`);
}

const name = "Arshath"
switch (name){
  case 'Ramesh':
    console.log("Sorry you are not arshath")
    break;
    case 'Arshathuuu':
      console.log("You are similar like arshath but not him")
      break;
      case 'Arshath':
        console.log("Hey Arshath , How you doing")
        break;
        default:
          console.log("User doesn't exist")
}*/
//const resine = 8>6;
//resine ? console.log("true"):console.log("false");

//const Rock = true
//const scissor = false
//Rock > scissor ? console.log("Player wins"):console.log("Computer Wins");*/
//let getInput = prompt('Please enter your feedback');
//console.log(getInput);
//console.log("Helo Subscribers");
// Your First Interactive Game
// Function to prompt the user with a message and return a boolean indicating their choice
/*function customConfirm(message) {
  return window.confirm(message);
}

let playGame = customConfirm("Shall we play rock, paper, or scissors?");
if (playGame) {
  do {
    //play
    let playerChoice = prompt("Please enter rock, paper, or scissors.");
    if (playerChoice !== null) { // Check if player cancelled the prompt
      let playerOne = playerChoice.trim().toLowerCase();
      if (
        playerOne === "rock" ||
        playerOne === "paper" ||
        playerOne === "scissors"
      ) {
        let computerChoice = Math.floor(Math.random() * 3 + 1);
        let computer =
          computerChoice === 1
            ? "rock"
            : computerChoice === 2
            ? "paper"
            : "scissors";

        let result =
          playerOne === computer
            ? "Tie game!"
            : playerOne === "rock" && computer === "paper"
            ? `playerOne: ${playerOne}\nComputer: ${computer}\nComputer wins!`
            : playerOne === "paper" && computer === "scissors"
            ? `playerOne: ${playerOne}\nComputer: ${computer}\nComputer wins!`
            : playerOne === "scissors" && computer === "rock"
            ? `playerOne: ${playerOne}\nComputer: ${computer}\nComputer wins!`
            : `playerOne: ${playerOne}\nComputer: ${computer}\nplayerOne wins!`;
        alert(result);
      } else {
        alert("You didn't enter rock, paper, or scissors.");
      }
    } else {
      alert("I guess you changed your mind. Maybe next time.");
      break; // Exit the loop if player cancels
    }
  } while (customConfirm("Play Again?"));
  alert("Ok, thanks for playing.");
} else {
  alert("Ok, maybe next time.");
}*/


//let i;
//for(i=50;i>=10;i--)
  //console.log(i);

//let name = 'Mohammed Arshath';
//for( let i=0;i<=name.length;i++){
  //console.log(name.charAt(i));
//}
// let myName = 'Mohammed Arshath';
// for( let i=16;i>=myName.length;i--){
//   console.log(myName.charAt(i));
// }

/*let name = 'Arshath';
for(let i=0;i<=name.length;i++){
  if (i==2){
break;
}
  for(let j=0;j<=name.length;j++){
  console.log(i,j);
}
}

let myName = 'Arshath';
for(let i=0;i<=myName.length;i++){
  if (i==2){
continue;
}
  for(let j=0;j<=myName.length;j++){
  console.log(i,j);
}
}*/

//let name = "Valor paytech"
//let finalName = '';

//for(let i=name.length-1;i>=0;i--){
  //finalName = finalName + name[i]
//}
//console.log(finalName)

//let word = "I am a bad man ";
//let finalOne = word.split('');
//console.log(finalOne)

//let sum = (a,b) =>{
 //return a+b
//}
//console.log(sum(7,8))

//let mail = 'arshuabnoor@gmail.com'.split('@gmail.com')
//console.log(mail)

//let mail = 'arshuabnoor@gmail.com', 
//sconsole.log(mail.slice(0,mail.indexOf("@")));


//function mail(email){
  //return(email.slice(0,email.indexOf("@")));
//}
//console.log(mail('arshuabnoor@gmail.com'))
// //
// console.log(mail('arunvarkish457@gmail.com'))
// console.log(mail('baskar4511@gmail.com'))
// console.log(mail('Ramesh@gmail.com'))

//function toProperCase(name){
 // return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
//}
//console.log(toProperCase("mohamedArshath"))

// let myArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
// myArray.unshift("A");
// console.log(myArray);
// myArray.shift();
// console.log(myArray);
// //console.log(myArray[myArray.length-1])

// let myArray = ["Mohammed","Arshath",'is',"a","good",'boy']
// let myArray1 = ['but','he','is','unlucky','ever']
// let newResult = [...myArray,...myArray1]
// let reverseString = newResult.reverse()
// console.log(newResult)
// console.log(reverseString)
//const result = myArray.reverse()
//console.log(result)

// let myObject = {
//   name : "Arshath",
//   Age : 27,
//   money :
//   {start : 'coding',
//           learn : 'javascript'},   
//   Work: ['eat','code','sleep'],
//   passion : function () {
//     return `You need to be best in ${this.money.start} you need to learn ${this.money.learn}`;
//   }
// }
// //console.log(myObject.passion())

// const lifeStyle = Object.create(myObject)
//  console.log(lifeStyle.passion())

// const bestLife = Object.create(lifeStyle);
// console.log(bestLife)
// bestLife.age = 32;
// console.log(bestLife.age)
// console.log(Object.keys(myObject))
// console.log(Object.values(myObject))

// const myMovie = {
//   hero : ' Ashwin',
//   heroin : ' aishwarya',
//   dir : 'Pradeep',
//   producer: 'arunachalam'
// }
// //delete myMovie.heroin;
// myMovie.musicdir = 'ARR';
// //delete myMovie.musicdir;

// console.log(myMovie.hasOwnProperty('musicdir'))
// for(let cast in myMovie){
//   //console.log(cast)
//   console.log(`the final ${cast} that we declared ${myMovie[cast]}`);

// }

// //console.log(`the movie heroine name is ${myMovie.heroin}`);
// const aadhar = {
//   name: " Arshath",
//   Age : 27,
//   phoneno : 7904617708,
//   Address : ' chinnamanur'
// }

// const {Address: myNativePlace} = aadhar;
// console.log(myNativePlace)

// const mybike = {
//   color : 'red ',
//   Engine :"fluel Injection",
//   model : function(){
//     return console.log(`I need a ${this.color} yamaha with ${this.Engine} core system`);
//   }
// }

// mybike.model();

// class mybike1 {
//   constructor(Color,model,Engine){
//      this.color = Color;
//      this.model = model;
//      this.engine = Engine;
//      this.wheels = 'two';
//   }
//   get aloyWheels() {
//     return this.wheels;
//   }
//   set aloyWheels(aloyWheels){
//     this.wheels = aloyWheels;
//   }
//   myWish (){
//     return console.log(`i need ${this.color} color of ${this.model} with ${this.engine} with ${this.wheels} new wheels`);
//   }
// }

// const newOrder = new mybike1('red','Yamaha R15','fuel Injection');
// newOrder.myWish()
// const nextOrder = new mybike1('blue','apache 200','dual disk suspension');
// nextOrder.myWish()
// nextOrder.aloyWheels = '3x4 Aloy';

// nextOrder.myWish();

// getElementbyID = just need to put id name 
// querySelector = Need to put # to represent 

//Event Listeners 