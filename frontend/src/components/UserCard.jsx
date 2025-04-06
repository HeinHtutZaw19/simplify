import React from 'react'
import { Flex, Box, Text, Avatar } from '@chakra-ui/react'
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";

const UserCard = ({ user, index }) => {
    return (
        <Flex
            key={user.id}
            width="80%"
            bg={user.name === "Henry" ? "#9D81F5" : "gray.50"}
            borderRadius="md"
            p={1}
            boxShadow="sm"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <Avatar name={user.name} size="sm" />
            <Text flex={1} px={30}>{user.name}</Text>
            <Box
                w="30px"
                h="30px"
                borderRadius="full"
                border="1px solid"
                borderColor="gray.400"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="sm"
            >
                {user.id}
            </Box>
            <Text fontWeight="bold" px={10} flex={0.1}>{user.points}</Text>
            {user.trend === "up" ? (
                <PiArrowFatUpFill color="green" />
            ) : (
                <PiArrowFatDownFill color="red" />
            )}
        </Flex>
    )
}

export default UserCard