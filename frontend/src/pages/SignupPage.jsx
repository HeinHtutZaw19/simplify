import { signupUser } from '../API/API'
import { Input, Button, Flex, Heading, Box, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { checkLogin } from '../API/API'
import { CloseIcon } from '@chakra-ui/icons';

const SignupPage = () => {
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

    const [signupInfo, setSignupInfo] = useState({
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordConfirm: '', // TODO: later we need to add other properties (like the survey answers) when doing signup
    })
    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+={}[\]:;"'<>,.?/~`|\\])[A-Za-z\d@$!%*?&^#()_\-+={}[\]:;"'<>,.?/~`|\\]{8,}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((state) => ({
            ...state,
            [name]: value
        }));
    };

    const onSignupClick = async () => {
        // prevent signup if an input is empty
        if (!signupInfo.username || !signupInfo.email || !signupInfo.password) {
            console.log('All input fields must not be blank');
            return;
        }

        // reset emailError
        setSignupInfo((state) => ({
            ...state,
            usernameError: '',
            emailError: ''
        }));

        // TODO make sure users don't type anything stupid in these fields (special characters)

        // validate email format
        // <string>@<string>.<string>
        const validEmail = signupInfo.email.toLowerCase().match(/^\S+@\S+\.\S+$/);
        if (!validEmail) {
            console.log('Invalid email');
            return;
        }

        // check password requirements
        // at least length 8, mix of lowercase,  uppercase, numbers, special chars
        if (!passwordRequirements.test(signupInfo.password)) {
            console.log('Password requirements not met');
            return;
        }

        // confirm password
        if (signupInfo.password !== signupInfo.passwordConfirm) {
            console.log('Password confirmation is wrong')
            return;
        }

        const res = await signupUser({
            'username': signupInfo.username,
            'email': signupInfo.email,
            'password': signupInfo.password
        });
        if (res.usernameTaken) {
            setSignupInfo((state) => ({
                ...state,
                usernameError: 'Username taken'
            }));
            return;
        }
        if (res.emailTaken) {
            setSignupInfo((state) => ({
                ...state,
                emailError: 'Email taken'
            }));
            return;
        }
        if (res._id) {
            navigate('/');
        }
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
                <Heading mb={5}>
                    Get Started!
                </Heading>
                <Input
                    placeholder='Username'
                    name='username'
                    value={signupInfo.username}
                    onChange={handleChange}
                    w="30vw"
                    mt={3}
                    rounded={10}
                    backgroundColor="#E3EDF9"
                />
                {signupInfo.usernameError &&
                    <Text
                        w="30vw"
                        mt={1}
                        textAlign="left"
                        px={2}
                        fontSize="sm"
                        color="red.500"
                        fontWeight="bold"
                    >
                        {signupInfo.usernameError}
                    </Text>
                }
                <Input
                    placeholder='Email'
                    name='email'
                    value={signupInfo.email}
                    onChange={handleChange}
                    w="30vw"
                    mt={3}
                    rounded={10}
                    backgroundColor="#E3EDF9"
                    isInvalid={((signupInfo.email.toLowerCase().match(/^\S+@\S+\.\S+$/) || !signupInfo.email) && !signupInfo.emailError ? false : 'true')}
                />
                {signupInfo.emailError &&
                    <Text
                        w="30vw"
                        mt={1}
                        textAlign="left"
                        px={2}
                        fontSize="sm"
                        color="red.500"
                        fontWeight="bold"
                    >
                        {signupInfo.emailError}
                    </Text>
                }
                <Input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={signupInfo.password}
                    onChange={handleChange}
                    w="30vw"
                    mt={3}
                    rounded={10}
                    backgroundColor="#E3EDF9"
                    isInvalid={(passwordRequirements.test(signupInfo.password) || !signupInfo.password ? false : true)}
                />
                <Input
                    type='password'
                    placeholder='Confirm Password'
                    name='passwordConfirm'
                    value={signupInfo.passwordConfirm}
                    onChange={handleChange}
                    w="30vw"
                    mt={3}
                    rounded={10}
                    backgroundColor="#E3EDF9"
                    isInvalid={(signupInfo.password == signupInfo.passwordConfirm || !signupInfo.passwordConfirm ? false : true)}
                />
                <span style={{ display: 'block', width: '30vw', fontSize: '13px', marginTop: '3px', padding: '0 10px 0 10px', color: (passwordRequirements.test(signupInfo.password) || !signupInfo.password ? 'black' : '#E53E3E') }}>
                    Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and symbols.
                </span>
                <Button onClick={onSignupClick} w="20vw" mt={8} colorScheme="blue" rounded={12}>Sign Up</Button>
            </Flex>
        </Box>
    )
}

export default SignupPage;