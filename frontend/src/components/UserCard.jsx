import { Flex, Text, Avatar } from '@chakra-ui/react';
import Colors from '../utils/Colors';

const UserCard = ({ user, name }) => {
    const colors = Colors();
    return (
        <Flex
            key={user.id}
            width={{ base: "100%", sm: "90%", md: "80%" }}
            bg={user.username === name ? colors.BRIGHT2 : colors.MAIN1}
            borderRadius="md"
            p={3}
            boxShadow="sm"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={4}
        >
            <Avatar size="sm" src={user.pfp} shadow="md" />

            <Text
                flex={1}
                px={{ base: 2, sm: 4, md: 6 }}
                textAlign={{ base: "center", sm: "left" }}
                fontSize={{ base: "2xs", md: "xs" }}
                color={colors.TEXT1}
            >
                {user.username}
            </Text>

            <Text
                fontWeight="bold"
                px={{ base: 4, sm: 10 }}
                flex={1}
                fontSize={{ base: "2xs", md: "xs" }}
                color={colors.TEXT1}
            >
                {user.point}
            </Text>
        </Flex>
    );
};

export default UserCard;
