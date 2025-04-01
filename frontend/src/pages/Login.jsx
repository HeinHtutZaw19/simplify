import { useState } from 'react'
import { Input, Button } from '@chakra-ui/react'

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        username: '',
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
        console.log('login clicked');
    }

    return (
        <div>
            <h1>login header</h1>
            <Input placeholder='Username' name='username' value={loginInfo.username} onChange={handleChange} />
            <Input type='password' placeholder='Password' name='password' value={loginInfo.password} onChange={handleChange} />
            <Button onClick={onLoginClick}>Log in</Button>
        </div>
    )
}

export default Login;