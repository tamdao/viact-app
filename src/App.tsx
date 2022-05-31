import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { GateLayout } from './components'
import { Signin, Signup } from './pages'

function App() {
  return (
    <Routes>
      <Route element={<GateLayout />}>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/home" element={<div>Home</div>} />
    </Routes>
  )
}

export default App
