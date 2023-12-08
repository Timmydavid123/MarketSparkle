
import React from 'react'
import  '../node_modules/bootstrap/dist/css/bootstrap.css.map'
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import Usersign from './Usersign';
import Userlogin from './Userlogin';
import home from './Home';
import { toast } from 'react-toastify'
import { ToastContainer} from 'react-toastify'
const App = () => {
  return (
    <div>

<ToastContainer></ToastContainer>

    <BrowserRouter>

      <Routes>
      <Route path='/home' element={<home/>}></Route>
      <Route path='/login' element={<Userlogin/>}></Route>
      <Route path='/sign' element={<Usersign/>}></Route>
       
       
      </Routes>

    </BrowserRouter>

    </div>
  )
}

export default App