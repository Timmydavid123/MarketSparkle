import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import {useLocation } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import './Verifyotp.css';


function Verifyotp() {
  const [otp, setOtp] = useState('');
  const navigate =  useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://backends-zgvg.onrender.com/api/verify-email-user', { otp
      });
      console.log(' OTP verification successful:', response.data)
        toast.success('Email verified successfully.');
       
        // You can redirect the user to a success page or perform any other action
        navigate('/verificationsuccessful')
    
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to verify email.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post('https://backends-zgvg.onrender.com/api/resend-otp', {
        
      });

      if (response.data.message === 'New OTP sent successfully.') {
        toast.success('OTP resent successfully.');
      } else {
        toast.error('Failed to resend OTP.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend OTP.');
    }
  };

  return (
//     <div>
//       <h2>Verify OTP</h2>
//       <p>An OTP has been sent to your email:</p>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="otp">Enter OTP:</label>
//         <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
//         <button type="submit">Verify</button>
//       </form>
//       <button onClick={handleResendOtp}>Resend OTP</button>
//     </div>
//   );
// }

// export default Verifyotp;



// src/EmailVerificationForm.js
// import React from 'react';

    <main className="form-signin m-auto bg-white">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/assets/seven.jpg'} alt="Logo" height="200" />
      </div>
      <h1 className="h3 mb-3 fw-normal text-center">Verify Email</h1>
      <h1 className="h6 fw-normal text-center">
        Please enter the 6 digit code sent to your email
      </h1>
      <br />
      <form onSubmit={handleSubmit}>
      <div className="form-floating w-50 h-20 text-center fufuu m-auto">
        <input
          type="OTP"
          className="form-control"
          id="floatingInput"
          placeholder="OTP"
          value={otp} onChange={(e) => setOtp(e.target.value)}
        />
        <label htmlFor="floatingInput">Enter OTP</label>
      </div>
      <br />
      <div className="text-center">
      <button className="text-warning hello" onClick={handleResendOtp}>Resend OTP</button>
        {/* <a href="" className="text-warning hello">
          resend OTP
        </a> */}
        <br />
        <br />
        <button className="w-50 py-2 helloo" type="submit">
          Submit
        </button>
      </div>
      </form>
    </main>
  );
};

export default Verifyotp;





































// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useNavigate, useLocation } from 'react-router-dom';


// const userEmail = location.state ? location.state.email : '';
// const [otp, setOtp] = useState('');
// const navigate =  useNavigate()

//   const Verifyotp = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', 
//        userEmail, otp
//       );

//       if ((response.status === 200)) {
//         // toast.success('Email verified successfully.');
//         navigate('/verificationsuccessful')
//         // You can redirect the user to a success page or perform any other action
//       } else {
//         throw new Error('Error verifying email');
//       }
//     } catch (error) {
//         if (error.response && error.response.status === 404){
//       toast.error('Email adddress not found in the databasse');
//     }else{
//         toast.error('Error verifying email. Please try again.');
//       }
      
//     }

