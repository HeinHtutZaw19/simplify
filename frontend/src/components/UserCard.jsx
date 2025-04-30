import React from 'react';
import { Flex, Box, Text, Avatar } from '@chakra-ui/react';
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";
import Colors from '../utils/Colors';

const UserCard = ({ user }) => {
    const colors = Colors();
    return (
        <Flex
            key={user.id}
            width={{ base: "100%", sm: "90%", md: "80%" }} // Adjust width based on screen size
            bg={user.name === "Henry" ? colors.BRIGHT2 : colors.MAIN1}
            borderRadius="md"
            p={3} // Increase padding for better spacing
            boxShadow="sm"
            flexDirection={{ base: "column", sm: "row" }} // Stack items vertically on smaller screens
            justifyContent="space-between"
            alignItems="center"
            gap={4} // Add spacing between items
        >
            {/* Avatar */}
            <Avatar name={user.name} size={{ base: "md", sm: "sm" }} />

            {/* User Name */}
            <Text
                flex={1}
                px={{ base: 2, sm: 4, md: 6 }}
                textAlign={{ base: "center", sm: "left" }} // Center text on smaller screens
                fontSize={{ base: "2xs", md: "xs" }}
                color={colors.TEXT1}
            >
                {user.name}
            </Text>

            {/* User ID */}
            <Box
                w={{ base: 40, sm: 30 }}
                h={{ base: 40, sm: 30 }}
                borderRadius="full"
                border="1px solid"
                borderColor={colors.TEXT4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={{ base: "2xs", sm: "xs" }}
            >
                {user.id}
            </Box>

            {/* Points */}
            <Text
                fontWeight="bold"
                px={{ base: 4, sm: 10 }}
                flex={1}
                fontSize={{ base: "2xs", md: "xs" }}
                color={colors.TEXT1}
            >
                {user.points}
            </Text>

            {/* Trend Icon */}
            {user.trend === "up" ? (
                <PiArrowFatUpFill color="green" size={20} />
            ) : (
                <PiArrowFatDownFill color="red" size={20} />
            )}
        </Flex>
    );
};

export default UserCard;
