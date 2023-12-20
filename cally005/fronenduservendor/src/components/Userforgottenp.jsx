import React, { useState } from 'react';
import axios from 'axios';

const Userforgotpassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your backend to handle the forgotten password logic
      const response = await axios.post('https://backends-zgvg.onrender.com/api/forgot-password', { email });

      // Display the response message to the user
      setMessage(response.data.message);
    } catch (error) {
      // Handle error (display error message or log it)
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Userforgotpassword;
