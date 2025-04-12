import React from 'react'
import { Text } from '@chakra-ui/react'

const PatchDetail = ({ color, description }) => {
    return (
        <Text bgColor={color} color="white" fontSize="xs" p={5} borderRadius={13} maxW="95%" textAlign="center">
            {description}
        </Text>
    )
}

export default PatchDetail