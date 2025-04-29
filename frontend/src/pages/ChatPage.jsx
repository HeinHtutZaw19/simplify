import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Input,
  Button,
  HStack,
  Text
} from "@chakra-ui/react";
import { TbSend } from "react-icons/tb";
import { checkLogin, chat } from "../API/API";
import Message from "../components/Message";
import LoadingBubble from "../components/LoadingBubble";

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    const fetchLoginData = async () => {
      const user = await checkLogin();
      if (!user) {
        navigate('/welcome');
      }
    };
    fetchLoginData();
  }, []); // only on mount

  useEffect(() => {
    // scroll to bottom whenever messages or loading change
    const chatBox = document.querySelector("#chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // initial dummy messages...
  useEffect(() => {
    setMessages([
      { text: "I want to know more about Trouble Reset Cicaffeine Foam", sender: "You" },
      { text: "Trouble Reset Cicaffeine Foam Summary…", sender: "Simpli" }
    ]);
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;
    setMessages(prev => [...prev, { text: input, sender: 'You' }]);
    setInput("");
    setLoading(true);

    const history = messages.map(msg => msg.text);
    const reply = await chat(input, history);

    setLoading(false);
    setMessages(prev => [...prev, { text: reply, sender: 'Simpli' }]);
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
          {messages.map((message, idx) => (
            <Message
              key={idx}
              text={message.text}
              isUser={message.sender === "You"}
            />
          ))}
          {loading && <LoadingBubble isUser={false} />}
          <div ref={bottomRef} />
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

      <Flex p={4} alignItems="center" justifyContent="center">
        <Text fontSize={{ base: "xs", md: "sm" }} color="black.500">
          Simpli Chat can make mistakes. Please double-check your information!
        </Text>
      </Flex>
    </Flex>
  );
};

export default ChatPage;
