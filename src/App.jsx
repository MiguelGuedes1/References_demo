import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './paginas/Home'
import Login from './paginas/Login'
import Registo from './paginas/Registo'
import Login_Admin from './paginas/Login_Admin'
import Consultores from './componentes/Consultores'
import DetalhesConsultor from './paginas/DetalhesConsultor'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/Login' element={<Login/>}  />
      <Route path='/Registo' element={<Registo/>}  />
      <Route path='/Login_Admin' element={<Login_Admin/>}  />
      <Route path="/Consultores" element={<Consultores />} /> {/* Página de consultores */}
      <Route path="/DetalhesConsultor/:id" element={<DetalhesConsultor />} /> {/* Página de detalhes do consultor */}
    </Routes>
  )
}

export default App
