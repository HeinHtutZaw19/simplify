import { signupUser } from '../API/API'
import { Input, Button } from '@chakra-ui/react'
import { useState } from 'react'

const Signup = () => {
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
        const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+={}[\]:;"'<>,.?/~`|\\])[A-Za-z\d@$!%*?&^#()_\-+={}[\]:;"'<>,.?/~`|\\]{8,}$/;
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
        console.log('res:', res);
    }

    return (
        <div>
            <h1>signup header</h1>
            <Input placeholder='Username' name='username' value={signupInfo.username} onChange={handleChange} />
            <Input placeholder='Email' name='email' value={signupInfo.email} onChange={handleChange} />
            <Input type='password' placeholder='Password' name='password' value={signupInfo.password} onChange={handleChange} />
            <Input type='password' placeholder='Confirm Password' name='passwordConfirm' value={signupInfo.passwordConfirm} onChange={handleChange} />
            <span style={{ display: 'block' }}>
                Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and symbols.
            </span>
            <Button onClick={onSignupClick}>Sign Up</Button>
        </div>
    )
}

export default Signup;