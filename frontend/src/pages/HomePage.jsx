import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Flex, Text, Button } from '@chakra-ui/react'
import { checkLogin } from '../API/API'

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginData = async () => {
      const user = await checkLogin();
      if (!user) {
        //redirect to /welcome (to /signup for now)
        navigate('/signup');
      }
    }
    fetchLoginData();
  });

  const handleLogoutClick = () => {
    console.log('logout clicked');
  }

  return (
    <Flex width={"100%"}>
      <Text>
        Home Page
      </Text>
      <Button onClick={handleLogoutClick}>
        Logout
      </Button>
    </Flex>
  )
}

export default HomePage