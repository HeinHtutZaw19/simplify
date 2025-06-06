import React from "react";
import { Box, HStack, Text, Avatar, VStack } from "@chakra-ui/react";
import Simpli from "../assets/Simpli.jpg";
import ReactMarkdown from 'react-markdown';
import Colors from "../utils/Colors";

const Message = ({ index, text, isUser, user }) => {

    const colors = Colors();

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
                    shadow="md"
                />
            )}
            <Box
                bg={isUser ? colors.USERBG : colors.SIMPLIBG}
                color= {colors.CHATTEXT}
                px={8}
                py={2}
                borderRadius="md"
                maxW="100%"
                wordBreak="break-word"

            >
                <Box fontSize={{ base: "xs", md: "sm" } }>
                    <ReactMarkdown>{text}</ReactMarkdown>
                </Box>
            </Box>
            {isUser && <Avatar size="sm" src={user.pfp} shadow="md" />}
        </HStack>
    );
};

export default Message;