// // function Verifyotp() {
// //   const location = useLocation();
// //   const userEmail = location.state ? location.state.email : '';
// //   const [otp, setOtp] = useState('');
// //     const navigate =  useNavigate()

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     try {
// //       const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', 
// //       otp, userEmail
     
// //       );

// //       if ((response.status === 200)) {
// //         // toast.success('Email verified successfully.');
// //         navigate('/verificationsuccessful')
// //         // You can redirect the user to a success page or perform any other action
// //       } else {
// //         throw new Error('Error verifying email');
// //       }
// //     } catch (error) {
// //         if (error.response && error.response.status === 404){
// //       toast.error('Email adddress not found in the databasse');
// //     }else{
// //         toast.error('Error verifying email. Please try again.');
// //       }
// //     }
// //     }
  

// //   const handleResendOtp = async () => {
// //     try {
// //       const response = await axios.fetch('https://backends-zgvg.onrender.com/api/resend-otp', {
// //         email: userEmail,
// //       });

// //       if (response.data.message === 'New OTP sent successfully.') {
// //         toast.success('OTP resent successfully.');
// //       } else {
// //         toast.error('Failed to resend OTP.');
// //       }
// //     } catch (error) {
// //       toast.error('Failed to resend OTP.');
// //     }
// //   };

//   return (
//     <div>
//       <h2>Verify OTP</h2>
//       <p>An OTP has been sent to your email: {userEmail}</p>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="otp">Enter OTP:</label>
//         <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
//         <button type="submit">Verify</button>
//       </form>
//       <button onClick={handleResendOtp}>Resend OTP</button>
//     </div>
//   );
//   }

// export default Verifyotp;













// import React, { useState } from 'react';
// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { useLocation } from 'react-router-dom';


// function Verifyotp() {
//  const location = useLocation();

//  const userEmail = location.state ? location.state.email : '';

//  const [otp, setOtp] = useState('');

//  const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Your API call to verify the OTP here...
//  try {
//             const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', otp, {email: userEmail});
//             if (response.data.message === 'OTP resent') {
//                 toast.success('OTP resent successful.');
//             } else {
//                 toast.error('OTP resent unsuccessful.');
//             }
//         } catch (error) {
//             toast.error('OTP resent unsuccessful.');
//         }
//     };

//  const handleResendOtp = async () => {
//     try {
//         const response = await axios.post('https://backends-zgvg.onrender.com/api/resend-otp', {email: userEmail});
//         if (response.data.message === 'OTP resent') {
//             toast.success('OTP resent successfully.');
//         } else {
//             toast.error('OTP resent unsuccessful.');
//         }
//     } catch (error) {
//         toast.error('OTP resent unsuccessful.');
//     }
// };

//  return (
//     <div>
//       <h2>Verify OTP</h2>
//       <p>An OTP has been sent to your email: {userEmail}</p>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="otp">Enter OTP:</label>
//         <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
//         <button type="submit">Verify</button>
//       </form>
//       <button onClick={handleResendOtp}>Resend OTP</button>
//     </div>
//  );
// }

// export default Verifyotp;

















// const VerifyOTP = () => {
//     const [otp, setOtp] = useState('');
//     const history = useNavigate();

//     const verifyOTPSubmit = async (e) => {
//         e.preventDefault();
//         let userobj = {otp};

//         try {
//             const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', userobj);
//             if (response.data.message === 'OTP verified') {
//                 toast.success('OTP verification successful.');
//                 history('/verification-successful');
//             } else {
//                 toast.error('OTP verification unsuccessful.');
//             }
//         } catch (error) {
//             toast.error('OTP verification unsuccessful.');
//         }
//     };

//     const resendOTP = async () => {
//         let userobj = {};

//         try {
//             const response = await axios.post('https://backends-zgvg.onrender.com/api/resend-otp', userobj);
//             if (response.data.message === 'OTP resent') {
//                 toast.success('OTP resent successful.');
//             } else {
//                 toast.error('OTP resent unsuccessful.');
//             }
//         } catch (error) {
//             toast.error('OTP resent unsuccessful.');
//         }
//     };

//     return (
//         <div className="verifyOTP">
//             <h2>Verify OTP</h2>
//             <form onSubmit={verifyOTPSubmit}>
//                 <label>Enter OTP:</label>
//                 <input type="text" required onChange={e => setOtp(e.target.value)} />

//                 <button type="submit">Verify OTP</button>
//                 <button onClick={resendOTP}>Resend OTP</button>
//             </form>
//         </div>
//     );
// };

// export default VerifyOTP;




















// How can I ensure that the email address is valid before sending the OTP




// How can I handle the case where the user enters an invalid email address or the OTP is incorrect















// import React, { useState } from 'react';
// import { Form, Button, Card, Alert } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const VerifyOTP = () => {
//  const [otp, setOtp] = useState('');
//  const [email, setEmail] = useState('');
//  const [show, setShow] = useState(false);
//  const history = useNavigate();

//  const verifyOTPSubmit = async (e) => {
//     e.preventDefault();
//     let userobj = { otp, email };

//     try {
//       const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', userobj);
//       if (response.data.message === 'OTP verified') {
//         toast.success('OTP verification successful.');
//         history('/verification-successful');
//       } else {
//         toast.error('OTP verification unsuccessful.');
//       }
//     } catch (error) {
//       toast.error('OTP verification unsuccessful.');
//     }
//  };

//  return (
//     <div>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Verify OTP</h2>
//           <Form onSubmit={verifyOTPSubmit}>
//             <Form.Group id="otp">
//               <Form.Label>Enter OTP</Form.Label>
//               <Form.Control type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
//             </Form.Group>
//             <Form.Group id="email">
//               <Form.Label>Enter Email</Form.Label>
//               <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//             </Form.Group>
//             <Button className="w-100" type="submit">
//               Verify OTP
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//       <ToastContainer />
//     </div>
//  );
// };

// export default VerifyOTP;





































































// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { Toaster } from 'react-hot-toast';
// // import { toast } from 'react-hot-toast';


// // const VerifyOTP = () => {
// //     const [email, setEmail] = useState('')
// //     const [otp, setOtp] = useState('')
   
// //     const history = useNavigate();

// //     const verifyOTPSubmit = async (e) => {
// //         e.preventDefault();
// //         let userobj = {otp, email}
// //         console.log(userobj)

// //         try {
// //             const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', userobj)
// //             toast.success('OTP verification successful.')
// //             history('/verification-successful');
// //         } catch (error) {
// //             toast.error('OTP verification unsuccessful.')
// //         }
// //     }

// //     const resendOTP = async () => {
// //         let userobj = {email}
// //         console.log(userobj)

// //         try {
// //             const response = await axios.post('https://backends-zgvg.onrender.com/api/resend-otp', userobj)
// //             toast.success('OTP resent successful.')
// //         } catch (error) {
// //             toast.error('OTP resent unsuccessful.')
// //         }
// //     }

// //     return (
// //         <div className="verifyOTP">
// //             <h2>Verify OTP</h2>
// //             <form onSubmit={verifyOTPSubmit}>
// //                 <label>Enter OTP:</label>
// //                 <input type="text" required onChange={e => setOtp(e.target.value)} />

// //                 <button  type="submit">Verify OTP</button>
// //                 <button onClick={resendOTP}>Resend OTP</button>
// //             </form>

// //             {/* <p>Didn't receive the OTP? <Link to="/resendOTP">Resend OTP</Link></p> */}
// //         </div>
// //     )
// // }

// // export default VerifyOTP;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useHistory } from 'react-router-dom';
// // import toast, { Toaster } from 'react-hot-toast';

// // const VerifyOTP = () => {
// //     const [otp, setOtp] = useState('')
// //     const [email, setEmail] = useState('')
// //     const history = useHistory();

// //     const verifyOTPSubmit = async (e) => {
// //         e.preventDefault();
// //         let userobj = {otp, email}
// //         console.log(userobj)

// //         try {
// //             const response = await axios.post('https://backends-zgvg.onrender.com/api/verify/otp', userobj)
// //             toast.success('OTP verification successful.')
// //             history.push('/verification-successful');
// //         } catch (error) {
// //             toast.error('OTP verification unsuccessful.')
// //         }
// //     }

// //     const resendOTP = async () => {
// //         let userobj = {email}
// //         console.log(userobj)

// //         try {
// //             const response = await axios.post('https://backends-zgvg.onrender.com/api/resend/otp', userobj)
// //             toast.success('OTP resent successful.')
// //         } catch (error) {
// //             toast.error('OTP resent unsuccessful.')
// //         }
// //     }

// //     useEffect(() => {
// //         if (otp.length === 4) {
// //             verifyOTPSubmit();
// //         }
// //     }, [otp]);

// //     return (
// //         <div className="verifyOTP">
// //             <h2>Verify OTP</h2>
// //             <form onSubmit={verifyOTPSubmit}>
// //                 <label>Enter OTP:</label>
// //                 <input type="text" required onChange={e => setOtp(e.target.value)} />

// //                 <button type="submit">Verify OTP</button>
// //                 <button onClick={resendOTP}>Resend OTP</button>
// //             </form>

// //             {/* <p>Didn't receive the OTP? <Link to="/resendOTP">Resend OTP</Link></p> */}
// //         </div>
// //     )
// // }

// // export default VerifyOTP;