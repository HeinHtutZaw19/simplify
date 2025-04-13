import { Box, Input, Button, Flex, Heading, Divider } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';
import { loginUser } from '../API/API';

const LoginPage = () => {
    const navigate = useNavigate();

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

        // prevent login if an input is empty
        if (!loginInfo.email || !loginInfo.password) {
            console.log('All input fields must not be blank');
            return;
        }

        // validate email format
        // <string>@<string>.<string>
        const validEmail = loginInfo.email.toLowerCase().match(/^\S+@\S+\.\S+$/);
        if (!validEmail) {
            console.log('Invalid email');
            return;
        }

        const res = await loginUser({
            'email': loginInfo.email,
            'password': loginInfo.password
        });
        if (res) {
            navigate('/');
        }
    }

    const onGoogleClick = async () => {
        console.log('google clicked')
    }

    const handleCloseClick = async () => {
        console.log('close clicked');
        navigate('/welcome');
    }

    return (
        <Box w='100%' p={20}>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignContent='center'>
                <Button bgColor='transparent' onClick={handleCloseClick}><CloseIcon boxSize={5} /></Button>
            </Box>
            <Flex flex="1" direction="column" alignItems="center" pt={50}>
                <Heading mb={5}> Login </Heading>
                <Input placeholder='Email' name='email' value={loginInfo.email} onChange={handleChange} w="40vw" mt={3} rounded={10} backgroundColor="#E3EDF9" />
                <Input type='password' placeholder='Password' name='password' value={loginInfo.password} onChange={handleChange} w="40vw" mt={3} rounded={10} backgroundColor="#E3EDF9" />
                <Button onClick={onLoginClick} w="40vw" mt={3} colorScheme="blue" rounded={10}>Log in</Button>
                <Divider w="40vw" m={6} borderColor="gray.800" />
                <Button onClick={onGoogleClick} width="100%" colorScheme="blue" w="40vw" rounded={10} leftIcon={<FaGoogle />}>Google</Button>
            </Flex>
        </Box>
    )
}

export default LoginPage;