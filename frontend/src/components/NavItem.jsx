import React from 'react'
import { Flex, Menu, MenuList, MenuButton, Icon, Text, Link, Button } from '@chakra-ui/react'

const NavItem = ({ icon, title, active, handler }) => {
    return (
        <Flex
            mt={2}
            flexDir="column"
            w="100%"
            alignItems={{ md: "flex-start", sm: "center" }}
        >
            <Menu placement="right">
                <Link
                    backgroundColor={active && "#C3D6F0"}
                    p={3}
                    onClick={handler}
                    cursor={"pointer"}
                    _hover={{ transform: 'scale(1.1)' }}
                    w={"100%"}

                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#707FDD" : "#B5C0D9"} />
                            <Text ml={5} display={{ lg: "flex", md: "flex", sm: "none" }} color={active ? "#707FDD" : "#798B9F"} fontWeight={active ? "bold" : "normal"}>{title} </Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>

        </Flex>
    )
}

export default NavItem