import {useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify'

const Usersign = () =>{

  const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')

    const signupSubmit = (e) => {
      e.preventDefault();
      let userobj={email, fullName, password}
      console.log(userobj)

      fetch('http://localhost:3000/api/signup',{
        method: 'POST',
        headers:{'content-type': 'application/json'},
        body:JSON.stringify(userobj)
      }).then((res)=>{
        toast.success('Sign up sucessful.')
      }).catch((err)=>{
        toast.error('Sign up unsucessful.')
      });
      
    // try {
    //   const response = await axios.post('http://backends-zgvg.onrender.com/api/signup', {fullName, email, password})
    //     console.log('Signup sucessful:', response.data)}
    //     catch(error){
    //       console.error('signup error:', error.response.data);
    //     }
      
    };
    return(
              <div className="container text-center vh-100 ">
            <div className="container context-center bg-red mt-5">
              <div className="container p-5">
              <h2><b> SIGN-UP PAGE</b></h2>
              </div>
              <form onSubmit={signupSubmit}>
                <h1 class="h3 mb-5 font-weight-bold d-flex justify-content-start "  >Create Account</h1>
                <p class="d-flex justify-content-start">Enter Your details below</p>

             <label for="Fullname" class="sr-only mb-4">Fullname</label>
             <input 
             type="text" id="fullname" value={fullName} class="form-control mb-3"  placeholder="Full name" onChange={(e) => setFullName(e.target.value)}  required autofocus/>

             <label for="emailAddress" class="sr-only mb-4">Emial Address</label>
             <input
             type="emailaddress" id="email" value={email} class="form-control mb-3" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required autofocus/>

             <label for="Phone number" class="sr-only mb-4">Phone Number</label>
             <input 
             type="tel" id="telephone" class="form-control mb-3" placeholder="Phone number" 
             required autofocus />

             <label for="password" class="sr-only " >Create Password</label>
             <input 
             type="password" id="password"  value={password}  placeholder="Create passowrd" class="form-control mb-3" onChange={(e) => setPassword(e.target.value)} />

             {/* <label for="password" class="sr-only " >Re-enter Password</label>
             <input 
             type="password" id="Re-enter password" placeholder="Re-enter passowrd" class="form-control mb-3"/> */}
             <button type='submit' class="btn btn:focus btn-primary btn-lg btn-warning btn-block" >Sign Up</button>
             
             <div className="container">
            <label class="">
              <input type="checkbox" value="terms and policy" required/> By signing up you agree to our <a href="">Term of use <span>and</span> policy</a>
            </label> 
            </div>
              </form>
                 {/* <Link to="/login"><button>already havve an account</button></Link><hr></hr>
                 <Link to="/login" >login?</Link>
               */}
        </div>
      </div>
        
         );
}

export default Usersign;