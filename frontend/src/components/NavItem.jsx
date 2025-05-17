import React from 'react'
import { Flex, Menu, MenuList, MenuButton, Icon, Text, Link, Button } from '@chakra-ui/react'
import Colors from '../utils/Colors.jsx'


//Original COlors link background #C3D6F0
// icon - color={active ? "#707FDD" : "#B5C0D9"}
// text - color={active ? "#707FDD" : "#798B9F"}

const NavItem = ({ icon, title, active, handler }) => {
    const colors = Colors();
    return (
        <Flex
            mt={2}
            flexDir="column"
            w="100%"
            alignItems={{ md: "flex-start", sm: "center" }}
        >
            <Menu placement="right">
                <Link
                    backgroundColor={active && colors.MAIN4}
                    p={3}
                    onClick={handler}
                    cursor={"pointer"}
                    _hover={{ transform: 'scale(1.1)' }}
                    w={"100%"}

                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon ml={3} as={icon} fontSize="xl" color={active ? colors.BRIGHT5 : colors.SECONDARY1} />
                            <Text ml={5} display={{ lg: "flex", md: "flex", sm: "none" }} color={active ? colors.BRIGHT5 : colors.TEXT4} fontWeight={active ? "bold" : "normal"}>{title} </Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>

        </Flex>
    )
}

export default NavItem