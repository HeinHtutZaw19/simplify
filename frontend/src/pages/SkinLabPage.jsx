import React from 'react'
import { Flex, Text, Image, Button } from '@chakra-ui/react'
import SkinLabAnalysis from '../components/SkinLabAnalysis';
import testImage from '../assets/skinanalysis.png';

const SkinLabPage = () => {
  return (
    <Flex flex="1" height="100vh" overflowY="auto" direction="column" alignItems="center" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
      <Image
        src={testImage}
        alt="skin analysis"
        height="400px"
        mt="120px"
        border="15px solid"
        rounded="15px"
        borderColor="blue.200"
      />
      <Button mt="30px" mb="120px" width="120px" height="35px" lineHeight="90px" colorScheme="blue"
      >
        Submit
      </Button>
      <SkinLabAnalysis />
    </Flex>
  )
}

export default SkinLabPage