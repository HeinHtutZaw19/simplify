import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { checkLogin, logoutUser } from '../API/API'


import {Flex, Text, Button} from '@chakra-ui/react'

const SettingsPage = () => {

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

  const handleLogoutClick = async () => {
    console.log('logout clicked');
    const res = logoutUser();
    if (res) {
      navigate('/signup');
    }
  }
  return (
    <Flex width={"100%"}>
        <Text>
            Settings Page
        </Text>
        <Button onClick={handleLogoutClick}>
          Logout
        </Button>
    </Flex>
  )
}

export default SettingsPage