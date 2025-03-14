import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './componenets/Navbar.jsx'
import SettingsPage from './componenets/SettingsPage'
import Loginpage from './componenets/Loginpage'
import SignUpPage from './componenets/SignUpPage'
import HomePage from './componenets/HomePage'
import ProfilePage from './componenets/ProfilePage'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore'
import { LoaderCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
 const {theme} = useThemeStore()
  if(isCheckingAuth && !authUser)return(
    


  <div className='flex items-center justify-center h-screen'>
    <LoaderCircle  className='size-10 animate-spin'/>
    </div>

  )
  return (
    <div data-theme = {theme} >
     <Navbar/>
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>}></Route>
        <Route path="/signup" element={ !authUser?<SignUpPage/>:<Navigate to="/" />}></Route>
        <Route path="/login" element={!authUser?<Loginpage/> :<Navigate to="/" />}></Route>
        <Route path="/settings" element={<SettingsPage/>}></Route>
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}></Route>
      </Routes>
      <Toaster/>
    </div>
   
  )
}

export default App
