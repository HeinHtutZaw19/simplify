import { signupUser } from '../API/API'
import { Input, Button, Flex, Heading, Box } from '@chakra-ui/react'
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
        email: '',
        password: '',
        passwordConfirm: '', // TODO: later we need to add other properties (like the survey answers) when doing signup
    })

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
        // TEMP: disabled password requirements for development (it was annoying)
        const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+={}[\]:;"'<>,.?/~`|\\])[A-Za-z\d@$!%*?&^#()_\-+={}[\]:;"'<>,.?/~`|\\]{8,}$/;
        // if (!passwordRequirements.test(signupInfo.password)) {
        //     console.log('Password requirements not met');
        //     return;
        // }

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
        if (res) {
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
                <Input placeholder='Username' name='username' value={signupInfo.username} onChange={handleChange} w="40vw" mt={3} rounded={10} backgroundColor="#E3EDF9" />
                <Input placeholder='Email' name='email' value={signupInfo.email} onChange={handleChange} w="40vw" mt={3} rounded={10} backgroundColor="#E3EDF9" />
                <Input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={signupInfo.password}
                    onChange={handleChange}
                    w="40vw"
                    mt={3}
                    rounded={10}
                    backgroundColor="#E3EDF9"
                />
                <Input
                    type='password'
                    placeholder='Confirm Password'
                    name='passwordConfirm'
                    value={signupInfo.passwordConfirm}
                    onChange={handleChange}
                    w="40vw"
                    mt={3}
                    rounded={10}
                    backgroundColor="#E3EDF9"
                    style={{ border: (signupInfo.password == signupInfo.passwordConfirm ? '' : '2px solid red') }}
                />
                <span style={{ display: 'block', width:'40vw', fontSize: '13px', marginTop: '3px', padding: '0 10px 0 10px' }}>
                    Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and symbols.
                </span>
                <Button onClick={onSignupClick} w="25vw" mt={8} colorScheme="blue" rounded={12}>Sign Up</Button>
            </Flex>
        </Box>
    )
}

export default SignupPage;