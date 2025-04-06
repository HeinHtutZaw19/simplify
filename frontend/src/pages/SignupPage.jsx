import { signupUser } from '../API/API'
import { Input, Button, Flex, Heading } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { checkLogin } from '../API/API'

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
        // const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+={}[\]:;"'<>,.?/~`|\\])[A-Za-z\d@$!%*?&^#()_\-+={}[\]:;"'<>,.?/~`|\\]{8,}$/;
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

    return (
        <Flex flex="1" direction="column" alignItems="center" px={525} pt={140}>
            <Heading mb={5}>
                Get Started!
            </Heading>
            <Input placeholder='Username' name='username' value={signupInfo.username} onChange={handleChange} mt={3} rounded={10} backgroundColor="#E3EDF9" />
            <Input placeholder='Email' name='email' value={signupInfo.email} onChange={handleChange} mt={3} rounded={10} backgroundColor="#E3EDF9" />
            <Input type='password' placeholder='Password' name='password' value={signupInfo.password} onChange={handleChange} mt={3} rounded={10} backgroundColor="#E3EDF9" />
            <Input type='password' placeholder='Confirm Password' name='passwordConfirm' value={signupInfo.passwordConfirm} onChange={handleChange} mt={3} rounded={10} backgroundColor="#E3EDF9" />
            <span style={{ display: 'block', fontSize: '13px', marginTop:'3px', padding:'0 10px 0 10px' }}>
                Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and symbols.
            </span>
            <Button onClick={onSignupClick} mt={8} width="200px" colorScheme="blue" rounded={12}>Sign Up</Button>
        </Flex>
    )
}

export default SignupPage;