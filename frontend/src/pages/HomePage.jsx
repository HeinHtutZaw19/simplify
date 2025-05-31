import React, { useRef } from 'react'
import { Grid, Flex, Text, Box, VStack, Heading, Button, Avatar } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { fetchHomeLeaderboard, fetchUserDays, fetchUserStreak, getUserRoutine, updateUserStreak, getUserFeedback } from '../API/API'

import SkinAnalysis from '../components/SkinAnalysis';
import Calendar from '../components/Calendar';
import Product from '../components/Product';
import Colors from '../utils/Colors';

const HomePage = ({ user }) => {
  const colors = Colors();
  const skinAnalysisRef = useRef(null);
  const navigate = useNavigate();
  const [routine, setRoutine] = useState([]);
  const [feedback, setFeedback] = useState(null); // obj of summary, imageUrl, and scores
  const [streak, setStreak] = useState(null);
  const [days, setDays] = useState([]);
  const [finish, setFinish] = useState(false);
  const [homeboard, setHomeboard] = useState([]);
  const [checked, setChecked] = useState([]);
  const allChecked = checked.length === routine.length || finish;

  useEffect(() => {
    const today = new Date();
    const routineDate = new Date(user.routineDate);
    if (today.getDate() === routineDate.getDate()) {
      setFinish(true);
    }
    if (user.days.includes(today)) {
      setFinish(true);
    }
  }, [navigate]);

  const getHomeboard = async (username) => {
    const theHomeboard = await fetchHomeLeaderboard(username);
    console.log("Fetched Home Leaderboard:", theHomeboard);
    setHomeboard(theHomeboard);
  }

  useEffect(() => {
    // load user's product list
    const setPageStates = async (username) => {
      const productList = await getUserRoutine(username);
      const feedbackObj = await getUserFeedback(username);
      // console.log('product list:', productList);
      // console.log('feedback:', feedbackObj);
      if (productList) {
        setRoutine(productList);
      }
      if (feedbackObj) {
        setFeedback(feedbackObj);
      }
    }
    const getStreakDays = async (username) => {
      const userStreak = await fetchUserStreak(username);
      const userDays = await fetchUserDays(username);
      const today = new Date();
      console.log("Fetched User Streak:", userStreak);
      setStreak(userStreak);
      setDays(userDays);
      if (userDays.includes(today)) {
        setFinish(true);
      }
    }

    setPageStates(user.username);
    getStreakDays(user.username);
    getHomeboard(user.username);
  }, [user, navigate])

  const routineFinish = async () => {
    const newStreak = await updateUserStreak();
    if (newStreak) {
      setStreak(newStreak.streak);
      setDays(newStreak.days);
      setFinish(true);
      getHomeboard(user.username);

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

  // const handleCheck = (values) => {
  //   setChecked(values);
  // }

  return (
    // Full Page Flex
    <Flex className="page" overflow="hidden" color="black" bg={colors.MAIN1}>
      {/* Middle content flex */}
      <Flex className="flex-scroll" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>

        <Box id="home-heading">
          <Heading size="lg" color={colors.TEXT1} fontFamily="Feather Bold">Finish the checklist to get +1 streak!</Heading>
        </Box>

        <Grid id="home-routine-grid" templateColumns="repeat(2, 1fr)">
          {routine.map((product) => (
            <Product
              key={product._id}
              product={product}
              isChecked={finish || checked.includes(product.name)}
              isDisabled={finish}
              onChange={(e) => {
                const name = product.name;
                if (e.target.checked) {
                  setChecked((prev) => [...prev, name]);
                } else {
                  setChecked((prev) => prev.filter((p) => p !== name));
                }
              }}
            />
          ))}
        </Grid>

        {allChecked && (
          <Button
            id="home-skinanalysis-button"
            borderRadius="md"
            bg={colors.BRIGHT3}
            _hover={{ bg: finish ? colors.BRIGHT3 : colors.BRIGHT5 }}
            onClick={!finish ? routineFinish : undefined}
            isDisabled={finish}
            px={6}
            py={3}
          >
            <Text color={colors.MAIN1}>
              {finish ? "Already Finished Today!" : "Routine Finished!"}
            </Text>
          </Button>
        )}

        <Box
          id="home-skinanalysis-button"
          borderRadius="md"
          as="button"
          onClick={onSkinAnalysisClick}
          bg={colors.BRIGHT3}>
          <Text textAlign="center" color={colors.MAIN1}>Skin Analysis <TriangleDownIcon color={colors.MAIN1} /></Text>
        </Box>
        {feedback &&
          <Box ref={skinAnalysisRef} w="100%">
            <SkinAnalysis feedback={feedback} luminosity={35} clarity={20} vibrancy={25} overall={30} />
          </Box>
        }

        <div style={{ fontSize: '11px' }}>Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0</div>

      </Flex>

      {/* Right Side Stack */}
      <VStack id="home-side" sx={{ '&::-webkit-scrollbar': { display: 'none' } }} >
        <Calendar streak={streak} days={days} />
        <Heading id="home-side-leaderboard-heading" color={colors.SECONDARY3} size="lg">Leaderboard</Heading>
        {homeboard.map((u) => (
          <Box key={u._id} p={4} bg={u.username === user.username ? colors.BRIGHT4 : colors.BRIGHT2} borderRadius="xl" w="100%" color={colors.MAIN1} display='flex' flexDirection='row' >
            <Avatar size="sm" src={u.pfp} shadow="md" />
            <Box pl={4} alignContent='center' display='flex' flexDirection={{ base: 'column', lg: 'row' }} flex={2} justifyContent='space-between'>
              <Text size="sm" fontWeight='medium'>{u.username}</Text>
              <Heading fontSize="sm">{u.point}</Heading>
            </Box>
          </Box>
        ))}
      </VStack>
    </Flex >
  )
}

export default HomePage