import React from 'react'

import { Flex, CircularProgress, CircularProgressLabel, Text, Box, VStack } from '@chakra-ui/react'
import Metrics from './Metrics.jsx'

const SkinLabAnalysis = () => {

    return (
        <Box>
            <Flex direction="row" justify='flex-start'>
                <Text flex="1" p={30} fontSize={18} >
                    Skin Analysis Result: Likely Combination to Oily Skin, showing visible redness, uneven texture, and signs of acne or sun damage, including hyperpigmentation and irritation.
                    <br /> <br />
                    🚀 Your Skin Can Improve!
                    <br /><br />
                    Luminosity: 30% because (detailed description)<br />
                    Clarity: 25% because (detailed description)<br />
                    Vibrancy: 35% because (detailed description)<br />
                </Text>
                <Metrics />
            </Flex>

        </Box>
    )
}

export default SkinLabAnalysis