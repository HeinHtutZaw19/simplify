import React from "react";
import { FiTrash } from 'react-icons/fi';
import {Heading, Box, Table, Thead, Tr, Th, Tbody, Td, Flex, Button, Text} from "@chakra-ui/react";
import Colors from "../utils/Colors";


const AdminPage = () => {
    const users = [
        { id: 1, username: 'Alice', email: 'alice@example.com' },
        { id: 2, username: 'Bob', email: 'bob@example.com'},
        { id: 3, username: 'Charlie', email: 'charlie@example.com' }
    ];

    const colors = Colors();
        
    //Need to use get users api(user id, username, email), delete user api
    

    return(
        <>
        <Flex className="page" overflow="hidden" color="black" bg={colors.MAIN1} alignContent='center' flexDirection='column'>
        <Heading pt={10} pl={{md: 10, sm: 3}} color={colors.TEXT1}>Admin Page</Heading>
        <Box p={{md: 10, sm: 3}}>
            <Heading size="lg" mb={6} color={colors.TEXT1}>User List</Heading>
            <Table variant="simple" size="md" color={colors.TEXT1}>
                <Thead bg={colors.MAIN2}>
                <Tr>
                <Th>ID</Th>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th><Text display={{base: 'none', md:'inline-flex'}}>Deactivate</Text></Th>
                </Tr>
                </Thead>
                <Tbody>
                    {users.map(user => (
                    <Tr key={user.id}>
                    <Td >{user.id}</Td>
                    <Td fontSize={{ base: "xs", md: "sm" }}>{user.username}</Td>
                    <Td fontSize={{ base: "xs", md: "sm" }}>{user.email}</Td>
                    <Td>
                        <Text size='xs' colorScheme="red" style={{ cursor: 'pointer' }} color={colors.TEXT2} display={{base: 'inline-flex', md:'none'}}>
                            <FiTrash />
                        </Text>
                        <Button  display={{base: 'none', md:'inline-flex'}}>Delete</Button>
                    </Td>
                    </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
        </Flex>
    </>
    );
}

export default AdminPage;