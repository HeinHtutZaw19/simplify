import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Button, Flex} from '@chakra-ui/react'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  return (
    <Flex w="100%">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/skinlab" element={<h1>SkinLab</h1>} />
        <Route path="/chat" element={<h1>Chat</h1>} />
        <Route path="/leaderboard" element={<h1>Leaderboard</h1>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
        <Route path="/help" element={<h1>Help</h1>} />
      </Routes>
    </Flex>
  )
}

export default App
