// src/components/LoadingBubble.jsx
import { HStack, Box, Avatar } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Simpli from "../assets/Simpli.jpg";

const dotBounce = keyframes`
  0%, 80%, 100% { transform: translateY(0) }
  40% { transform: translateY(-6px) }
`;

export default function LoadingBubble({ isUser }) {
    return (
        <HStack justify={isUser ? "flex-end" : "flex-start"} pb={2}>
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
                px={3}
                py={2}
                borderRadius="xl"
                maxW="60%"
            >
                <HStack spacing={1}>
                    {[0, 1, 2].map((i) => (
                        <Box
                            key={i}
                            w="8px"
                            h="8px"
                            bg={"white"}
                            borderRadius="50%"
                            animation={`${dotBounce} 1.4s ease-in-out infinite ${i * 0.2}s`}
                        />
                    ))}
                </HStack>
            </Box>
        </HStack>
    );
}
