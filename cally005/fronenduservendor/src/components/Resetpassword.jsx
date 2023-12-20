import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // React Router is used for extracting the token from the URL
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams(); // Extract the reset token from the URL
//   const navigate = useNavigate();
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    setnewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your backend to handle the password reset logic
      const response = await axios.post('https://backends-zgvg.onrender.com/api/reset-password', {
        token,
        newPassword,
        confirmPassword,
      });

    //   Display the response message to the user
      setMessage(response.data.message);

      // If the password reset is successful, navigate to the login page
      if (response.data.success) {
        window.location.href = 'http://localhost:3000/login'
      }
    } catch (error) {
      // Handle error (display error message or log it)
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="password" value={newPassword} onChange={handlePasswordChange} required />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
        </label>
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
