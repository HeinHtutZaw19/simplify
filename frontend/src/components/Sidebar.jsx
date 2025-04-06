import React, { useState } from 'react'
import { Flex, Text, Heading, Avatar, Box } from '@chakra-ui/react'
import { FiHome } from 'react-icons/fi'
import { MdLeaderboard } from 'react-icons/md'
import { FaCamera } from 'react-icons/fa'
import { IoChatbubbleEllipsesOutline, IoSettings } from "react-icons/io5";
import { MdOutlineHelp } from "react-icons/md";
import NavItem from './NavItem'
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
    const [tab, changeTab] = useState({
        active: "Routine"
    })
    const navigate = useNavigate();

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
            pl={7}
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
                >

                    <Flex mt={4} align={{ base: "center", md: "flex-start" }}>
                        <Avatar size={{ md: "md", sm: "sm" }} />
                        <Heading as="h3" size="sm" color="#5A67BA" p={3} display={{ md: "flex", sm: "none" }}> Henry </Heading>
                    </Flex>
                    {/* <Divider mt={4} borderColor="gray.100"/> */}
                    <Flex w="100%" justify="center" flexDir="column" mt={10}>
                        <Text fontSize="sm" color="gray.500" display={{ md: "flex", sm: "none" }}>MENU</Text>
                        <NavItem icon={FiHome} title={"Routine"} active={tab.active == "Routine"} handler={() => handleChangeTab("Routine")} />
                        <NavItem icon={FaCamera} title={"SkinLab"} active={tab.active === "SkinLab"} handler={() => handleChangeTab("SkinLab")} />
                        <NavItem icon={IoChatbubbleEllipsesOutline} title={"Chat"} active={tab.active == "Chat"} handler={() => handleChangeTab("Chat")} />
                        <NavItem icon={MdLeaderboard} title={"Leaderboard"} active={tab.active == "Leaderboard"} handler={() => handleChangeTab("Leaderboard")} />
                    </Flex>
                    <Flex w="100%" justify="center" flexDir="column" mt={10}>
                        <Text fontSize="sm" color="gray.500" display={{ md: "flex", sm: "none" }}>OTHERS</Text>
                        <NavItem icon={IoSettings} title={"Settings"} active={tab.active == "Settings"} handler={() => handleChangeTab("Settings")} />
                        <NavItem icon={MdOutlineHelp} title={"Help"} active={tab.active == "Help"} handler={() => handleChangeTab("Help")} />
                    </Flex>
                </Flex>

            </Flex>
        </Box>

    )
}

export default Sidebar