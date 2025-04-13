import { Image, Button, Flex, Box, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import second from '../assets/2.png';
import third from '../assets/3.png';
import fourth from '../assets/4.png';


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
        <Flex className="flex-scroll" p={0} sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
            <Flex align="flex-start" width="100%" height="75vh" position="relative">
                <Image src={logo} alt="Logo" boxSize="350px" ml="10%" mr="10%" />
                <Box
                    top="0"
                    right="0"
                    width="50%"
                    height="30%"
                    bg="blue.200"
                    ml="auto"
                />
            </Flex>
            <Flex align="center" justifyContent="center" width="100%" p="10" height="50%" position="relative">
                <Image src={second} alt="Logo" boxSize="350px" ml="10%" />
                <Flex direction="column" justifyContent="center" alignItems="center" p={10}>
                    <Text fontSize="2xl" textAlign="left" maxW="90%" >
                        SIMPLIFY: AI-Powered Skincare-Assistant Smart Skincare, Just for You
                    </Text>
                    <Flex direction="column" p="2" mt={5}>
                        <Button
                            onClick={onSignupClick}
                            color="black"
                            rounded={17}
                            px={10}
                            backgroundColor="#C3D7F0"
                        >
                            Get Started
                        </Button>
                        <Button
                            onClick={onLoginClick}
                            color="black"
                            rounded={17}
                            mt={5}
                            px={10}
                            backgroundColor="#C3D7F0"
                        >
                            Sign In
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            <Flex justifyContent="center" alignItems="center" width="100%" height="50%" p="10" position="relative">
                <Text fontSize="2xl" textAlign="left" maxW="50%" ml="10%"  >
                    <strong>Skin Lab </strong>that scans, analyzes, and personalizes your skincare—giving you routines and product recommendations tailored to your unique skin type
                </Text>
                <Image src={third} alt="Logo" boxSize="350px" ml={10} />
            </Flex>
            <Flex justifyContent="center" alignItems="center" width="100%" height="50%" p="10" position="relative">
                <Image src={fourth} alt="Logo" boxSize="350px" ml="10%" />
                <Text fontSize="2xl" textAlign="left" maxW="50%" ml={10} >
                    Stay consistent, keep your streaks, and watch your skincare progress shine on the <strong>leaderboard</strong>!
                </Text>
            </Flex>
            <Flex bgColor="white" justifyContent="center" alignItems="center" width="100%" p="10" position="relative">
                <Box
                    position="absolute"
                    top="0"
                    right="0"
                    width="100%"
                    height="100%"
                    bg="blue.200"
                />
            </Flex>
        </Flex >

    );
};

export default WelcomePage;
