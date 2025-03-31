import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Flex, Text } from '@chakra-ui/react'
import { checkLogin } from '../API/API'

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginData = async () => {
      const user = await checkLogin();
      if (!user) {
        //redirect to /welcome (for /signup for now)
        navigate('/signup');
      }
    }
    fetchLoginData();
  });
  return (
    <Flex width={"100%"}>
      <Text>
        Home Page
      </Text>
    </Flex>
  )
}

export default HomePage