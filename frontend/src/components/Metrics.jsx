import React from 'react'
import { CircularProgress, CircularProgressLabel, Text, VStack, HStack } from '@chakra-ui/react'

const Metrics = () => {
    return (
        <HStack w='38%'>
            <VStack w='35%' spacing={2}>
                <CircularProgress value={30} color='#7E7DD9' thickness='4px' size='100%'>
                    <CircularProgressLabel fontSize='1vw'>30% <Text>Luminosity</Text></CircularProgressLabel>
                </CircularProgress>
                <CircularProgress value={25} color='#7E7DD9' thickness='4px' size='100%'>
                    <CircularProgressLabel fontSize='1vw'>25%<Text>Clarity</Text></CircularProgressLabel>
                </CircularProgress>
                <CircularProgress value={35} color='#7E7DD9' thickness='4px' size='100%'>
                    <CircularProgressLabel fontSize='1vw'>35%<Text>Vibrancy</Text></CircularProgressLabel>
                </CircularProgress>
            </VStack>
            <CircularProgress w='65%' value={30} color='#F7A442' thickness='5px' size='100%'>
                <CircularProgressLabel fontSize='2vw'>30%<Text>Overall</Text></CircularProgressLabel>
            </CircularProgress>
        </HStack>
    )
}

export default Metrics