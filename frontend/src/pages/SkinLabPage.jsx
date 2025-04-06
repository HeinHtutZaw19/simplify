import React from 'react'
import { Flex, Text, Image } from '@chakra-ui/react'
import skinanalysis from '../assets/skinanalysis.png';

const SkinLabPage = () => {
  return (
    <Flex width={"100%"} direction="row" justify="center">
      <Image
        src={skinanalysis}
        alt="skin analysis"
        height="400px"
        mt="100px"
        border="20px solid"
        rounded="20px"
        borderColor="blue.400"
      />
    </Flex>
  )
}

export default SkinLabPage