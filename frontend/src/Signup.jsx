import './App.css'
import signupUser from './API/API'
import { Input, Button } from '@chakra-ui/react'
import { useState } from 'react'

const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: '', // TODO: later we need to add other properties (like the survey answers) when doing signup
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((state) => ({
            ...state,
            [name]: value
        }));
    };

    const onSignupClick = async () => {
        console.log("Sign up clicked")

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

        // TODO password requirements (case, special char, numbers)

        const res = await signupUser({
            'username': signupInfo.username,
            'email': signupInfo.email,
            'password': signupInfo.password
        });
        console.log('res:', res);
    }

    return (
        <div>
            <h1>signup header</h1>
            <Input placeholder='Username' name='username' value={signupInfo.username} onChange={handleChange} />
            <Input placeholder='Email' name='email' value={signupInfo.email} onChange={handleChange} />
            <Input placeholder='Password' name='password' value={signupInfo.password} onChange={handleChange} />
            <Button onClick={onSignupClick}>Sign Up</Button>
        </div>
    )
}

export default Signup;