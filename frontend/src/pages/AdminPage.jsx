import React from "react";
import { useState, useEffect } from "react"
import { FiTrash } from 'react-icons/fi';
import { Heading, Box, Table, Thead, Tr, Th, Tbody, Td, Flex, Button, Text, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure } from "@chakra-ui/react";
import Colors from "../utils/Colors";
import { fetchUsers, deleteUser } from '../API/API'

const AdminPage = () => {
    const colors = Colors();
    const [userlist, setUserlist] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    useEffect(() => {
        getUserlist();
    }, []);

    const getUserlist = async () => {
        const list = await fetchUsers();
        console.log("Fetched All Users data:", list);
        setUserlist(list);
    };

    const deleteThisUser = async (user) => {
        const deletedUser = await deleteUser(user.email);
        if (deletedUser) {
            getUserlist();
        }
        else {
            console.error("Error deleting user");
        }
    }

    const handleClose = async () => {
        setSelectedUser(null);
        onClose();
    }

    return (
        <Flex className="page" overflow="auto" color="black" bg={colors.MAIN1} alignContent='center' flexDirection='column' sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
            <Heading pt={10} pl={{ md: 10, sm: 3 }} color={colors.TEXT1}>Admin Page</Heading>
            <Box p={{ md: 10, sm: 3 }}>
                <Heading size="lg" mb={6} color={colors.TEXT1}>User List</Heading>
                <Table variant="simple" size="md" color={colors.TEXT1}>
                    <Thead bg={colors.MAIN2}>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Email</Th>
                            <Th>Point</Th>
                            <Th><Text display={{ base: 'none', md: 'inline-flex' }}>Deactivate</Text></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {userlist.map(user => (
                            <Tr key={user._id}>
                                <Td fontSize={{ base: "xs", md: "sm" }}>{user.username}</Td>
                                <Td fontSize={{ base: "xs", md: "sm" }}>{user.email}</Td>
                                <Td >{user.point}</Td>
                                <Td>
                                    <Text size='xs' colorScheme="red" style={{ cursor: 'pointer' }} color={colors.TEXT2} display={{ base: 'inline-flex', md: 'none' }} onClick={onOpen}>
                                        <FiTrash />
                                    </Text>
                                    <Button display={{ base: 'none', md: 'inline-flex' }} onClick={() => { setSelectedUser(user); onOpen(); }}>Delete</Button>

                                    <AlertDialog
                                        isOpen={isOpen}
                                        leastDestructiveRef={cancelRef}
                                        onClose={handleClose}
                                    >
                                        <AlertDialogOverlay bg="transparent" >
                                            <AlertDialogContent boxShadow="none"  >
                                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                                    Delete User: {selectedUser?.username}
                                                </AlertDialogHeader>

                                                <AlertDialogBody>
                                                    Are you sure? You can't undo this action afterwards.
                                                </AlertDialogBody>

                                                <AlertDialogFooter>
                                                    <Button ref={cancelRef} onClick={handleClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button colorScheme='red' onClick={async () => { if (selectedUser) { await deleteThisUser(selectedUser); onClose(); } }} ml={3}>
                                                        Delete
                                                    </Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialogOverlay>
                                    </AlertDialog>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    );
}

export default AdminPage;