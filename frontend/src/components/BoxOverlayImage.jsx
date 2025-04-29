import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';

const BoxOverlayImage = ({ boxes, img }) => {
    return (
        <Flex id="skinlab-image-div">
            <Image src={img} width="100%" height="auto" flexShrink={0} border="15px solid" rounded="15px" borderColor="blue.200" />
            {boxes.map((box, index) => (
                <Box
                    key={index}
                    position="absolute"
                    top={`${box.y}%`}
                    left={`${box.x}%`}
                    width="30px"
                    height="30px"
                    borderRadius="50%"
                    backgroundColor={box.color}
                    opacity={0.5}
                />
            ))}
        </Flex>
    );
};

export default BoxOverlayImage;
