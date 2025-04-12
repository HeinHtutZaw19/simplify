import React from 'react'
import { CircularProgress, CircularProgressLabel, Text, VStack, HStack } from '@chakra-ui/react'

const Metrics = ({ luminosity, clarity, vibrancy, overall }) => {
    return (
        <HStack>
            <VStack w="30%" p={10} spacing={2} pt={10}>
                <CircularProgress value={luminosity} color='#7E7DD9' thickness='4px' size='100px'>
                    <CircularProgressLabel fontSize='20px'>{luminosity}% <Text fontSize='15px'>Luminosity</Text></CircularProgressLabel>
                </CircularProgress>
                <CircularProgress value={clarity} color='#7E7DD9' thickness='4px' size='100px'>
                    <CircularProgressLabel fontSize='20px'>{clarity}%<Text fontSize='15px'>Clarity</Text></CircularProgressLabel>
                </CircularProgress>
                <CircularProgress value={vibrancy} color='#7E7DD9' thickness='4px' size='100px'>
                    <CircularProgressLabel fontSize='20px'>{vibrancy}%<Text fontSize='15px'>Vibrancy</Text></CircularProgressLabel>
                </CircularProgress>
            </VStack>
            <CircularProgress alignContent="center" value={overall} color='#F7A442' thickness='5px' size='200px'>
                <CircularProgressLabel fontSize='25px'>{overall}%<Text fontSize='20px'>Overall</Text></CircularProgressLabel>
            </CircularProgress>
        </HStack>
    )
}

export default Metrics