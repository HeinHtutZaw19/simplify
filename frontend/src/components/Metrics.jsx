import React from 'react'
import { CircularProgress, CircularProgressLabel, Text, VStack, HStack } from '@chakra-ui/react'

const Metrics = () => {
    return (
        <HStack>
            <VStack w="30%" p={10} spacing={2} pt={10}>
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
        </HStack>
    )
}

export default Metrics