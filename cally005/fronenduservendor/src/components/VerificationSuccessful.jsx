import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationSuccessful = () => {
    const history = useNavigate();

    return (
        <main className="form-signin m-auto bg-white">
      <div className="logo">
        <img src={'./assets/four.jpg'} alt="Logo" height="200" />
      </div>
      <h1 className="h6 fw-normal text-center text-secondary">Verification Successful</h1>
      <br /><br />
      <h6 className="text-center">Congratulations, you have been successfully <br />verified. You're all set to explore MarketSparkle <br /> and have a happy shopping.</h6>
      <br />
      <div className="text-center">
        <button className="w-100 py-2 helloo" onClick={() => history('/Login')} type="submit"><a href="/" className="text-decoration-none text-white">Continue</a></button>
      </div>
    </main>
        // <div>
        //     <h2>Verification Successful</h2>
        //     <p>You have successfully verified your email address.</p>
        //     <button onClick={() => history('/Login')}>Continue to Login</button>
        // </div>
    );
};



export default VerificationSuccessful;


// src/VerificationSuccess.js
// import React from 'react';

// const VerificationSuccess = () => {
//   return (
//     <main className="form-signin m-auto bg-white">
//       <div className="logo">
//         <img src={process.env.PUBLIC_URL + '/four.jpg'} alt="Logo" height="200" />
//       </div>
//       <h1 className="h6 fw-normal text-center text-secondary">Verification Successful</h1>
//       <br /><br />
//       <h6 className="text-center">Congratulations, you have been successfully <br />verified. You're all set to explore MarketSparkle <br /> and have a happy shopping.</h6>
//       <br />
//       <div className="text-center">
//         <button className="w-100 py-2 helloo" type="submit"><a href="/" className="text-decoration-none text-white">Continue</a></button>
//       </div>
//     </main>
//   );
// };

// export default VerificationSuccess;
