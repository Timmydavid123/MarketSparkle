// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//  const [email, setEmail] = useState('');
//  const [password, setPassword] = useState('');
//  const [error, setError] = useState('');
//  const navigate = useNavigate()

//  const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//      const response =  await axios.post('https://backends-zgvg.onrender.com/api/login/user', email, password);
      
//       if (response.data.error) {
//         setError(response.data.error);
//         navigate('/Usersignu')
//       } else {
//         // If successful, redirect the user to the dashboard or another authenticated page
//       }
//     // } catch (err) {
//     //   setError('An error occurred while trying to log in. Please try again.');
//     // }

//       // If successful, redirect the user to the dashboard or another authenticated page
//     } catch (err) {
//       setError('Invalid email or password. Please try again.');
//     }
//  };
 
// //   return (
// //      <div className="login-container">
// //        <h2>Login</h2>
// //        {error && <div className="alert alert-danger">{error}</div>}
// //        <form onSubmit={handleSubmit}>
// //          <div className="form-group">
// //            <label htmlFor="email">Email</label>
// //            <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
// //          </div>
// //          <div className="form-group">
// //            <label htmlFor="password">Password</label>
// //            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
// //          </div>
// //          <button type="submit" className="btn btn-primary">Submit</button>
// //        </form>
// //        <p>
// //          Don't have an account? <Link to="/Usersignu">Sign Up</Link>
// //        </p>
// //        <p>
// //        <Link to="/Userforgottenp"> Forgotten password? </Link>
// //       </p>
// //      </div>
// //   );
// //  };
 
// //  export default Login;



