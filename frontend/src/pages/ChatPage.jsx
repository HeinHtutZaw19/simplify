import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Input, Button, Wrap, HStack, Text, WrapItem } from "@chakra-ui/react";
import { TbSend } from "react-icons/tb";
import { checkLogin } from "../API/API";
import Message from "../components/Message";

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchLoginData = async () => {
      const user = await checkLogin();
      if (!user) {
        navigate('/welcome');
      }
    }
    const chatBox = document.querySelector("#chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;
    fetchLoginData();
  }, [messages]);

  useEffect(() => {
    //make dummy messages
    const dummyMessages = [
      { text: "I'm Simplifi, your skincare AI assistant! How can I help?", sender: "Simpli" },
      { text: "I want to know more about trouble reset cicaffeine foam", sender: "You" },
      {
        text: "Trouble Reset Cicaffeine Foam Summary\n\nProduct Name: Trouble Reset Cicaffeine Foam\nBrand: Simpli\n\nProduct Description:\nA gentle cleansing foam that helps to remove impurities and dead skin cells while maintaining the skin's natural pH balance. It is formulated with Cicaffeine™, a unique blend of Beta-Sitosterol and Caffeine, to help calm and revitalize the skin while enhancing elasticity and pore care.",
        sender: "Simpli"
      }];
    setMessages(dummyMessages);
  }, []);

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Flex direction="column" h="100%" w="100%" p={4} bg="blackAlpha.100">
      <Box
        flex="1"
        bg="white"
        borderRadius="md"
        boxShadow="md"
        overflowY="auto"
        id="chat-box"
        p={4}
      >
        <Flex direction="column" gap={4}>
          {messages.map((message, index) => (
            <Message
              key={index}
              index={index}
              text={message.text}
              isUser={message.sender === "You"}
            />
          ))}
        </Flex>
      </Box>

      <HStack w="100%" mt={4}>
        <Input
          flex="1"
          placeholder="Ask Anything You Want About Skincare!"
          value={input}
          fontSize={{ base: "xs", md: "sm" }}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button bg="bg.subtle" variant="outline" onClick={handleSend}>
          <TbSend />
        </Button>
      </HStack>

      <Flex
        p={4}
        alignItems="center"
        justifyContent="center">
        <Text fontSize={{ base: "xs", md: "sm" }} color="black.500">
          Simpli Chat can make mistakes. Please double-check your information!
        </Text>
      </Flex>
    </Flex>
  );


};

export default ChatPage;