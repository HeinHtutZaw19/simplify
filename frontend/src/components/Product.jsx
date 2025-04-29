import React from 'react'
import { Box, Checkbox, Image, Text, Tooltip } from '@chakra-ui/react'
import toner from '../assets/toner.png';
import serum from '../assets/serum.png';
import moisturizer from '../assets/moisturizer.png';
import sunscreen from '../assets/sunscreen.png';

const imageMap = {
    Toner: toner,
    Serum: serum,
    Moisturizer: moisturizer,
    Sunscreen: sunscreen,
};

const instructionMap = {
    Toner: "After cleansing, apply toner to balance your skin's pH and prepare it for better absorption of subsequent products. Use a cotton pad or your hands to gently pat the toner onto your face.",
    Serum: "Apply serum after toner to address specific skin concerns with concentrated active ingredients. Gently press a few drops into your skin, allowing it to absorb fully before proceeding.",
    Moisturizer: "Following serum application, use moisturizer to hydrate your skin and lock in moisture. Choose a formula suitable for your skin type and apply it evenly over your face and neck.",
    Sunscreen: "In the morning, finish your routine with a broad-spectrum sunscreen of SPF 30 or higher to protect against UV damage. Apply generously to all exposed areas and reapply every two hours when outdoors."
};


const Product = ({ item }) => {
    return (
        <Tooltip label={instructionMap[item]} hasArrow placement="top">
            <Box className="home-routine-box" key={item} borderRadius="lg" transition="transform 0.2s ease-in-out"
                _hover={{
                    transform: 'scale(1.1)',
                }}>
                <Checkbox className="home-routine-checkbox" value={item} size="lg">
                    <Text color="white">{item}</Text>
                </Checkbox>
                <Image className="home-routine-image" src={imageMap[item]} alt={item}></Image>
            </Box>
        </Tooltip>
    )
}

export default Product