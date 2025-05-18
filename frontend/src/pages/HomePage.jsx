import React, { useRef } from 'react'
import { Grid, GridItem, Flex, Text, Box, VStack, Heading, Icon, Checkbox, CheckboxGroup, Image, Button, Avatar } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { checkLogin, getUserRoutine } from '../API/API'

import SkinAnalysis from '../components/SkinAnalysis';
import Calendar from '../components/Calendar';
import Product from '../components/Product';
import Colors from '../utils/Colors';

// const productItems = ['Toner', 'Moisturizer', 'Serum', 'Sunscreen'];

const HomePage = () => {
  const colors = Colors();
  const skinAnalysisRef = useRef(null);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [routine, setRoutine] = useState([])

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
    // load user's product list
    const setProductList = async (username) => {
      const productList = await getUserRoutine(username);
      console.log('product list:', productList);
      if (productList) {
        setRoutine(productList);
      }
    }
    if (user) {
      setProductList(user.username);
    }
  }, [user])

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
        <VStack id="home-side" pos="sticky">
          <Calendar />
          <Heading id="home-side-leaderboard-heading" color={colors.SECONDARY3} size="lg">Leaderboard</Heading>
          <Box p={4} bg={colors.SECONDARY5} borderRadius="xl" w="100%" color={colors.MAIN1} display='flex' flexDirection='row'>
            <Avatar />
            <Box pl={4} alignContent='center'>
              <Heading size="sm">Martha Anderson</Heading>
              <Text fontSize="sm">80$</Text>
            </Box>
          </Box>
          <Box p={4} bg={colors.SECONDARY5} borderRadius="xl" w="100%" color={colors.MAIN1} display='flex' flexDirection='row'>
            <Avatar />
            <Box pl={4} alignContent='center'>
              <Heading size="sm">Julia Clover</Heading>
              <Text fontSize="sm">50$</Text>
            </Box>
          </Box>

        </VStack>

      </Flex >}
    </>
  )
}

export default HomePage