import React, { useRef } from 'react'
import { Grid, GridItem, Flex, Text, Box, VStack, Heading, Icon, Checkbox, CheckboxGroup, Image, Button, Avatar } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { checkLogin, fetchHomeLeaderboard, fetchUserDays, fetchUserStreak, getUserRoutine, updateUserStreak } from '../API/API'

import SkinAnalysis from '../components/SkinAnalysis';
import Calendar from '../components/Calendar';
import Product from '../components/Product';
import Colors from '../utils/Colors';
import UserCard from "../components/UserCard.jsx"


// const productItems = ['Toner', 'Moisturizer', 'Serum', 'Sunscreen'];

const HomePage = () => {
  const colors = Colors();
  const skinAnalysisRef = useRef(null);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [routine, setRoutine] = useState([]);
  const [streak, setStreak] = useState(null);
  const [days, setDays] = useState([]);
  const [finish, setFinish] = useState(false);
  const [homeboard, setHomeboard] = useState([]);
  const [username, setUsername] = useState("");


  useEffect(() => {
    const fetchLoginData = async () => {
      const user = await checkLogin();
      if (!user) {
        navigate('/welcome');
      }
      else {
        setUser(user);
        setLoaded(true);
        const today = new Date();
        const routineDate = new Date(user.routineDate);
        if (today.getDate() === routineDate.getDate()){
          setFinish(true);
        }
        setUsername(user.username);
      }
    }
    fetchLoginData();
  }, []);

  useEffect(() => {
    // load user's product list
    const setProductList = async (username) => {
      const productList = await getUserRoutine(username);
      console.log('product list:', productList);
      if (productList) {
        setRoutine(productList);
      }
    }
    const getStreakDays = async(username) => {
      const userStreak = await fetchUserStreak(username);
      const userDays = await fetchUserDays(username);
      console.log("Fetched User Streak:", userStreak);
      setStreak(userStreak);
      setDays(userDays);
    }
    const getHomeboard = async(username) => {
      const theHomeboard = await fetchHomeLeaderboard(username);
      console.log("Fetched Home Leaderboard:", theHomeboard);
      setHomeboard(theHomeboard);
    }
    if (user) {
      setProductList(user.username);
      getStreakDays(user.username);
      getHomeboard(user.username);
    }
  }, [user])

  const routineFinish = async () =>{
    const newStreak = await updateUserStreak();
    if (newStreak){
      setStreak(newStreak.streak);
      setDays(newStreak.days);
      setFinish(true);

      console.log("Streak Updated:", newStreak.streak);
      console.log("Days updated: ", newStreak.days);
    }
    else {
      console.error("Error updating streak");
    }
  }

  const onSkinAnalysisClick = () => {
    skinAnalysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const [checked, setChecked] = useState([]);
  const allChecked = checked.length === routine.length;

  const handleCheck = (values) => {
    setChecked(values);
  }

  return (
    // Full Page Flex
    <> {loaded &&
      <Flex className="page" overflow="hidden" color="black" bg={colors.MAIN1}>
        {/* Middle content flex */}
        <Flex className="flex-scroll" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>

          <Box id="home-heading">
            <Heading size="lg" color={colors.TEXT1} fontFamily="Feather Bold">Finish the checklist to get +1 streak!</Heading>
          </Box>

          <Grid id="home-routine-grid" templateColumns="repeat(2, 1fr)">
            <CheckboxGroup colorScheme="yellow" value={checked} onChange={handleCheck}>
              {routine.map((product) => (
                <Product key={product._id} product={product} isChecked={checked.includes(product.name)} />
              ))}
            </CheckboxGroup>
          </Grid>

          {allChecked && (
            <Box
              id="home-skinanalysis-button"
              borderRadius="md"
              as="button"
              bg={colors.BRIGHT3}
              _hover={{ bg: colors.BRIGHT5 }}
            >
              <Text textAlign="center" color={colors.MAIN1}>Routine Finished!</Text>
            </Box>
          )}

          <Box
            id="home-skinanalysis-button"
            borderRadius="md"
            as="button"
            onClick={onSkinAnalysisClick}
            bg={colors.BRIGHT3}>
            <Text textAlign="center" color={colors.MAIN1}>Skin Analysis <TriangleDownIcon color={colors.MAIN1} /></Text>
          </Box>

          <Box ref={skinAnalysisRef} w="100%">
            <SkinAnalysis luminosity={35} clarity={20} vibrancy={25} overall={30} />
          </Box>

          <div style={{ fontSize: '11px' }}>Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0</div>

        </Flex>

        {/* Right Side Stack */}
        <VStack id="home-side" sx={{ '&::-webkit-scrollbar': { display: 'none' } }} >
          <Calendar streak = {streak} days = {days}/>
          <Heading id="home-side-leaderboard-heading" color={colors.SECONDARY3} size="lg">Leaderboard</Heading>
          {homeboard.map((user) => (
            <><Box key={user._id} p={4} bg={user.username === username ? colors.BRIGHT4 : colors.BRIGHT2} borderRadius="xl" w="100%" color={colors.MAIN1} display='flex' flexDirection='row' >
              <Avatar size='sm'/>
              <Box pl={4} alignContent='center' display='flex' flexDirection={{ base: 'column', lg: 'row' }} flex={2} justifyContent='space-between'> 
                  <Text size="sm" fontWeight='medium'>{user.username}</Text>
                  <Heading fontSize="sm">{user.point}</Heading>
              </Box>
            </Box></>
            //<UserCard key={index} user={user} name={user.username}/>
          ))}
      </VStack>


      </Flex >}
    </>
  )
}

export default HomePage