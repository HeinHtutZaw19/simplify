import React, {useRef} from 'react'
import {Grid, GridItem, Flex, Text, Box, VStack, Heading, Icon, Checkbox, CheckboxGroup, Image, Button, Avatar} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { checkLogin, logoutUser } from '../API/API'

import SkinAnalysis from '../components/SkinAnalysis';

import toner from '../assets/toner.png';
import serum from '../assets/serum.png';
import moisturizer from '../assets/moisturizer.png';
import sunscreen from '../assets/sunscreen.png';
import Calendar from '../components/Calendar';


const imageMap = {
  Toner: toner,
  Serum: serum,
  Moisturizer: moisturizer,
  Sunscreen: sunscreen,
};

const HomePage = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginData = async () => {
      const user = await checkLogin();
      if (!user) {
        //redirect to /welcome (to /signup for now)
        navigate('/signup');
      }
    }
    fetchLoginData();
  });

  const handleLogoutClick = async () => {
    console.log('logout clicked');
    const res = logoutUser();
    if (res) {
      navigate('/signup');
    }
  }

  const skinAnalysisRef = useRef(null);
  return (
    // Full Page Flex
    <Flex w="100vw" h="100vh" overflow="hidden" bg="#ffffff" color="black">
      {/* Middle content flex */}
      <Flex  flex="1" overflowY="auto" p={4} direction="column" alignItems="center" sx={{'&::-webkit-scrollbar': {display: 'none'}}}>
        
        <Box p={2} borderRadius="md" w="fit-content" >
          <Heading size="lg" fontWeight="bold">Finish the checklist to get +1 streak!</Heading>
        </Box>

        <CheckboxGroup colorScheme="green" defaultValue={[]}>
          <Grid templateColumns="repeat(2, 1fr)" gap={10}>
            {['Toner', 'Moisturizer', 'Serum', 'Sunscreen'].map((item) => (
              <Box
                key={item}
                w="20vw"
                h="18vw"
                bg= "#5A67BA" //"#DA8484"
                position="relative"
                borderRadius="md"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Checkbox value={item} p={5} size="lg" alignSelf="flex-start" color="white">
                <Text fontWeight="bold" color="white">{item}</Text>
                </Checkbox>
                <Image src={imageMap[item]} alt ={item} objectFit="contain" maxW="100%" maxH="60%" mb ={4}></Image>
              </Box>
            ))}
          </Grid>
        </CheckboxGroup>

        <Flex p={5} direction="column" align="center" gap={6}>
          <Box w="125%" h="45px" px={6} bg="#3182CE" alignContent="center" borderRadius="md"  as="button" 
          onClick={() => {skinAnalysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>
            <Text textAlign="center" color="white">Skin Analysis <TriangleDownIcon color="white"/></Text>
          </Box>
          
        </Flex>

        <Box ref={skinAnalysisRef} mt={10} w="100%">
          <SkinAnalysis />
        </Box>

        <Button onClick={handleLogoutClick}>
        Logout
        </Button>
      </Flex>

      {/* Right Side Stack */}

      <VStack pos="sticky" right="0" h="100vh" w="25vw" p={4} spacing={6} pt={8}>
        <Calendar/>

        <Heading size="lg" fontWeight="bold" color="#5A67BA">Leaderboard</Heading>
        <Box p={4} bg="#1e1f24" borderRadius="md" w="100%" color='white' display='flex' flexDirection='row'>
          <Avatar/>
          <Box pl={4} alignContent='center'>
            <Heading size="sm">Martha Anderson</Heading>
            <Text fontSize="sm">80$</Text>
          </Box>
        </Box>
        <Box p={4} bg="#1e1f24" borderRadius="md" w="100%" color='white' display='flex' flexDirection='row'>
          <Avatar/>
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