import { Box, Flex, Avatar, Text, Badge, Icon } from "@chakra-ui/react"
import { FaCrown } from "react-icons/fa"

const LeaderboardPodium = ({ first, second, third }) => {
    return (
        <Flex justify="center" align="end" gap={4}>

            {console.log("LeaderboardPodium", { first, second, third })}
            <Box
                bg="gray.800"
                p={4}
                pt={12}
                pb={6}
                borderRadius="2xl"
                textAlign="center"
                position="relative"
                w="120px"
                h="180px"
            >
                <Avatar
                    size="xl"
                    name={second.name}
                    src={second.image}
                    border="4px solid pink"
                    position="absolute"
                    top="-70px"
                    left="50%"
                    transform="translateX(-50%)"
                />
                <Badge
                    position="absolute"
                    top="30px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="pink.500"
                    color="white"
                    borderRadius="full"
                    px={2}
                >
                    2
                </Badge>
                <Text mt={8} fontWeight="medium" color="white">
                    {second.name}
                </Text>
                <Text fontWeight="bold" fontSize="xl" color="pink.400">
                    {second.points}
                </Text>
            </Box>

            {/* 1st Place */}
            <Box
                bg="gray.900"
                p={4}
                pt={14}
                pb={6}
                borderRadius="2xl"
                textAlign="center"
                position="relative"
                w="140px"
                h="220px"
            >
                <Avatar
                    size="xl"
                    name={first.name}
                    src={first.image}
                    border="4px solid green"
                    position="absolute"
                    top="-60px"
                    left="50%"
                    transform="translateX(-50%)"
                />
                <Icon
                    as={FaCrown}
                    color="yellow.400"
                    position="absolute"
                    top="-90px"
                    left="50%"
                    transform="translateX(-50%)"
                    boxSize={6}
                />
                <Badge
                    position="absolute"
                    top="40px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="green.500"
                    color="white"
                    borderRadius="full"
                    px={2}
                >
                    1
                </Badge>
                <Text mt={10} fontWeight="medium" color="white">
                    {first.name}
                </Text>
                <Text fontWeight="bold" fontSize="2xl" color="green.300">
                    {first.points}
                </Text>
            </Box>

            {/* 3rd Place */}
            <Box
                bg="gray.800"
                p={4}
                pt={12}
                pb={6}
                borderRadius="2xl"
                textAlign="center"
                position="relative"
                w="120px"
                h="160px"
            >
                <Avatar
                    size="xl"
                    name={third.name}
                    src={third.image}
                    border="4px solid orange"
                    position="absolute"
                    top="-70px"
                    left="50%"
                    transform="translateX(-50%)"
                />
                <Badge
                    position="absolute"
                    top="30px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="orange.500"
                    color="white"
                    borderRadius="full"
                    px={2}
                >
                    3
                </Badge>
                <Text mt={8} fontWeight="medium" color="white">
                    {third.name}
                </Text>
                <Text fontWeight="bold" fontSize="xl" color="orange.400">
                    {third.points}
                </Text>
            </Box>
        </Flex>
    )
}

export default LeaderboardPodium
