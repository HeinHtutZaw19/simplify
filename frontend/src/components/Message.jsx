import React from "react";
import { Box, HStack, Text, Avatar, VStack } from "@chakra-ui/react";

const Message = ({ index, text, isUser }) => {
    return (
        <HStack
            key={index}
            alignSelf={isUser ? "flex-end" : "flex-start"}
            maxW="50%"
            wordBreak="break-word"
            spacing={4}
        >
            {!isUser && (
                <Avatar
                    name="Simpli"
                    src="../assets/Simpli.jpg"
                    size="sm"
                />
            )}
            <Box
                bg={isUser ? "#CCE0F2" : "#5A6ACF"}
                color={isUser ? "black" : "white"}
                px={4}
                py={2}
                borderRadius="md"
                maxW="100%"
                wordBreak="break-word"
            >
                <Text>{text}</Text>
            </Box>
            {isUser && <Avatar size="sm" />}
        </HStack>
    );
};

export default Message;