import './App.css'
import signupUser from './API/API'
import { Input, Button } from '@chakra-ui/react'

const Signup = () => {
    const onSignupClick = async () => {
        console.log("Sign up clicked")
        const res = await signupUser({
            'username': 'heis4e6nberg',
            'email': 'fs6324y5tda',
            'password': '1234aresdf'
        });
        console.log('res:', res);
    }

    return (
        <div>
            <h1>signup header</h1>
            <Input placeholder='Username' />
            <Input placeholder='Email' />
            <Input placeholder='Password' />
            <Button onClick={onSignupClick}>Sign Up</Button>
        </div>
    )
}

export default Signup;