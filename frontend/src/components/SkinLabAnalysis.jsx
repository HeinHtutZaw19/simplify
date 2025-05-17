import React from 'react'

import { Flex, CircularProgress, CircularProgressLabel, Text, Box, VStack } from '@chakra-ui/react'
import Metrics from './Metrics.jsx'
import Colors from '../utils/Colors';


const SkinLabAnalysis = ({ luminosity, clarity, vibrancy, overall }) => {

    const colors = Colors();

    return (
        <Box>
            <Flex direction="row" justify='flex-start' color={colors.TEXT1}>
                <Text flex="1" p={30} fontSize={18} >
                    <b>Skin Analysis Result:</b> Likely Combination to Oily Skin, showing visible redness, uneven texture, and signs of acne or sun damage, including hyperpigmentation and irritation.
                    <br /> <br />
                    🚀 Your Skin Can Improve!
                    <br /><br />
                    Luminosity: {luminosity}% because (detailed description)<br />
                    Clarity: {clarity}% because (detailed description)<br />
                    Vibrancy: {vibrancy}% because (detailed description)<br />
                </Text>
                <Metrics luminosity={luminosity} clarity={clarity} vibrancy={vibrancy} overall={overall} />
            </Flex>

        </Box>
    )
}

export default SkinLabAnalysis