import React, { useRef } from 'react'
import { Grid, GridItem, Flex, Text, Box, VStack, Heading, Icon, Checkbox, CheckboxGroup, Image, Button, Avatar } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { checkLogin, logoutUser } from '../API/API'

import SkinAnalysis from '../components/SkinAnalysis';
import Calendar from '../components/Calendar';
import UserCard from '../components/UserCard';

import toner from '../assets/toner.png';
import serum from '../assets/serum.png';
import moisturizer from '../assets/moisturizer.png';
import sunscreen from '../assets/sunscreen.png';

const HomePage = () => {
  const imageMap = {
    Toner: toner,
    Serum: serum,
    Moisturizer: moisturizer,
    Sunscreen: sunscreen,
  };
  const skinAnalysisRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginData = async () => {
      const user = await checkLogin();
      if (!user) {
        //redirect to /welcome (to /signup for now)
        navigate('/welcome');
      }
    }
    fetchLoginData();
  });

  const onSkinAnalysisClick = () => {
    skinAnalysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    // Full Page Flex
    <Flex className="page" overflow="hidden" color="black">
      {/* Middle content flex */}
      <Flex id="home-main" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>

        <Box id="home-heading">
          <Heading size="lg" fontWeight="bold">Finish the checklist to get +1 streak!</Heading>
        </Box>

        <Grid id="home-routine-grid" templateColumns="repeat(2, 1fr)">
          <CheckboxGroup colorScheme="green" defaultValue={[]}>
            {['Toner', 'Moisturizer', 'Serum', 'Sunscreen'].map((item) => (
              <Box className="home-routine-box" key={item} borderRadius="lg">
                <Checkbox className="home-routine-checkbox" value={item} size="lg">
                  <Text fontWeight="bold" color="white">{item}</Text>
                </Checkbox>
                <Image className="home-routine-image" src={imageMap[item]} alt={item}></Image>
              </Box>
            ))}
          </CheckboxGroup>
        </Grid>

        <Box
          id="home-skinanalysis-button"
          borderRadius="md"
          as="button"
          onClick={onSkinAnalysisClick}>
          <Text textAlign="center" color="white">Skin Analysis <TriangleDownIcon color="white" /></Text>
        </Box>

        <Box ref={skinAnalysisRef} mt={10} w="100%" style={{ border: '1px solid red' }}>
          <SkinAnalysis />
        </Box>

        <div style={{fontSize:'11px'}}>Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0</div>

      </Flex>

      {/* Right Side Stack */}
      <VStack pos="sticky" right="0" h="100vh" w="25vw" p={4} spacing={6} pt={8}>
        <Calendar />

        <Heading size="lg" fontWeight="bold" color="#5A67BA">Leaderboard</Heading>

        <Box p={4} bg="#1e1f24" borderRadius="md" w="100%" color='white' display='flex' flexDirection='row'>
          <Avatar />
          <Box pl={4} alignContent='center'>
            <Heading size="sm">Martha Anderson</Heading>
            <Text fontSize="sm">80$</Text>
          </Box>
        </Box>
        <Box p={4} bg="#1e1f24" borderRadius="md" w="100%" color='white' display='flex' flexDirection='row'>
          <Avatar />
          <Box pl={4} alignContent='center'>
            <Heading size="sm">Julia Clover</Heading>
            <Text fontSize="sm">50$</Text>
          </Box>
        </Box>

      </VStack>

    </Flex>
  )
}

export default HomePage