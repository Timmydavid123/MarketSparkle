import React from 'react';
import ReactDOM from 'react-dom/client';
import  '../node_modules/bootstrap/dist/css/bootstrap.css.map'
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import Usersign from './Usersign';
import  Userlogin  from './Userlogin';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Usersign/>
  </React.StrictMode>
);