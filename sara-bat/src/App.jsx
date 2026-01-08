import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import  Login from './components/Login'
// import SignUp from './components/SignUp'
import Home from './components/Home'
import './App.css'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<SignUp />} /> */}
    </Routes>
  );
}

export default App
