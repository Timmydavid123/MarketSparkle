import React from 'react'
import  '../node_modules/bootstrap/dist/css/bootstrap.css.map'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Usersignu from './components/Usersignu';
import VerifyOTP from './components/Verifyotp';
import VerificationSuccessful from './components/VerificationSuccessful';
import Vendorsignup from './components/Vendorsignup';
import Login from './components/Login';
import Userforgotpassword from './components/Userforgottenp';
import ResetPassword from './components/Resetpassword';
function App() {
 return (
      
      // <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Usersignu/>} />
            <Route path="/Usersignu" element={<Usersignu/>} />
            <Route path="/verifyotp" element={<VerifyOTP/>} />
            <Route path="/verificationsuccessful" element={<VerificationSuccessful/>} />
            <Route path="/Vendorsignup" element={<Vendorsignup/>}/>
            <Route path="/Login" element={<Login/>} />
            <Route path="/Userforgottenp" element={<Userforgotpassword/>} />
            <Route path="/ResetPassword" element={<ResetPassword/>} />

          </Routes> 
    // {/* </BrowserRouter>  */}   
      

 

 )
}

export default App;


// import React from 'react'
// import  '../node_modules/bootstrap/dist/css/bootstrap.css.map'
// import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Usersign from './Usersign';
// import Userlogin from './Userlogin';
// import home from './Home';
// import { toast } from 'react-toastify'
// import { ToastContainer} from 'react-toastify'

// const App = () => {
//   return (
//     <div>

// <ToastContainer></ToastContainer>

//     <Router>

//       <Switch>
//       <Route path='/' element={<home/>}></Route>
//       <Route path='/login' element={<Userlogin/>}></Route>
//       <Route path='/sign' element={<Usersign/>}></Route>
       
       
//       </Switch>

//     </Router>

//     </div>
//   )
// }


// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import VerifyOTP from './components/VerifyOTP';
// import VerificationSuccessful from './components/VerificationSuccessful';
// import Login from './components/Login';

// function App() {
//     return (
//         <Router>
//             <Switch>
//                 <Route path="/verify-otp" component={VerifyOTP} />
//                 <Route path="/verification-successful" component={VerificationSuccessful} />
//                 <Route path="/login" component={Login} />
//             </Switch>
//         </Router>
//     );
// }

// export default App;

// export default App