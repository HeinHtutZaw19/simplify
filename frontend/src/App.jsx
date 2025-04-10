import { Flex } from '@chakra-ui/react'
import { Route, Routes, useLocation } from 'react-router-dom'

//Pages
import HomePage from './pages/HomePage'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SkinLabPage from './pages/SkinLabPage'
import ChatPage from './pages/ChatPage'
import LeaderboardPage from './pages/LeaderboardPage'
import SettingsPage from './pages/SettingsPage'
import HelpPage from './pages/HelpPage'
import SurveyPage from './pages/SurveyPage'

//Components
import Sidebar from './components/Sidebar'

function App() {
  const location = useLocation()
  const hideSidebar = location.pathname === '/welcome' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/survey'

  return (
    <Flex w="100%" h="100vh" overflow="hidden">
      {!hideSidebar && <Sidebar />}
      <Flex flex="1" overflowY="auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/skinlab" element={<SkinLabPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/survey" element={<SurveyPage />} />
        </Routes>
      </Flex>
    </Flex>
  )
}

export default App
