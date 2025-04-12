import React, { useState } from 'react'
import { Flex, Text, Heading, Avatar, Box, Button, Icon, Image } from '@chakra-ui/react'
import { FiHome } from 'react-icons/fi'
import { MdLeaderboard } from 'react-icons/md'
import { FaCamera } from 'react-icons/fa'
import { IoChatbubbleEllipsesOutline, IoSettings } from "react-icons/io5";
import { MdOutlineHelp } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import NavItem from './NavItem'
import { useNavigate } from "react-router-dom"
import { logoutUser } from '../API/API'
import logo from '../assets/logo.png';


const Sidebar = () => {
    const [tab, changeTab] = useState({
        active: "Routine"
    })
    const navigate = useNavigate();
    const handleLogoutClick = async () => {
        console.log('logout clicked');
        const res = logoutUser();
        if (res) {
            navigate('/welcome');
        }
    }
    const handleChangeTab = (data) => {
        changeTab({ active: data });
        if (data === "Routine") {
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

                    pl={7}
                >

                    <Flex mt={4} direction="row" align={{ base: "center", md: "flex-start" }} alignItems="center">
                        <Avatar size={{ md: "md", sm: "sm" }} />
                        <Heading as="h3" size="sm" color="#5A67BA" p={3} display={{ md: "flex", sm: "none" }}> Henry </Heading>
                        <Button
                            leftIcon={<Icon as={IoLogOutOutline} />}
                            variant="link"
                            display={{ md: "flex", sm: "none" }}
                            onClick={handleLogoutClick}
                            ml={10}
                        >
                        </Button>
                    </Flex>
                    {/* <Divider mt={4} borderColor="gray.100"/> */}
                    <Flex w="100%" justify="center" flexDir="column" mt={10}>
                        <Text fontSize="sm" color="gray.500" display={{ md: "flex", sm: "none" }}>MENU</Text>
                        <NavItem icon={FiHome} title={"Routine"} active={tab.active == "Routine"} handler={() => handleChangeTab("Routine")} />
                        <NavItem icon={FaCamera} title={"SkinLab"} active={tab.active === "SkinLab"} handler={() => handleChangeTab("SkinLab")} />
                        <NavItem icon={IoChatbubbleEllipsesOutline} title={"Chat"} active={tab.active == "Chat"} handler={() => handleChangeTab("Chat")} />
                        <NavItem icon={MdLeaderboard} title={"Leaderboard"} active={tab.active == "Leaderboard"} handler={() => handleChangeTab("Leaderboard")} />
                    </Flex>

                </Flex>
                <Box py={10} width="100%" justifyContent={"center"} alignItems="center" display={{ md: "flex", sm: "none" }}>
                    <Image src={logo} alt="Logo" boxSize="70px" objectFit="cover" />
                </Box>
            </Flex>
        </Box>

    )
}

export default Sidebar