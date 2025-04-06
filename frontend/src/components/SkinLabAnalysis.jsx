import React from 'react'

import { Flex, CircularProgress, CircularProgressLabel, Text, Box, VStack } from '@chakra-ui/react'

const SkinLabAnalysis = () => {

    return (
        <Box>
            <Flex direction="row" justify='center'>
                <VStack px={10} spacing={2} pt={10}>
                    <CircularProgress value={30} color='#7E7DD9' thickness='4px' size='100px'>
                        <CircularProgressLabel fontSize='20px'>30% <Text fontSize='15px'>Luminosity</Text></CircularProgressLabel>
                    </CircularProgress>
                    <CircularProgress value={25} color='#7E7DD9' thickness='4px' size='100px'>
                        <CircularProgressLabel fontSize='20px'>25%<Text fontSize='15px'>Clarity</Text></CircularProgressLabel>
                    </CircularProgress>
                    <CircularProgress value={35} color='#7E7DD9' thickness='4px' size='100px'>
                        <CircularProgressLabel fontSize='20px'>35%<Text fontSize='15px'>Vibrancy</Text></CircularProgressLabel>
                    </CircularProgress>
                </VStack>
                <CircularProgress alignContent="center" value={30} color='#F7A442' thickness='5px' size='200px'>
                    <CircularProgressLabel fontSize='25px'>30%<Text fontSize='20px'>Overall</Text></CircularProgressLabel>
                </CircularProgress>
            </Flex>
            <Text px={40} py={20} fontSize={18} >Skin Analysis Result: Likely Combination to Oily Skin, showing visible redness, uneven texture, and signs of acne or sun damage, including hyperpigmentation and irritation.
                <br />Your Skin Can Improve! With the right care, you can restore balance, reduce redness, and achieve a smoother, healthier glow.
            </Text>
        </Box>
    )
}

export default SkinLabAnalysis