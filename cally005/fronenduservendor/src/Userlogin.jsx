import React from 'react'
import { Link } from 'react-router-dom';
const Userlogin = () =>{
    return(
          <div className="container text-center vh-100 ">
            <div className="container context-center bg-red mt-5">
              <div class="container p-5">
              <h2><b> Login PAGE</b></h2>
              </div>
              <form>
                <p class="d-flex justify-content-start">Enter Your details below</p>

             <label for="emailAddress" class="sr-only mb-4">Emial Address</label>
             <input
             type="emailaddress" id="email" class="form-control mb-3" placeholder="Email Address" required autofocus/>


             <label for="password" class="sr-only " >Password</label>
             <input 
             type="password" id="password" placeholder=" passowrd" class="form-control mb-3" required autoFocus />

             <button class="btn btn:focus btn-primary btn-lg btn-warning btn-block">Login</button>

              </form>
              
        </div>
      </div>
        
          );
}

export default Userlogin;