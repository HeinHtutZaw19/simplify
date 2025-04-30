import React from 'react'
import { Flex, CircularProgress, Button, Text, Box, VStack } from '@chakra-ui/react'
import Colors from '../utils/Colors'

const Question = ({ question, answers, selected, onSelect }) => {
    const colors = Colors();

    return (
        <Box w='100%' mt={8} px={20}> 
            <Box
                border="1px solid"
                borderColor={colors.TEXT1}
                borderRadius="10px"
                p={3}
                maxW="fit-content"
                mb={6}
                ml={2}
            >
                <Text fontWeight="medium" color={colors.TEXT1}>{question}</Text>
            </Box>
            <VStack spacing={5}>
                {answers.map((answer)=> (
                    <Button 
                    key={answer}
                    onClick={() => onSelect(answer)}
                    bg={selected === answer ? colors.MAIN5 : colors.MAIN3}
                    color={colors.TEXT1}
                    _hover={{ bg: colors.MAIN5 }}
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