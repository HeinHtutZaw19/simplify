import React, { useState, useEffect } from 'react'
import { Flex, Text, Heading, Avatar, Box, Button, Icon, Image, useColorMode } from '@chakra-ui/react'
import { FiHome } from 'react-icons/fi'
import { MdLeaderboard } from 'react-icons/md'
import { FaCamera } from 'react-icons/fa'
import { IoChatbubbleEllipsesOutline, IoSettings } from "react-icons/io5";
import { MdOutlineHelp } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import NavItem from './NavItem'
import { useNavigate, useLocation } from "react-router-dom"
import { logoutUser, checkLogin } from '../API/API'
import logo from '../assets/logo.png';
import Colors from '../utils/Colors.jsx';

const Sidebar = () => {
    const [user, setUser] = useState(null);

    //Color toggle
    const { colorMode, toggleColorMode } = useColorMode();
    const colors = Colors();

    //Tab Toggle
    const [tab, changeTab] = useState({
        active: "Routine"
    })
    const navigate = useNavigate();
    const currentPage = useLocation();

    useEffect(() => {
        const fetchLoginData = async () => {
            const user = await checkLogin();
            if (!user) {
                console.log('sidebar: no user from checkLogin()');
                return;
            }
            else {
                setUser(user);
            }
        }
        fetchLoginData();

        const currentPath = location.pathname;
        const currentTab = (currentPath == "/") ? "routine" : currentPath.substring(1);
        changeTab({ active: currentTab });
    }, [])

    const handleLogoutClick = async () => {
        console.log('logout clicked');
        const res = logoutUser();
        if (res) {
            navigate('/welcome');
        }
    }
    const handleChangeTab = (data) => {
        changeTab({ active: data });
        if (data === "routine") {
            navigate('/');
        }
        else {
            navigate('/' + data);
        }
    }


    return (
        <> {user &&
            <Box
                bg={colors.MAIN3}
                boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
            >
                <Flex
                    pos="sticky"
                    left="0"
                    h="100vh"
                    w={{ base: "345px", md: "225px", sm: "75px" }}
                    flexDir="column"
                    justifyContent="space-between">
                    <Flex
                        p="5%"
                        flexDir="column"
                        w="100%"
                        alignItems={{ md: "flex-start", sm: "center" }}
                        mb={4}

                        pl={{ base: 0, md: 7 }}
                    >

                        <Flex mt={4} direction="row" align={{ base: "center", md: "flex-start" }} alignItems="center">
                            <Image
                                src={user.pfp}
                                alt='Profile picture'
                                borderRadius='full'
                                boxSize={{ md: '48px', sm: '32px' }}
                                ml={{ base: 0, sm: 3 }}
                                onClick={() => handleChangeTab("Profile")}
                                cursor="pointer"
                                shadow="md"
                            />

                            <Heading as="h3" size="sm" color={colors.BRIGHT4} p={3} display={{ md: "flex", sm: "none" }}
                                onClick={() => handleChangeTab("Profile")}
                                cursor="pointer"
                            >
                                {user.username}
                            </Heading>

                            <Button
                                leftIcon={<Icon as={IoLogOutOutline} />}
                                variant="link"
                                display="flex"
                                color={colors.TEXT4}
                                onClick={handleLogoutClick}
                                ml={{ base: 10, sm: 0 }}
                                _hover={{ transform: 'scale(1.1)' }}
                            >
                            </Button>

                        </Flex>
                        {/* <Divider mt={4} borderColor="gray.100"/> */}
                        <Flex w="100%" justify="center" flexDir="column" mt={10}>
                            <Text fontSize="sm" color={colors.TEXT4} display={{ md: "flex", sm: "none" }}>MENU</Text>
                            <NavItem icon={FiHome} title={"Routine"} active={tab.active == "routine"} handler={() => handleChangeTab("routine")} />
                            <NavItem icon={FaCamera} title={"SkinLab"} active={tab.active === "skinlab"} handler={() => handleChangeTab("skinlab")} />
                            <NavItem icon={IoChatbubbleEllipsesOutline} title={"Chat"} active={tab.active == "chat"} handler={() => handleChangeTab("chat")} />
                            <NavItem icon={MdLeaderboard} title={"Leaderboard"} active={tab.active == "leaderboard"} handler={() => handleChangeTab("leaderboard")} />
                            <NavItem icon={colorMode === 'light' ? MoonIcon : SunIcon} title={colorMode === 'light' ? "Dark Mode" : 'Light Mode'} active={false} handler={toggleColorMode} />
                            <NavItem title={"Admin Page"} active={tab.active == "admin"} handler={() => handleChangeTab("admin")} />
                        </Flex>

                    </Flex>
                    <Box py={10} width="100%" justifyContent={"center"} alignItems="center" display="flex">
                        <Image src={logo} alt="Logo" boxSize="75%" objectFit="contain" />
                    </Box>

                </Flex>
            </Box>}
        </>
    )
}

export default Sidebar