import { Input, Button, Flex, Heading, Divider } from '@chakra-ui/react'
import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((state) => ({
            ...state,
            [name]: value
        }));
    };

    const onLoginClick = async () => {
        console.log('login clicked')
    }

    const onGoogleClick = async () => {
        console.log('google clicked')
    }

    return (
        <Flex flex="1" direction="column" alignItems="center" px={525} pt={140}>
            <Heading mb={5}> Login </Heading>
            <Input placeholder='Email' name='email' value={loginInfo.email} onChange={handleChange} mt={3} rounded={10} backgroundColor="#E3EDF9" />
            <Input type='password' placeholder='Password' name='password' value={loginInfo.password} onChange={handleChange} mt={3} rounded={10} backgroundColor="#E3EDF9" />
            <Button onClick={onLoginClick} mt={3} width="100%" colorScheme="blue" rounded={10}>Log in</Button>
            <Divider m={6} borderColor="gray.800" />
            <Button onClick={onGoogleClick} width="100%" colorScheme="blue" rounded={10} leftIcon={<FaGoogle/>}>Google</Button>
        </Flex>
    )
}

export default LoginPage;