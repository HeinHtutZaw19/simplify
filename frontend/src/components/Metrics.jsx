import React from 'react'
import { CircularProgress, CircularProgressLabel, Text, VStack, HStack } from '@chakra-ui/react'
import Colors from '../utils/Colors';


const Metrics = ({ luminosity, clarity, vibrancy, overall }) => {
    const colors = Colors();
    return (
        <HStack w='38%'>
            <VStack w='35%' spacing={2}>
                <CircularProgress value={luminosity} color='#7E7DD9' thickness='4px' size='100%'>
                    <CircularProgressLabel fontSize='1vw' color={colors.TEXT1}>{luminosity}% <Text>Luminosity</Text></CircularProgressLabel>
                </CircularProgress>
                <CircularProgress value={clarity} color='#7E7DD9' thickness='4px' size='100%'>
                    <CircularProgressLabel fontSize='1vw' color={colors.TEXT1}>{clarity}%<Text>Clarity</Text></CircularProgressLabel>
                </CircularProgress>
                <CircularProgress value={vibrancy} color='#7E7DD9' thickness='4px' size='100%'>
                    <CircularProgressLabel fontSize='1vw' color={colors.TEXT1}>{vibrancy}%<Text>Vibrancy</Text></CircularProgressLabel>
                </CircularProgress>
            </VStack>
            <CircularProgress w='65%' value={overall} color='#F7A442' thickness='5px' size='100%'>
                <CircularProgressLabel fontSize='2vw' color={colors.TEXT1}>{overall}%<Text>Overall</Text></CircularProgressLabel>
            </CircularProgress>
        </HStack>
    )
}

export default Metrics