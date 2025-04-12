import React from 'react'

import { Flex, Heading, Image, CircularProgress, CircularProgressLabel, Text, List, Box, ListItem, VStack } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons';
import Metrics from './Metrics.jsx'
import skinanalysis from '../assets/skinanalysis.png';



const SkinAnalysis = ({ luminosity, clarity, vibrancy, overall }) => {

    return (
        <Box>
            <Heading textAlign="center">Combination Skin Type</Heading>
            <Flex direction="row">
                <Image src={skinanalysis} alt="skin analysis" m={25} boxSize="30%" flex={1} p={20}></Image>
                <Metrics luminosity={luminosity} clarity={clarity} vibrancy={vibrancy} overall={overall} />
            </Flex>
            <Text p={4} >
                Skin Analysis Result: Likely Combination to Oily Skin, showing visible redness, uneven texture, and signs of acne or sun damage, including hyperpigmentation and irritation.
                <br /><br />
                🚀 Your Skin Can Improve! With the right care, you can restore balance, reduce redness, and achieve a smoother, healthier glow. Here’s your personalized skincare routine to help you get there:
            </Text>

            <List p={3} spacing={3}>
                <ListItem>
                    <CheckIcon />
                    Toner: Paula's Choice Skin Perfecting 2% BHA Liquid Exfoliant
                </ListItem>
                <ListItem>
                    <CheckIcon />
                    Moisturizer: La Roche-Posay Toleriane Double Repair Moisturizer
                </ListItem>
                <ListItem>
                    <CheckIcon />
                    Serum: The Ordinary Niacinamide 10% + Zinc 1%
                </ListItem>
                <ListItem>
                    <CheckIcon />
                    Sunscreen: EltaMD UV Clear SPF 46
                </ListItem>
            </List>

            <Text p={4}>
                🕒Start today, and you'll see visible improvements in just a few weeks! Keep up the routine, and your skin will thank you.
            </Text>
        </Box>
    )
}

export default SkinAnalysis