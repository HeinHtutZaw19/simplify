import React from 'react'
import { Flex, Box, Image, Button, Text } from '@chakra-ui/react'
import { FiUpload } from "react-icons/fi";
import { FaRedo } from "react-icons/fa";
import SkinLabAnalysis from '../components/SkinLabAnalysis';
import PatchDetail from '../components/PatchDetail';
import BoxOverlayImage from '../components/BoxOverlayImage';
import testImage from '../assets/skinanalysis.png';

const boxes = [
  { x: 120, y: 120, color: 'green.500' },   // Green
  { x: 140, y: 320, color: 'blue.500' },   // Blue
  { x: 125, y: 190, color: 'yellow.500' }, // Yellow
  { x: 170, y: 200, color: 'red.500' },  // Red
];
const SkinLabPage = () => {
  return (
    <Flex flex="1" height="100vh" overflowY="auto" direction="column" alignItems="center" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
      <Flex position="relative" width="100%" p={5}  >
        {/*
          Green Patch + Blue Patch
        */}
        <Flex flex="1" direction="column" alignItems="flex-start" justifyContent="space-evenly" width="100%" height="100%">
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
        <Flex flex="1" direction="column" alignItems="flex-end" justifyContent="space-evenly" width="100%" height="100%">
          <PatchDetail color="yellow.500" description="The presence of pimples indicates inflammation and clogged pores, often caused by excess oil, bacteria, or hormonal imbalances, which can lead to redness, swelling, and potential scarring if untreated." />
          <PatchDetail color="red.500" description="Enlarged or visible pores suggest excess oil production and potential buildup of dirt or dead skin cells, which can contribute to acne and uneven skin texture." />
        </Flex>
      </Flex>

      {/*
        Button Container
      */}
      <Flex direction="row" mt="15px" mb="40px" align="center" width={300}>
        <Button width="120px" ml="90px" mr="35px" height="35px" lineHeight="90px" colorScheme="blue">
          Submit
        </Button>
        <Text fontSize={20} mr="15px" style={{ cursor: 'pointer' }}>
          <FiUpload />
        </Text>
        <Text fontSize={15} style={{ cursor: 'pointer' }}>
          <FaRedo />
        </Text>
      </Flex>
      <SkinLabAnalysis luminosity={35} clarity={20} vibrancy={25} overall={30} />
    </Flex>
  )
}

export default SkinLabPage