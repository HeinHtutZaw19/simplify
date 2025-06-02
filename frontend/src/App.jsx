import { Flex } from '@chakra-ui/react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { checkLogin } from './API/API'

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

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [requiresAuth, setRequiresAuth] = useState(false);

  useEffect(() => {
    const init = async () => {
      const currentPath = location.pathname;
      console.log('Current path:', currentPath);
      const authNeeded = !['/welcome', '/login', '/signup', '/survey'].includes(currentPath);
      setRequiresAuth(authNeeded);

      const user = await checkLogin();
      console.log('User:', user);
      setUser(user);

      if (currentPath === '/oauth') {
        if (user) {
          navigate('/');
          return;
        }
        window.location.reload();
      }
      else if (authNeeded && !user) {
        navigate('/welcome');
        return;
      } else if (!authNeeded && user) {
        navigate('/');
        return;
      }

      setLoaded(true);
    };

    init();
  }, [location.pathname]);

  return (
    <>
      {loaded ? (
        <Flex w="100%" h="100vh" overflow="hidden">
          {requiresAuth && user && <Sidebar user={user} />}
          <Flex flex="1" overflowY="auto">
            <Routes>
              {user && <Route path="/" element={<HomePage user={user} />} />}
              {user && <Route path="/skinlab" element={<SkinLabPage />} />}
              {user && <Route path="/chat" element={<ChatPage user={user} />} />}
              {user && <Route path="/leaderboard" element={<LeaderboardPage user={user} />} />}
              {/* {user && <Route path="/settings" element={<SettingsPage />} />} */}
              {/* {user && <Route path="/help" element={<HelpPage />} />} */}
              {user && <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />}
              {user && <Route path="/admin" element={<AdminPage />} />}
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/survey" element={<SurveyPage />} />
            </Routes>
          </Flex>
        </Flex>
      ) : (
        <div>Loading...</div> // or a spinner
      )}
    </>
  );
}

export default App
