import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { Box, Flex, Input, Button, HStack, Text, Spacer } from "@chakra-ui/react";
import { TbSend } from "react-icons/tb";
import { checkLogin, chat, getChatList, deleteChat } from "../API/API";
import Message from "../components/Message";
import Colors from '../utils/Colors';
import LoadingBubble from "../components/LoadingBubble";
import { DeleteIcon } from "@chakra-ui/icons";

const ChatPage = ({ user }) => {
  const colors = Colors();
  // const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); // for loading entire page
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // for loading text bubbles
  // const bottomRef = useRef();
  const inputRef = useRef();

  //make dummy messages
  const dummyMessages = [
    { text: "I'm Simpli, your skincare AI assistant! How can I help?", sender: "Simpli" },
  ];

  useEffect(() => {
    if (loaded) {
      // scroll to bottom whenever messages or loading change
      const chatBox = document.querySelector("#chat-box");
      chatBox.scrollTop = chatBox.scrollHeight;
      // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (loaded) {
      inputRef.current?.focus();
    }
  }, [loaded]);

  useEffect(() => {
    // load user's chat list
    const setChatHistory = async (username) => {
      const chatList = await getChatList(username);
      setMessages([...dummyMessages, ...chatList]);
    }
    setChatHistory(user.username);
  }, [user]);

  useEffect(() => {
    setMessages(dummyMessages);
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;
    setMessages(prev => [...prev, { text: input, sender: 'You' }]);
    setInput("");
    setLoading(true);
    const history = messages.map(msg => msg.text);
    const reply = await chat(user.username, input, history);
    setLoading(false);
    // console.log(reply)
    setMessages(prev => [...prev, { text: reply, sender: 'Simpli' }]);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Flex direction="column" h="100%" w="100%" p={4} bg={colors.MAIN2}>
      <Box
        flex="1"
        bg={colors.MAIN1}
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
              user={user}
            />
          ))}
          {loading && <LoadingBubble isUser={false} />}
          {/* <div ref={bottomRef} /> */}
        </Flex>
      </Box>

      <HStack w="100%" mt={4}>
        <Input
          borderColor={colors.SECONDARY1}
          flex="1"
          placeholder="Ask Anything You Want About Skincare!"
          value={input}
          fontSize={{ base: "xs", md: "sm" }}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          ref={inputRef}
        />
        <Button bg="bg.subtle" variant="outline" borderColor={colors.SECONDARY1} onClick={handleSend}>
          <TbSend />
        </Button>
      </HStack>

      <Flex p={4} alignItems="center">
        <Spacer />
        <Text fontSize={{ base: "xs", md: "sm" }} color={colors.TEXT1}>
          Simpli Chat can make mistakes. Please double-check your information!
        </Text>
        <Spacer />
        <Button
          leftIcon={<DeleteIcon />}
          colorScheme="red"
          variant="ghost"
          ml={4}
          _hover={{
            color: "red.600",
            transform: "scale(1.3)",
          }}
          onClick={() => { deleteChat(user.username); setMessages([]); }}
        >
        </Button>
      </Flex>
    </Flex>
  );
};

export default ChatPage;
