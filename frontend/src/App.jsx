import {Flex} from '@chakra-ui/react'
import {Route, Routes} from 'react-router-dom'

//Pages
import HomePage from './pages/HomePage'
import Login from './pages/LoginPage'
import Signup from './pages/SignupPage'
import SkinLabPage from './pages/SkinLAbPage'
import ChatPage from './pages/ChatPage'
import LeaderboardPage from './pages/LeaderboardPage'
import SettingsPage from './pages/SettingsPage'
import HelpPage from './pages/HelpPage'

//Components
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Flex w="100%" h="100vh" overflow="hidden">
      <Sidebar />
      <Flex flex="1" overflowY="auto">
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/skinlab" element={<SkinLabPage/>} />
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="/leaderboard" element={<LeaderboardPage/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/help" element={<HelpPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      </Flex>
    </Flex>
  )
}

export default App
