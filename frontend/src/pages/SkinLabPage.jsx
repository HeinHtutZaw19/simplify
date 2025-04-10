import React from 'react'
import { Flex, Box, Image, Button, Text } from '@chakra-ui/react'
import { FiUpload } from "react-icons/fi";
import { FaRedo } from "react-icons/fa";
import SkinLabAnalysis from '../components/SkinLabAnalysis';
import testImage from '../assets/skinanalysis.png';

const SkinLabPage = () => {
  return (
    <Flex flex="1" height="100vh" overflowY="auto" direction="column" alignItems="center" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
      <Box position="relative" mt="80px">
        <Image src={testImage} height="400px" border="15px solid" rounded="15px" borderColor="blue.200" />
        <Box
          position="absolute"
          top="200px"
          left="190px"
          width="40px"
          height="40px"
          border="2px solid #2b88ed"
          borderRadius="md"
          zIndex="2"
        />
        <Box
          position="absolute"
          top="220px"
          left="230px"
          width="200px"
          height="2px"
          background="#2b88ed"
          transformOrigin="left center"
          zIndex="1"
        />
        <Box
          position="absolute"
          top="160px"
          left="430px"
          width="120px"
          height="120px"
          border="7px solid #2b88ed"
          borderRadius="7px"
          overflow="hidden"
          boxShadow="lg"
          zIndex="1"
        >
          <Image src={testImage} transform="scale(6.0)" transformOrigin="top left" ml="-400px" mt="-420px" />
        </Box>

        <Box
          position="absolute"
          top="188px"
          left="145px"
          width="40px"
          height="40px"
          border="2px solid #2b88ed"
          borderRadius="md"
          zIndex="2"
        />
        <Box
          position="absolute"
          top="208px"
          left="-115px"
          width="260px"
          height="2px"
          background="#2b88ed"
          transformOrigin="left center"
          zIndex="1"
        />
        <Box
          position="absolute"
          top="148px"
          left="-230px"
          width="120px"
          height="120px"
          border="7px solid #2b88ed"
          borderRadius="7px"
          overflow="hidden"
          boxShadow="lg"
          zIndex="1"
        >
          <Image src={testImage} transform="scale(6.0)" transformOrigin="top left" ml="-295px" mt="-395px" />
        </Box>
      </Box>
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
      <SkinLabAnalysis />
    </Flex>
  )
}

export default SkinLabPage