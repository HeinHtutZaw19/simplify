import React from "react";
import { Box, HStack, Text, Avatar, VStack } from "@chakra-ui/react";
import Simpli from "../assets/Simpli.jpg";
import ReactMarkdown from 'react-markdown'

const Message = ({ index, text, isUser }) => {
    return (
        <HStack
            key={index}
            alignSelf={isUser ? "flex-end" : "flex-start"}
            maxW={{ base: "80%", md: "70%", lg: "50%" }}
            wordBreak="break-word"
            spacing={4}
        >
            {!isUser && (
                <Avatar
                    name="Simpli"
                    src={Simpli}
                    size="sm"
                />
            )}
            <Box
                bg={isUser ? "#CCE0F2" : "#5A6ACF"}
                color={isUser ? "black" : "white"}
                px={8}
                py={2}
                borderRadius="md"
                maxW="100%"
                wordBreak="break-word"

            >
                <Text fontSize={{ base: "xs", md: "sm" }}>
                    <ReactMarkdown>{text}</ReactMarkdown>
                </Text>
            </Box>
            {isUser && <Avatar size="sm" />}
        </HStack>
    );
};

export default Message;