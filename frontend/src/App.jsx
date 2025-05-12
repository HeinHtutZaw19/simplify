import { Flex } from '@chakra-ui/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

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
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'

import { checkLogin } from './API/API'

function App() {
  const location = useLocation()
  const hideSidebar = location.pathname === '/welcome' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/survey'
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchLoginData = async () => {
      const response = await checkLogin();
      if (response) {
        setUser(response);
      }
    }
    fetchLoginData();
  }, []);

  useEffect(() => {
    if (user) {
      setLoaded(true);
    }
  }, [user])

  return (
    <> {loaded &&
      <Flex w="100%" h="100vh" overflow="hidden">
        {!hideSidebar && <Sidebar user={user} />}
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
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Flex>
      </Flex>}
    </>
  )
}

export default App
