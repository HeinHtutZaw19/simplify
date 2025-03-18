import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from '@chakra-ui/react'
import {Route, Routes} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Button>
      Click Me
    </Button>
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
    </>
  )
}

export default App
