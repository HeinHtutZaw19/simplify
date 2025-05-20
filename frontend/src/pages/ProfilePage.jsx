import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Avatar, Heading, Text, VStack, Flex, Image } from '@chakra-ui/react';
import { FaFire } from 'react-icons/fa';
import Calendar from '../components/Calendar';
import Colors from '../utils/Colors';
import { checkLogin, fetchUserDays, fetchUserStreak } from '../API/API';

const ProfilePage = () => {
  const colors = Colors();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [streak, setStreak] = useState(0);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchLoginData = async () => {
      const user = await checkLogin();
      if (!user) {
        navigate('/welcome');
      }
      else {
        setUser(user);
        setLoaded(true);
      }
    }
    fetchLoginData();
  }, []);


  useEffect(() => {
    const getStreakDays = async(username) => {
      const userStreak = await fetchUserStreak(username);
      const userDays = await fetchUserDays(username);
      console.log("Fetched User Streak:", userStreak);
      setStreak(userStreak);
      setDays(userDays);
    }
    if (user && user.username) {
      getStreakDays(user.username);
    }
  }, [user])

  return (
    // Full Page Flex
    <> {loaded &&
      <Flex className="page" overflow="hidden" color="black" bg={colors.MAIN1}>
        {/* Middle content flex */}
        <Flex p='8vw' gap='2vw' flex={1} flexDirection='column' overflowY='auto' alignItems='center' sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
          <Flex flexDirection='column' alignItems='center'>
            {/* <Avatar boxSize={{ sm: '120px', lg: '200px' }} mb={6}></Avatar> */}
            <Image
              src={user.pfp}
              alt='Profile picture'
              borderRadius='full'
              boxSize="15vw"
              ml={{ base: 0, sm: 3 }}
              onClick={() => handleChangeTab("Profile")}
              cursor="pointer"
              shadow="md"
            />
            {/* <Text>Profile Picture</Text> */}
          </Flex>
          <Box width='fit-content'>
            <Heading fontSize={{ sm: 'md', lg: '2xl' }} color={colors.TEXT1} fontFamily="Feather Bold " pt='1vw'>Username: {user.username}</Heading>
            <Heading fontSize={{ sm: 'md', lg: '2xl' }} color={colors.TEXT1} fontFamily="Feather Bold" pt='1vw'>Email: {user.email}</Heading>
          </Box>

          <Box p='1vw' bg={colors.BRIGHT2} borderRadius="xl" w="20vw" color={colors.MAIN1} display='flex' flexDirection='row'>
            <Flex px={4} justifyContent='space-between' alignItems='center' gap='1vw' flexDirection='row' w="100%">
              <Heading fontSize={{ sm: 'md', lg: '2xl' }}>Streaks</Heading>
              <Heading fontSize={{ sm: 'md', lg: '2xl' }}>{streak}</Heading>
            </Flex>
          </Box>

        </Flex>

        {/* Right Side Stack */}
        <Box pt='12vw' w='30vw' px='1vw' >
          <Calendar streak={streak} days = {days}/>
        </Box>

      </Flex >}
    </>
  );
};

export default ProfilePage;