// // const Login = () => {
//   return (
//     <div className="container bg-white">
//       <div className="logo d-flex align-items-center py-4" >
//         <img src={'./assets/three.jpg'} alt="Logo" height="80" />
//       </div>
//       <div className="row login-container">
//         <div className="col-md-6">
//           <main className="form-signin vvv w-100 ">
//             <form onSubmit={handleSubmit}>
//               <h5 className="one mb-3 fw-normal">Log In to access your account</h5>
//               <br />
//               <h6 className="mb-3 fw-normal">Enter your details below</h6>
//               <div className="vv form-floating">
//                 <input type="text" className="form-control dada border-top-3" id="floatingInput" placeholder=""  value={email} onChange={(e) => setEmail(e.target.value)}  />
//                 <label htmlFor="floatingInput">Email</label>
//               </div>
//               <div className="form-floating">
//                 <input type="password" className="form-control dadaa" id="floatingPassword" placeholder="Password"  value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <label htmlFor="floatingPassword">Enter Password</label>
//               </div>
//               <div className="form-check my-3 d-flex gap-5">
//                 <div>
//                   <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
//                   <label className="form-check-label" htmlFor="flexCheckDefault">
//                     Remember me
//                   </label>
//                 </div>
//                 <div className="">
//                 <Link className="text-end text-dark hello2" to="/Userforgottenp"> Forgotten password? </Link>
//                   {/* <a href="" className="text-end text-dark hello2">
//                     Forget Password?
//                   </a> */}
//                 </div>
//               </div>
//               <button className=" classs btn btn-warnig w-100 py-2" type="submit">
//                 Log In
//               </button>
//               <div className="container text-center">
//                 <a href="" className="text-dark hello">
//                   or sign-in with
//                 </a>{' '}
//               </div>
//               <div className="container text-center mt-4">
//                 <div className="social-icons">
//                   <a href="#" className="btn btn-outline-primary rounded-circle mr-2">
//                     <i className="fab fa-google"></i>
//                   </a>
//                   <a href="#" className="btn btn-outline-primary rounded-circle mr-2">
//                     <i className="fab fa-facebook-f"></i>
//                   </a>
//                   <a href="#" className="btn btn-outline-primary rounded-circle">
//                     <i className="fab fa-instagram"></i>
//                   </a>
//                 </div>
//               </div>
//             </form>
//           </main>
//         </div>
//         <div className="col-md-6">
//           <img src={'./assets/two.png'} alt="Login Image" className="login-image d-none d-sm-block" height="400px" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // Load the Google Sign-In API script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    
    script.onerror = (error) => {
      console.error('Error loading Google Sign-In API script:', error);
    };
    
    document.body.appendChild(script);
    

    script.onload = () => {
      // Initialize the Google Sign-In API
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '659683617107-0k1fkhku6ttc21q0kibbb91amf172e23.apps.googleusercontent.com', 
        });
      });
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const googleAuth = window.gapi.auth2.getAuthInstance();
      const googleUser = await googleAuth.signIn();

      // Obtain the Google ID token
      const idToken = googleUser.getAuthResponse().id_token;

      // Send the token to your server for verification
      const response = await axios.post('https://backend-cmrf.onrender.com/api/auth/google', {
        idToken,
      });

      console.log('Google Sign-In successful:', response.data);

      // Handle the response accordingly (e.g., navigate, set user state)
    } catch (error) {
      console.error('Google Sign-In error:', error);
      toast.error('Google Sign-In unsuccessful. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors([]);

    try {
      // Validate email and password
      if (!email || !password) {
        const errorMessage = 'Please enter both email and password.';
        // setErrors([errorMessage]);

        // Display error message using toast
        toast.error(errorMessage);
        return;
      }

      // Set loading to true while making the request
      setLoading(true);

      // Make your login request here using the email, password, and rememberMe state
      const response = await axios.post('https://backend-cmrf.onrender.com/api/login/vendor', {
        email,
        password,
        rememberMe,
      });

      // If successful, you can navigate or perform other actions
      console.log('Login successful:', response.data);

      // Reset form fields
      setEmail('');
      setPassword('');
      setRememberMe(false);

      // Display success message using toast
      toast.success('Login successful!');
    } catch (error) {
      // Update the errors state with the error messages
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);

        // Display each error using toast.error
        error.response.data.errors.forEach((errorMessage) => {
          toast.error(errorMessage);
        });
      } else {                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        toast.error('An error occurred during login. Please try again.');
      }

      console.error('Login error:', error);
    } finally {
      // Set loading back to false when the request is complete
      setLoading(false);
    }
  };

  return (
    <div>                                                                                                                                                                                                                                                                             

      <img src="./assets/two.png" alt="" id="image" />

      <div id="mainbox4">
        {/* form_section */}
        <section id="first_sec1">
          <h3>Log in to access your account</h3>
          <p>Enter your details below</p>
          <div className="login-form-container">
            <input
              className="login-input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-form-container">
            <input
              className="login-input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

              <form action="">
                <div className="remember-forgot-container">
                  <label htmlFor="remember">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span style={{ color: 'black' }}>Remember me</span>
                  </label>
                  <Link  to="/forgot-password" onClick={handleForgotPassword}>
           <h5 style={{ color: 'black' }}>Forgotten password?</h5> 
          </Link>
                </div>
              </form>
          <button id="submit" onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          {/* Display errors */}
          {errors.length > 0 && (
            <div className="error-container">
              <p className="error-message">Errors:</p>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <hr />
          <h4 className="word">OR</h4>
          <hr />
          <div className="icons">
          <div className="google-signin-button" onClick={() => handleGoogleSignIn()}>
            <img
              // src="/images/google.png" // Update the path to your Google logo image
              alt="Google"
              className="google-logo"
            />
            <span>Sign in with Google</span>
          </div>
          <h4 id="account1">Don't have an account?<a href="/Vendorsignup"> Sign Up</a></h4>
        </div>
          
        </section>
                  
        {/* image_section */}
        <section className="sec_sec"></section>
        
      </div>
    </div>
  );
};

export default Login;



































//  import React, { useState } from 'react';

// const Login = () => {
//  const [email, setEmail] = useState('');
//  const [password, setPassword] = useState('');

//  const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle the login logic here
//  };

//  return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//  );
// };

// export default Login;

















// // import React from 'react'
// // import { Link } from "react-router-dom";
// // import axios from 'axios';
// // import { toast } from 'react-toastify'

// // class Login extends React.Component {

// // const Userlogin = () =>{
// //     return(
// //           <div className="container text-center vh-100 ">
// //             <div className="container context-center bg-red mt-5">
// //               <div class="container p-5">
// //               <h2><b> Login PAGE</b></h2>
// //               </div>
// //               <form>
// //                 <p class="d-flex justify-content-start">Enter Your details below</p>

// //              <label for="emailAddress" class="sr-only mb-4">Emial Address</label>
// //              <input
// //              type="emailaddress" id="email" class="form-control mb-3" placeholder="Email Address" required autofocus/>


// //              <label for="password" class="sr-only " >Password</label>
// //              <input 
// //              type="password" id="password" placeholder=" passowrd" class="form-control mb-3" required autoFocus />

// //              <button class="btn btn:focus btn-primary btn-lg btn-warning btn-block">Login</button>

// //               </form>
              
// //         </div>
// //       </div>
        
// //           );
// // }
// // }
// // export default Userlogin;