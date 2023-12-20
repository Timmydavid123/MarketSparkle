import React, {useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import {bootstrap} from 'bootstrap'
import { Toaster } from 'react-hot-toast';
import './Usersignu.css';
// import logo from './assets/three.jpg';



  const Usersignu = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const navigate= useNavigate();
 
   
    const signupSubmit = async (e) => {
       e.preventDefault();
       let userobj = {fullName, email, password, confirmPassword, confirmPassword}
       console.log(userobj)
   
       try {
         const response = await axios.post('https://backends-zgvg.onrender.com/api/signup/user', userobj)
        //  toast.success('Sign up successful.')
         navigate('/Verifyotp')
       } catch (error) {
         toast.error('Sign up unsuccessful.')
       }
    }
  
  
  
    
    // const Usersignu = () => {
    //  const [fullName, setFullName] = useState('')
    //  const [email, setEmail] = useState('')
    //  const [password, setPassword] = useState('')
    //  const [confirmPassword, setConfirmPassword] = useState('')
    //  const navigate= useNavigate();
     
  //    const handlePasswordChange = (e) => {
  //     setPassword(e.target.value);
  // };
  
  // const handleConfirmPasswordChange = (e) => {
  //     setConfirmPassword(e.target.value);
  // };
  //    const signupSubmit = async (e) => {
  //        e.preventDefault();
  //        let userobj = {fullName, email, password, confirmPassword, confirmPassword: confirmPassword}
  //        console.log(userobj)
  //        if(password !== confirmPassword) {
  //         toast.error('Passwords do not match.')
  //         return;
  //     }
        
            
    
  //        try {
  //          const response = await axios.post('', userobj)
  //          toast.success('Sign up successful.')
  //          // eslint-disable-next-line no-restricted-globals
  //           ;
  //        } catch (error) {
  //          toast.error('Sign up unsuccessful.')
  //        }
     
    //  async function signup() {
    //   const fullName = document.getElementById('fullName').value;
    //   const email = document.getElementById('email').value;
    //   const password = document.getElementById('password').value;
    
    //   try {
    //     // Make a signup request to your server
    //     const signupResponse = await axios.post('https://backends-zgvg.onrender.com/api/signup/user', {
    //       fullName,
    //       email,
    //       password,
    //     });
    
    //     alert(signupResponse.data.message);
    
    //     if (signupResponse.status === 201) {
    //       // If signup is successful, prompt the user to enter the OTP
    //       const otp = prompt('Enter the OTP sent to your email:');
    //       navigate('/verifyotp');
    //       if (otp) {
    //         // Make an email verification request to your server
    //         const verificationResponse = await axios.post('https://backends-zgvg.onrender.com/api//verify-email', {
    //           email,
    //           otp,
    //         });
    
    //         alert(verificationResponse.data.message);
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error during signup:', error);
    //     alert('Signup failed. Please try again.');
    //   }
  //  return (
    //     <div className="signup">
    //       <h2>Sign Up</h2>
    //       <form onSubmit={signupSubmit}>
    //         <label>Full Name:</label>
    //         <input type="text" required onChange={e => setFullName(e.target.value)} />
    
    //         <label>Email:</label>
    //         <input type="email" required onChange={e => setEmail(e.target.value)} />
    
    //         <label>Password:</label>
    //         <input type="password" required onChange={(e) => setPassword(e.target.value)}  />
             
    //         <label>Confirm Password:</label>
    //         <input type="password" required onChange={(e) => setconfirmPassword(e.target.value)}/>
    
    //        <button type="submit">Sign Up</button>
    //         <div className="container">
    //        <label class="">
    //         <input type="checkbox" value="terms and policy" required/> By signing up you agree to our <a href="">Term of use <span>and</span> policy</a>
    //          </label> 
    //        </div>
    //       </form>
    //       <Toaster />
    //       <p>Already have an account? <Link to="/login">Log In</Link></p>
    //     </div>
    //  );
     



// const Usersignu= () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const signupSubmit = async (e) => {
//          e.preventDefault();
//          let userobj = {fullName, email, password, confirmPassword, confirmPassword}
//          console.log(userobj)
     
//          try {
//            const response = await axios.post('https://backends-zgvg.onrender.com/api/signup/user', userobj)
//           //  toast.success('Sign up successful.')
//            navigate('/Verifyotp'
//           )
//          } catch (error) {
//            toast.error('Sign up unsuccessful.')
//          }
//       }

  // const handleFullNameChange = (e) => {
  //   setFullName(e.target.value);
  // };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // const handleConfirmPasswordChange = (e) => {
  //   setConfirmPassword(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add your form submission logic here
  // };


  return (
  
    <div className="container bg-white">
      <div className="logo">
        {/* <img src={logo} alt="Logo" height="80" />  */}
      </div>
      <div className="row login-container">
        <div className="col-md-6">
          <main className="form-signin vvv w-100">
            <form onSubmit={signupSubmit}>
              <h5 className="one mb-3 fw-normal">Create an account</h5>
              <br />
              <h6 className="mb-3 fw-normal">Enter your details below</h6>
              <div className="form-floating">
              
                <input
                  type="text"
                  className="form-control Name"
                  id="floatingName"
                  // placeholder="Full Name"
                  // value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />  
                <label htmlFor="floatingName">Full Name</label>
              </div>
              <div className="vv form-floating">
                <input
                  type="email"
                  className="form-control border-top-3 name1"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={e => setEmail(e.target.value)}
                required/>
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control name2"
                  id="floatingPassword"
                  placeholder="Password"
                  // value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <label htmlFor="floatingPassword">Create Password</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control name3"
                  id="floatingPassword"
                  placeholder="Password"
                  // value={confirmPassword}
                   onChange={(e) => setconfirmPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">confirm Password</label>
              </div>
              <br />
              <button className="class btn w-100 py-2" type="submit">
                Sign Up
              </button>
              <br />
              <br />
              <div className="container text-center d-flex gap-2">
                <a href="" className="hello2 text-dark">
                  Already have an account?
                </a>{' '}
                <Link to="/login" className=" hello text-warning">
                  Login
                </Link>
              </div>
              <div className="container text-center mt-4">
              <input type="checkbox" required/> 
              By signing up you agree to our <a href="" className="hello3 text-warning">
                  terms of use{' '}
                </a> and{' '}
                <a href="" className="hello4 text-warning">
                  privacy policy
                </a>
                {/* <a href="" className="hello3 text-warning">
                  terms of use{' '}
                </a> */}
                {/* and{' '}
                <a href="" className="hello4 text-warning">
                  privacy policy
                </a> */}
              </div>
            </form>
          </main>
        </div>
        <div className="col-md-6">
          <img
            src="one.jpg"
            alt="Login Image"
            className="login-image d-none d-sm-block"
            height="500px"
          />
        </div>
      </div>
    </div>
  );
}

export default Usersignu;



     
    
    // export default Usersignu;

    // Your form JSX goes here
   

  // const [email, setEmail] = useState('')
  //   const [fullName, setFullName] = useState('')
  //   const [password, setPassword] = useState('')

  //   const signupSubmit = (e) => {
  //     e.preventDefault();
  //     let userobj={email, fullName, password}
  //     console.log(userobj)

  //     fetch('http://backends-zgvg.onrender.com/api/signup',{
  //       method: 'POST',
  //       headers:{'content-type': 'application/json'},
  //       body:JSON.stringify(userobj)
  //     }).then((res)=>{
  //       toast.success('Sign up sucessful.')
  //     }).catch((err)=>{
  //       toast.error('Sign up unsucessful.')
  //     });
      
    // try {
    //   const response = await axios.post('http://backends-zgvg.onrender.com/api/signup', {fullName, email, password})
    //     console.log('Signup sucessful:', response.data)}
    //     catch(error){
    //       console.error('signup error:', error.response.data);
    //     }
      
    
//     return(
//               <div className="container text-center vh-100 ">
//             <div className="container context-center bg-red mt-5">
//               <div className="container p-5">
//               <h2><b> SIGN-UP PAGE</b></h2>
//               </div>
//               <form onSubmit={signupSubmit}>
//                 <h1 class="h3 mb-5 font-weight-bold d-flex justify-content-start "  >Create Account</h1>
//                 <p class="d-flex justify-content-start">Enter Your details below</p>

//              <label for="Fullname" class="sr-only mb-4">Fullname</label>
//              <input 
//              type="text" id="fullname" value={fullName} class="form-control mb-3"  placeholder="Full name" onChange={(e) => setFullName(e.target.value)}  required autofocus/>

//              <label for="emailAddress" class="sr-only mb-4">Emial Address</label>
//              <input
//              type="emailaddress" id="email" value={email} class="form-control mb-3" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required autofocus/>

//              <label for="Phone number" class="sr-only mb-4">Phone Number</label>
//              <input 
//              type="tel" id="telephone" class="form-control mb-3" placeholder="Phone number" 
//              required autofocus />

//              <label for="password" class="sr-only " >Create Password</label>
//              <input 
//              type="password" id="password"  value={password}  placeholder="Create passowrd" class="form-control mb-3" onChange={(e) => setPassword(e.target.value)} />

//              <label for="confirmPassword" class="sr-only " >Re-enter Password</label>
//              <input 
//              type="password" id="confirmPassword" placeholder="Re-enter passowrd" class="form-control mb-3"/> 
//              <button type='submit' class="btn btn:focus btn-primary btn-lg btn-warning btn-block" onChange={(e) => setconfirmPassword(e.target.value)} >Sign Up</button>
//              {/* <label for="checkebox" class="sr-only ">
//               <input type="radio" name="User" value="user"   id='role' checked={role==="user"} onChange={(e) => setRole(e.target.value)}/> user
//               <input type="radio" name="vendor" value="vendor" id= 'role' checked={role==="vendor"} onChange={(e) => setRole(e.target.value)}/>vendor
//             </label> */}

//              <div className="container">
//             <label class="">
//               <input type="checkbox" value="terms and policy" required/> By signing up you agree to our <a href="">Term of use <span>and</span> policy</a>
//             </label> 
//             </div>
//               </form>
//                  {/* <Link to="/login"><button>already havve an account</button></Link><hr></hr>
//                  <Link to="/login" >login?</Link>
//                */}
//         </div>
//       </div>
        
//          );
//   }
// export default Usersign;