import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './paginas/Home'
import Login from './paginas/Login'
import Registo from './paginas/Registo'
import Login_Admin from './paginas/Login_Admin'
import ReferencesSent from './paginas/ReferencesSent'
import Consultores from './componentes/Consultores'
import DetalhesConsultor from './paginas/DetalhesConsultor'
import { AuthProvider } from './contexts/AuthContext'  


function App() {
  return (
    
    <AuthProvider>
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registo" element={<Registo />} />
          <Route path="/Login_Admin" element={<Login_Admin />} />
          <Route path="/Consultores" element={<Consultores />} />
          <Route path="/DetalhesConsultor/:id" element={<DetalhesConsultor />} />
          <Route path="/ReferencesSent" element={<ReferencesSent />} />
        </Routes>
   
    </AuthProvider>
  )
}

export default App
