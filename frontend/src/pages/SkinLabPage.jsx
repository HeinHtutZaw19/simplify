import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../API/API';
import { Flex, Box, Image, Button, Text, SimpleGrid } from '@chakra-ui/react'
import { FiUpload } from "react-icons/fi";
import { FaRedo } from "react-icons/fa";
import SkinLabAnalysis from '../components/SkinLabAnalysis';
import PatchDetail from '../components/PatchDetail';
import BoxOverlayImage from '../components/BoxOverlayImage';
import testImage from '../assets/skinanalysis.png';
import Colors from '../utils/Colors';


const boxes = [
  { x: 50, y: 35, color: 'green.500' },   // Green
  { x: 65, y: 50, color: 'blue.500' },   // Blue
  { x: 50, y: 50, color: 'yellow.500' }, // Yellow
  { x: 30, y: 50, color: 'red.500' },  // Red
];
const SkinLabPage = () => {
  const colors = Colors();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginData = async () => {
      const user = await checkLogin();
      if (!user) {
        navigate('/welcome');
      }
    }
    fetchLoginData();
  });

  return (
    <Flex className="page" overflow="hidden" color="black" bg={colors.MAIN1}>
      <Flex className="flex-scroll" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>

        <Flex width={{ sm: "60%", md: "50%", lg: "100%" }} pb={0}>
          {/*
          Green Patch + Blue Patch
        */}
          <Flex className="skinlab-detail-flex" display={{ sm: 'none', md: 'none', lg: 'flex' }} alignItems="flex-start">
            <PatchDetail color="green.500" description="The visible wrinkles indicate a reduction in collagen and elasticity, leading to rougher texture and an aged appearance of the skin." />
            <PatchDetail color="blue.500" description="The sunburn mask pattern on the skin suggests prolonged UV exposure, causing redness, irritation, and potential long-term damage such as hyperpigmentation and premature aging." />
          </Flex>
          {/*
          Image with overlay
        */}
          <BoxOverlayImage boxes={boxes} img={testImage} />
          {/*
          Yellow Patch + Red Patch
        */}
          <Flex className="skinlab-detail-flex" display={{ sm: 'none', md: 'none', lg: 'flex' }} alignItems="flex-end">
            <PatchDetail color="yellow.500" description="The presence of pimples indicates inflammation and clogged pores, often caused by excess oil, bacteria, or hormonal imbalances, which can lead to redness, swelling, and potential scarring if untreated." />
            <PatchDetail color="red.500" description="Enlarged or visible pores suggest excess oil production and potential buildup of dirt or dead skin cells, which can contribute to acne and uneven skin texture." />
          </Flex>
        </Flex>


        {/*
        Button Container
      */}
        <Flex direction="row" mt="15px" mb="40px" align="center" width={300}>
          <Button width="120px" ml="90px" mr="35px" height="35px" lineHeight="90px" bg={colors.BRIGHT3} color={colors.MAIN1} _hover={{ bg: colors.BRIGHT5 }}>
            Submit
          </Button>
          <Text fontSize={20} mr="15px" style={{ cursor: 'pointer' }} color={colors.TEXT2}>
            <FiUpload />
          </Text>
          <Text fontSize={15} style={{ cursor: 'pointer' }} color={colors.TEXT2}>
            <FaRedo />
          </Text>
        </Flex>
        <SimpleGrid
          columns={2}
          spacing={6}
          p={10}
          display={{ sm: 'grid', md: 'grid', lg: 'none' }}
          alignItems="flex-start"
        >
          <PatchDetail
            color="green.500"
            description="The visible wrinkles indicate a reduction in collagen and elasticity, leading to rougher texture and an aged appearance of the skin."
          />
          <PatchDetail
            color="blue.500"
            description="The sunburn mask pattern on the skin suggests prolonged UV exposure, causing redness, irritation, and potential long-term damage such as hyperpigmentation and premature aging."
          />
          <PatchDetail
            color="yellow.500"
            description="The presence of pimples indicates inflammation and clogged pores, often caused by excess oil, bacteria, or hormonal imbalances, which can lead to redness, swelling, and potential scarring if untreated."
          />
          <PatchDetail
            color="red.500"
            description="Enlarged or visible pores suggest excess oil production and potential buildup of dirt or dead skin cells, which can contribute to acne and uneven skin texture."
          />
        </SimpleGrid>
        <SkinLabAnalysis luminosity={35} clarity={20} vibrancy={25} overall={30} />
      </Flex>
    </Flex>
  )
}

export default SkinLabPage