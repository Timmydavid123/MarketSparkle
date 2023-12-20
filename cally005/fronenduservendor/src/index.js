import React from 'react';
import ReactDOM from 'react-dom';
import  '../node_modules/bootstrap/dist/css/bootstrap.css.map'
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Usersignu from './components/Usersignu';
import VerifyOTP from './components/Verifyotp';
import VerificationSuccessful from './components/VerificationSuccessful';
import Vendorsignup from './components/Vendorsignup';
import Userforgotpassword from './components/Userforgottenp';
import Login from './components/Login';
import ResetPassword from './components/Resetpassword';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//   <App/>
//     <Usersignup/>
//   </React.StrictMode>
// );


ReactDOM.render(
 <BrowserRouter>
 {/* <Usersignu/> */}
 {/* <Vendorsignup/> */}
    <App />
  </BrowserRouter>,
 document.getElementById('root')
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//  <React.StrictMode>
//     <App />
//  </React.StrictMode>,
//  document.getElementById('root')
// );

// reportWebVitals();