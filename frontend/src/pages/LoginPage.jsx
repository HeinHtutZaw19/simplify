import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Input, Button, Flex, Heading, Divider, Text } from '@chakra-ui/react'
import { FaGoogle } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';
import { loginUser } from '../API/API';
import { checkLogin } from '../API/API';

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoginData = async () => {
            const user = await checkLogin();
            if (user) {
                navigate('/');
            }
        }
        fetchLoginData();
    });

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
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

        // reset error messages
        setLoginInfo((state) => ({
            ...state,
            emailError: '',
            passwordError: '',
        }));

        // validate email format
        // <string>@<string>.<string>
        const validEmail = loginInfo.email.toLowerCase().match(/^\S+@\S+\.\S+$/);
        if (!validEmail) {
            console.log('Invalid email');
            setLoginInfo((state) => ({
                ...state,
                emailError: 'Invalid email'
            }));
            return;
        }
        const res = await loginUser({
            'email': loginInfo.email,
            'password': loginInfo.password
        });
        if ('emailNotFound' in res) {
            setLoginInfo((state) => ({
                ...state,
                emailError: 'Email not found'
            }));
            return;
        }
        if ('passwordIncorrect' in res) {
            setLoginInfo((state) => ({
                ...state,
                passwordError: 'Password incorrect'
            }));
            return;
        }
        if (res._id) {
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
                <Input placeholder='Email'
                    name='email'
                    value={loginInfo.email}
                    onChange={handleChange}
                    w="30vw"
                    mt={3}
                    rounded={10}
                    backgroundColor="#E3EDF9"
                    isInvalid={(loginInfo.email.toLowerCase().match(/^\S+@\S+\.\S+$/) || !loginInfo.email ? false : true)}
                />
                {loginInfo.emailError &&
                    <Text
                        w="30vw"
                        mt={1}
                        textAlign="left"
                        px={2}
                        fontSize="sm"
                        color="red.500"
                        fontWeight="bold"
                    >
                        {loginInfo.emailError}
                    </Text>
                }
                <Input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={loginInfo.password}
                    onChange={handleChange}
                    w="30vw"
                    mt={3}
                    rounded={10}
                    backgroundColor="#E3EDF9"
                />
                {loginInfo.passwordError &&
                    <Text
                        w="30vw"
                        mt={1}
                        textAlign="left"
                        px={2}
                        fontSize="sm"
                        color="red.500"
                        fontWeight="bold"
                    >
                        {loginInfo.passwordError}
                    </Text>
                }
                <Button onClick={onLoginClick} w="30vw" mt={3} colorScheme="blue" rounded={10}>Log in</Button>
                <Divider w="30vw" m={6} borderColor="gray.800" />
                <Button onClick={onGoogleClick} width="100%" colorScheme="blue" w="30vw" rounded={10} leftIcon={<FaGoogle />}>Google</Button>
            </Flex>
        </Box>
    )
}

export default LoginPage;