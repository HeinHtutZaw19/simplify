import React from 'react'
import { Flex, CircularProgress, Button, Text, Box, VStack } from '@chakra-ui/react'

const Question = ({ question, answers, selected, onSelect }) => {

    return (
        <Box w='100%' mt={8} px={20}> 
            <Box
                border="1px solid black"
                borderRadius="10px"
                p={3}
                maxW="fit-content"
                mb={6}
                ml={2}
            >
                <Text fontWeight="medium">{question}</Text>
            </Box>
            <VStack spacing={5}>
                {answers.map((answer)=> (
                    <Button 
                    key={answer}
                    onClick={() => onSelect(answer)}
                    bg={selected === answer ? '#C3D4F9' : '#E3EDF9'}
                    color="black"
                    _hover={{ bg: '#C3D7F0' }}
                    border={selected === answer ? '1px solid #5378A5' : 'none'}
                    borderRadius="md"
                    w = '30vw'
                    >
                        {answer}
                    </Button>
                ))}
            </VStack>
        </Box>
    )
}

export default Question