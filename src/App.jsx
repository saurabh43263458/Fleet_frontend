import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin"
import UserSignUp from "./pages/UserSignUp"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignUp from './pages/CaptainSignUP'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectedWrappers from './pages/CaptainProtectedWrappers'
import CaptainLogout from './pages/CaptainLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainRiding from './pages/CaptainRiding'
import CaptainDetails from './Components/CaptainDetails'
import Riding from './pages/Riding'

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignUp />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/start-home' element={
          <UserProtectedWrapper>
            <Start />
          </UserProtectedWrapper>
        } />
        <Route path='/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/captain-home' element={
          <CaptainProtectedWrappers>
            <CaptainHome />
            <CaptainDetails />
          </CaptainProtectedWrappers>
        } />
        <Route path='/captain-logout' element={
          <CaptainProtectedWrappers>
            <CaptainLogout />
          </CaptainProtectedWrappers>
        } />
      </Routes>
    </div>
  )
}

export default App
