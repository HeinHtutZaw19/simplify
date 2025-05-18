import { signupUser } from '../API/API'
import { Input, Button, Flex, Heading, Box, Text } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { checkLogin } from '../API/API'
import { CloseIcon } from '@chakra-ui/icons';
import Colors from '../utils/Colors.jsx';


const SignupPage = () => {
    const colors = Colors();
    const navigate = useNavigate();
    const location = useLocation();
    const usernameInputRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const recommendation = location.state?.recommendation;
    const rawRoutine = location.state?.routine;
    const routine = eval(`(${rawRoutine})`); // array of 4 products {name, description(=>supposed to be instruction), price, imageUrl}
    const imageUrl = location.state?.imageUrl;

    useEffect(() => {
        const fetchLoginData = async () => {
            const user = await checkLogin();
            if (user) {
                navigate('/');
            }
            else {
                setLoaded(true);
                setTimeout(() => {
                    usernameInputRef.current?.focus();
                }, 0);
            }
        }
        fetchLoginData();
        console.log('summary:', recommendation, 'routine:', routine, ', image:', imageUrl);
        if (!recommendation || !routine || !imageUrl) {
            console.log('no survey data, navigating to /survey');
            navigate('/survey');
        }
    }, []);

    const [signupInfo, setSignupInfo] = useState({
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordConfirm: '', // TODO: later we need to add other properties (like the survey answers) when doing signup
    })
    const usernameRegex = /^[0-9A-Za-z]{3,16}$/;
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
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

        // reset error messages
        setSignupInfo((state) => ({
            ...state,
            usernameError: '',
            emailError: ''
        }));

        // validate username
        const validUsername = signupInfo.username.match(usernameRegex);
        if (!validUsername) {
            console.log('Invalid username');
            setSignupInfo((state) => ({
                ...state,
                usernameError: 'Username must be 3-16 characters long, and only contain letters and numbers'
            }));
            return;
        }

        // validate email format
        const validEmail = signupInfo.email.match(emailRegex);
        if (!validEmail) {
            console.log('Invalid email');
            setSignupInfo((state) => ({
                ...state,
                emailError: 'Invalid email'
            }));
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
            'password': signupInfo.password,
            'routine': routine
        });
        if ('usernameTaken' in res) {
            setSignupInfo((state) => ({
                ...state,
                usernameError: 'Username taken'
            }));
            return;
        }
        if ('emailTaken' in res) {
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
        <> {loaded &&
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
                        onKeyDown={e => { if (e.key === 'Enter') onSignupClick(); }}
                        w="30vw"
                        mt={3}
                        rounded={10}
                        backgroundColor={colors.MAIN2}
                        ref={usernameInputRef}
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
                        onKeyDown={e => { if (e.key === 'Enter') onSignupClick(); }}
                        w="30vw"
                        mt={3}
                        rounded={10}
                        backgroundColor={colors.MAIN2}
                        isInvalid={((signupInfo.email.match(emailRegex) || !signupInfo.email) && !signupInfo.emailError ? false : 'true')}
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
                        onKeyDown={e => { if (e.key === 'Enter') onSignupClick(); }}
                        w="30vw"
                        mt={3}
                        rounded={10}
                        backgroundColor={colors.MAIN2}
                        isInvalid={(passwordRequirements.test(signupInfo.password) || !signupInfo.password ? false : true)}
                    />
                    <Input
                        type='password'
                        placeholder='Confirm Password'
                        name='passwordConfirm'
                        value={signupInfo.passwordConfirm}
                        onChange={handleChange}
                        onKeyDown={e => { if (e.key === 'Enter') onSignupClick(); }}
                        w="30vw"
                        mt={3}
                        rounded={10}
                        backgroundColor={colors.MAIN2}
                        isInvalid={(signupInfo.password == signupInfo.passwordConfirm || !signupInfo.passwordConfirm ? false : true)}
                    />
                    <span style={{ display: 'block', width: '30vw', fontSize: '13px', marginTop: '3px', padding: '0 10px 0 10px', color: (passwordRequirements.test(signupInfo.password) || !signupInfo.password ? colors.TEXT1 : '#E53E3E') }}>
                        Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and symbols.
                    </span>
                    <Button onClick={onSignupClick} w="20vw" mt={8} bg={colors.BRIGHT3} color={colors.MAIN1} _hover={{ bg: colors.BRIGHT5 }} rounded={12}>Sign Up</Button>
                </Flex>
            </Box>}
        </>

    )
}

export default SignupPage;