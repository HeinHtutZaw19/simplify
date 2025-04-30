import { useEffect } from 'react';
import { Image, Button, Flex, Box, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { checkLogin } from '../API/API';
import logo from '../assets/logo.png';
import second from '../assets/2.png';
import third from '../assets/3.png';
import fourth from '../assets/4.png';

import Colors from '../utils/Colors.jsx'

const WelcomePage = () => {
    const colors = Colors();
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

    const onLoginClick = async () => {
        console.log('login clicked');
        navigate('/login')
    };

    const onSignupClick = async () => {
        console.log('google clicked');
        navigate('/survey')
    };

    return (
        <Flex className="flex-scroll" p={0} sx={{ '&::-webkit-scrollbar': { display: 'none' } }} >
            <Flex align="flex-start" width="100%" height="75vh" position="relative">
                <Image src={logo} alt="Logo" boxSize="350px" ml="10%" mr="10%" />
                <Box
                    top="0"
                    right="0"
                    width="50%"
                    height="30%"
                    bg= {colors.MAIN4}
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
                            color={colors.TEXT1}
                            rounded={17}
                            px={10}
                            backgroundColor= {colors.MAIN3}
                            _hover={{ bg: colors.MAIN5 }}
                        >
                            Get Started
                        </Button>
                        <Button
                            onClick={onLoginClick}
                            color={colors.TEXT1}
                            rounded={17}
                            mt={5}
                            px={10}
                            backgroundColor=  {colors.MAIN3}
                            _hover={{ bg: colors.SECONDARY1 }}
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
                    bg= {colors.MAIN4}
                />
            </Flex>
        </Flex >

    );
};

export default WelcomePage;
