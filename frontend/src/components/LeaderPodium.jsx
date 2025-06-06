import { Box, Flex, Avatar, Text, Badge, Icon } from "@chakra-ui/react"
import { FaCrown } from "react-icons/fa"

const LeaderboardPodium = ({ first, second, third }) => {
    return (
        <Flex justify="center" align="end" gap={{ base: 2, md: 4 }} pt={20}>
            {/* 2nd Place */}
            <Box
                bg="gray.800"
                p={4}
                pt={{ base: 10, md: 12 }}
                pb={{ base: 4, md: 6 }}
                borderRadius="2xl"
                textAlign="center"
                position="relative"
                w={{ base: "80px", md: "100px", lg: "120px" }}
                h={{ base: "140px", md: "160px", lg: "180px" }}
            >
                <Avatar
                    size="lg"
                    name={second.username}
                    src={second.pfp}
                    border="4px solid pink"
                    position="absolute"
                    top="-50px"
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
                    fontSize={{ base: "xs", md: "sm" }}
                >
                    2nd
                </Badge>
                <Text mt={8} fontWeight="medium" fontSize={{ base: "sm", md: "md" }} color="white">
                    {second.username}
                </Text>
                <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} color="pink.400">
                    {second.point}
                </Text>
            </Box>

            {/* 1st Place */}
            <Box
                bg="gray.900"
                p={4}
                pt={{ base: 12, md: 14 }}
                pb={{ base: 4, md: 6 }}
                borderRadius="2xl"
                textAlign="center"
                position="relative"
                w={{ base: "100px", md: "120px", lg: "140px" }}
                h={{ base: "180px", md: "200px", lg: "220px" }}
            >
                <Avatar
                    size="lg"
                    name={first.username}
                    src={first.pfp}
                    border="4px solid green"
                    position="absolute"
                    top="-50px"
                    left="50%"
                    transform="translateX(-50%)"
                />
                <Icon
                    as={FaCrown}
                    color="yellow.400"
                    position="absolute"
                    top={{ base: "-70px", md: "-75px" }}
                    left="50%"
                    transform="translateX(-50%)"
                    boxSize={{ base: 4, md: 6 }}
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
                    fontSize={{ base: "xs", md: "sm" }}
                >
                    1st
                </Badge>
                <Text mt={10} fontWeight="medium" fontSize={{ base: "xs", md: "sm" }} color="white">
                    {first.username}
                </Text>
                <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} color="green.300">
                    {first.point}
                </Text>
            </Box>

            {/* 3rd Place */}
            <Box
                bg="gray.800"
                p={4}
                pt={{ base: 10, md: 12 }}
                pb={{ base: 4, md: 6 }}
                borderRadius="2xl"
                textAlign="center"
                position="relative"
                w={{ base: "80px", md: "100px", lg: "120px" }}
                h={{ base: "130px", md: "150px", lg: "160px" }}
            >
                <Avatar
                    size="lg"
                    name={third.username}
                    src={third.pfp}
                    border="4px solid orange"
                    position="absolute"
                    top="-50px"
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
                    fontSize={{ base: "xs", md: "sm" }}
                >
                    3rd
                </Badge>
                <Text mt={8} fontWeight="medium" fontSize={{ base: "xs", md: "sm" }} color="white">
                    {third.username}
                </Text>
                <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} color="orange.400">
                    {third.point}
                </Text>
            </Box>
        </Flex>
    )
}

export default LeaderboardPodium
