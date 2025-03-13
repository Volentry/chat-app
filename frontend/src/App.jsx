import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './componenets/Navbar'
import SettingsPage from './componenets/SettingsPage'
import Loginpage from './componenets/Loginpage'
import SignUpPage from './componenets/SignUpPage'
import HomePage from './componenets/HomePage'
import ProfilePage from './componenets/ProfilePage'
import { axiosInstance } from './lib/axios'

const App = () => {
  
  return (
    <div>
     <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="/login" element={<Loginpage/>}></Route>
        <Route path="/settings" element={<SettingsPage/>}></Route>
        <Route path="/profile" element={<ProfilePage/>}></Route>
      </Routes>
    </div>
   
  )
}

export default App
