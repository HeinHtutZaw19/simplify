import React from 'react';
import {Box, Avatar, Heading, Text, VStack, Flex, } from '@chakra-ui/react';
import { FaFire } from 'react-icons/fa';
import Calendar from '../components/Calendar';
import Colors from '../utils/Colors'; 

const ProfilePage = () => {
  const colors = Colors();

  // Mock user data (you can replace this with real user data from API/auth)
  const user = {
    name: 'Henry',
    email: 'henry@example.com',
    streak: 7
  };

  return (
  // Full Page Flex
  <Flex className="page" overflow="hidden" color="black" bg={colors.MAIN1}>
  {/* Middle content flex */}
    <Flex p='8vw' gap='2vw' flex={1} flexDirection='column' overflowY='auto' alignItems='center' sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
      <Flex flexDirection='column' alignItems='center'>
        <Avatar boxSize={{ sm: '120px', lg: '200px' }} mb={6}></Avatar>
        <Text>Profile Picture</Text>
      </Flex>
      <Box width='fit-content'>
        <Heading fontSize={{ sm: 'md', lg: '2xl' }} color={colors.TEXT1} fontFamily="Feather Bold "pt='1vw'>Username: {user.name}</Heading>
        <Heading fontSize={{ sm: 'md', lg: '2xl' }} color={colors.TEXT1} fontFamily="Feather Bold" pt='1vw'>User Email: {user.email}</Heading>
      </Box>

      <Box p='1vw' bg={colors.BRIGHT2} borderRadius="xl" w="20vw" color={colors.MAIN1} display='flex' flexDirection='row'>
        <Flex px={4} justifyContent='space-between' alignItems='center' gap='1vw' flexDirection='row' w="100%">
          <Heading fontSize={{ sm: 'md', lg: '2xl' }}>Streaks</Heading>
          <Heading fontSize={{ sm: 'md', lg: '2xl' }}>{user.streak}</Heading>
        </Flex>
      </Box>

    </Flex>

  {/* Right Side Stack */}
    <Box pt='12vw' w='30vw'px='1vw' >
      <Calendar />
    </Box>

  </Flex >
  );
};

export default ProfilePage;
