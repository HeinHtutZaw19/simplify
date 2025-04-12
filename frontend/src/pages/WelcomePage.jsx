import { Image, Button, Flex, Box } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import welcome from '../assets/welcome.png';


const WelcomePage = () => {
    const navigate = useNavigate();

    const onLoginClick = async () => {
        console.log('login clicked');
        navigate('/login')
    };

    const onSignupClick = async () => {
        console.log('google clicked');
        navigate('/survey')
    };

    return (
        <Flex direction="column" align="center" minH="100vh" overflowY="auto" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
            <Box position="relative" width="100%">
                <Image src={welcome} width="100%" height="auto" objectFit="cover" />

                <Flex
                    position="absolute"
                    top="30px"
                    width="100%"
                    px={6}
                    direction="column"
                    align="center"
                >
                    <Button
                        onClick={onSignupClick}
                        width="460px"
                        height="65px"
                        top="475px"
                        left="335px"
                        colorScheme="blue"
                        rounded={17}
                        fontSize={32}
                        color="black"
                        backgroundColor="#C3D7F0"
                    >
                        Get Started
                    </Button>
                    <Button
                        onClick={onLoginClick}
                        width="460px"
                        height="65px"
                        top="492px"
                        left="335px"
                        colorScheme="blue"
                        rounded={17}
                        fontSize={32}
                        color="black"
                        backgroundColor="#C3D7F0"
                    >
                        Sign In
                    </Button>
                </Flex>
            </Box>

            <Box height="800px" />
        </Flex>
    );
};

export default WelcomePage;
