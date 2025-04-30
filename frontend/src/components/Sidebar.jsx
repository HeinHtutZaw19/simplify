import React, { useState, useEffect } from 'react'
import { Flex, Text, Heading, Avatar, Box, Button, Icon, Image } from '@chakra-ui/react'
import { FiHome } from 'react-icons/fi'
import { MdLeaderboard } from 'react-icons/md'
import { FaCamera } from 'react-icons/fa'
import { IoChatbubbleEllipsesOutline, IoSettings } from "react-icons/io5";
import { MdOutlineHelp } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import NavItem from './NavItem'
import { useNavigate, useLocation } from "react-router-dom"
import { logoutUser } from '../API/API'
import logo from '../assets/logo.png';


const Sidebar = (currentTab) => {
    const [tab, changeTab] = useState({
        active: "Routine"
    })
    const navigate = useNavigate();
    const currentPage = useLocation();

    useEffect(() => {
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
        <Box
            bg='#CCE0F2'
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
                        <Avatar size={{ md: "md", sm: "sm" }} ml={{ base: 0, sm: 3 }} />
                        <Heading as="h3" size="sm" color="#5A67BA" p={3} display={{ md: "flex", sm: "none" }}> Henry </Heading>
                        <Button
                            leftIcon={<Icon as={IoLogOutOutline} />}
                            variant="link"
                            display="flex"
                            onClick={handleLogoutClick}
                            ml={{ base: 10, sm: 0 }}
                            _hover={{ transform: 'scale(1.1)' }}
                        >
                        </Button>
                    </Flex>
                    {/* <Divider mt={4} borderColor="gray.100"/> */}
                    <Flex w="100%" justify="center" flexDir="column" mt={10}>
                        <Text fontSize="sm" color="gray.500" display={{ md: "flex", sm: "none" }}>MENU</Text>
                        <NavItem icon={FiHome} title={"Routine"} active={tab.active == "routine"} handler={() => handleChangeTab("routine")} />
                        <NavItem icon={FaCamera} title={"SkinLab"} active={tab.active === "skinlab"} handler={() => handleChangeTab("skinlab")} />
                        <NavItem icon={IoChatbubbleEllipsesOutline} title={"Chat"} active={tab.active == "chat"} handler={() => handleChangeTab("chat")} />
                        <NavItem icon={MdLeaderboard} title={"Leaderboard"} active={tab.active == "leaderboard"} handler={() => handleChangeTab("leaderboard")} />
                    </Flex>

                </Flex>
                <Box py={10} width="100%" justifyContent={"center"} alignItems="center" display="flex">
                    <Image src={logo} alt="Logo" boxSize="75%" objectFit="contain" />
                </Box>
            </Flex>
        </Box>

    )
}

export default Sidebar