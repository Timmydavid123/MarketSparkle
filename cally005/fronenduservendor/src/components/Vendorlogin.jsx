import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Vendorlogin = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate()

 const handleSubmit = (e) => {
   e.preventDefault();
   // You can replace this with your own logic to send data to the backend
   try {
    await axios.post('https://backends-zgvg.onrender.com/api/signup/vendor', {
      email,
      password,
    });
    console.log(response.data);
    navigate('/Vendorsignup')
    // Do something with the response data, e.g., update the state
  } catch (error) {
    console.log(error);
   console.log('Email:', email);
   console.log('Password:', password);
   // If the authentication is successful, navigate to the home page
  }
 };

 return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <div>
        <Link to="/forgetpassword">Forgotten Password?</Link>
      </div>

      <div>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </div>
    </div>
 );
};

export default Vendorlogin;
































// import React from 'react';
// import { Link } from 'react-router-dom';

// const Vendorlogin = () => {
//  return (
//     <div className="container">
//       <label htmlFor="email">Email:</label>
//       <input type="text" id="email" name="email" required />

//       <label htmlFor="password">Password:</label>
//       <input type="password" id="password" name="password" required />

//       <button type="submit">Login</button>

//       <div>
//         <Link to="/forgetpassword">Forgotten Password?</Link>
//       </div>

//       <div>
//         <Link to="/signup">Don't have an account? Sign Up</Link>
//       </div>
//     </div>
//  );
// };

// export default Vendorlogin;