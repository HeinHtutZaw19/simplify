import React, { useEffect, useState, useRef } from 'react';
import { Box, Heading, Flex, Image, Avatar } from '@chakra-ui/react';
import Calendar from '../components/Calendar';
import Colors from '../utils/Colors';
import { uploadImage, updateUserPFP, fetchUserDays, fetchUserStreak } from '../API/API';

const ProfilePage = ({ user, setUser }) => {
  const colors = Colors();
  const fileRef = useRef(null);
  const [streak, setStreak] = useState(0);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const getStreakDays = async (username) => {
      const userStreak = await fetchUserStreak(username);
      const userDays = await fetchUserDays(username);
      console.log("Fetched User Streak:", userStreak);
      setStreak(userStreak);
      setDays(userDays);
    }
    getStreakDays(user.username);
  }, [user])

  const handleImageClick = async () => {
    console.log('pfp clicked');

    // choose image file
    fileRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log('file:', file)

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a PNG, JPG, or JPEG image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    // upload to cloudinary
    const uploaded = await uploadImage(formData);
    console.log('uploaded pfp url:', uploaded.imageUrl)

    const updatedUser = await updateUserPFP(user.username, uploaded.imageUrl);
    console.log('profile page:', updatedUser)
    setUser(updatedUser);
  };

  return (
    // Full Page Flex
    <Flex className="page" overflow="hidden" color="black" bg={colors.MAIN1}>
      <Flex p='8vw' gap='2vw' flex={1} flexDirection='column' overflowY='auto' alignItems='center' sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
        <Flex flexDirection='column' alignItems='center'>
          <Avatar
            src={user.pfp}
            alt='Profile picture'
            boxSize="15vw"
            ml={{ base: 0, sm: 3 }}
            onClick={handleImageClick}
            size="sm"
            cursor="pointer"
            shadow="md"
          />
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: 'none' }}
            ref={fileRef}
            onChange={handleFileChange}
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
        <Calendar streak={streak} days={days} />
      </Box>
    </Flex >
  );
};

export default ProfilePage;
