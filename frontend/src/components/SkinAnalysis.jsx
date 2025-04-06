import React from 'react'

import {Flex, Heading, Image, CircularProgress, CircularProgressLabel, Text, List, Box, ListItem, VStack} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons';

import skinanalysis from '../assets/skinanalysis.png';



const SkinAnalysis = () => {

  return (
        <Box>
        <Heading textAlign="center">Combination Skin Type</Heading>
        <Flex direction="row">
            <Image src={skinanalysis} alt="skin analysis" m={25} boxSize="30%"></Image>
            <VStack  w="30%" p={4} spacing={2} pt={10}>
                    <CircularProgress value={30} color='#7E7DD9'thickness='4px' size='100px'>
                            <CircularProgressLabel fontSize='20px'>30% <Text fontSize='15px'>Luminosity</Text></CircularProgressLabel>
                    </CircularProgress>
                    <CircularProgress value={25} color='#7E7DD9'thickness='4px'size='100px'>
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
        <Text p={4} >Skin Analysis Result: Likely Combination to Oily Skin, showing visible redness, uneven texture, and signs of acne or sun damage, including hyperpigmentation and irritation.
            <br/>Your Skin Can Improve! With the right care, you can restore balance, reduce redness, and achieve a smoother, healthier glow. Here's your personalized skincare routine to help you get there:
        </Text>

        <List p={3} spacing={3}>
            <ListItem>
                <CheckIcon/>
                Toner: Paula's Choice Skin Perfecting 2% BHA Liquid Exfoliant
            </ListItem>
            <ListItem>
                <CheckIcon/>
                Moisturizer: La Roche-Posay Toleriane Double Repair Moisturizer
                </ListItem>
            <ListItem>
                <CheckIcon/>
                Serum: The Ordinary Niacinamide 10% + Zinc 1% 
                </ListItem>
            <ListItem>
                <CheckIcon/>
                Sunscreen: EltaMD UV Clear SPF 46 
                </ListItem>
        </List>

        <Text p={4}>
            Start today, and you'll see visible improvements in just a few weeks! Keep up the routine, and your skin will thank you. 
        </Text>
        </Box>
    )
}

export default SkinAnalysis