import { Progress, Button, Flex, Heading, Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { CloseIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { checkLogin } from '../API/API';
import Question from '../components/Question'

const SurveyPage = () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchLoginData = async () => {
            const user = await checkLogin();
            if (user) {
                navigate('/');
            }
            else {
                setLoaded(true);
            }
        }
        fetchLoginData();
    });

    const questions = [
        {
            question: "How dry/oily does your skin feel?",
            answers: ['Very dry', 'A little dry', 'Normal', 'A little oily', 'Very oily']
        },
        {
            question: "How sensitive is your skin?",
            answers: ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely']
        },
        {
            question: "What is your age group?",
            answers: ["Under 18", "18 - 24", "25 - 34", "35 - 44", "45 or older"]
        },
        {
            question: "How many cups of water do you usually drink in a day?",
            answers: ["Less than 1 cup", "1-3 cups", "4-6 cups", "7-9 cups", "10 or more cups"]
        }

    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState({});

    const handleSelectAnswer = (answer) => {
        const currentKey = questions[currentStep].question;
        setResponses((prev) => ({
            ...prev,
            [currentKey]: answer,
        }));

        if (currentStep < questions.length - 1) {
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
            }, 200);
            console.log(responses);
        }
        else {
            console.log("Survey complete:", responses);
            navigate('/signup');
        }
    };

    const handleCloseClick = async () => {
        console.log('logout clicked');
        navigate('/welcome');
    }

    const handleBackClick = async () => {
        setCurrentStep(currentStep - 1);
    }

    const progressStatus = ((currentStep + 1) / questions.length) * 100;

    return (
        <> {loaded &&
            <Box w='100%' p={20}>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignContent='center'>
                    {currentStep == 0 ?
                        <Button bgColor='transparent' onClick={handleCloseClick}><CloseIcon boxSize={5} /></Button>
                        : <Button bgColor='transparent' onClick={handleBackClick}><ArrowBackIcon boxSize={5} /></Button>}

                    <Box w="84vw" alignContent='center' borderRadius="30px" bgColor='#C3D7F0'>
                        <Progress value={progressStatus} size="lg" m={3} rounded={30} alignSelf='center' bgColor='#C3D7F0' />
                    </Box>
                </Box>
                <Flex flex="1" direction="column" alignItems="center" pt={50}>
                    <Question
                        question={questions[currentStep].question}
                        answers={questions[currentStep].answers}
                        selected={responses[questions[currentStep].question] || ''}
                        onSelect={handleSelectAnswer}
                    />
                </Flex>
            </Box>}
        </>
    )
}

export default SurveyPage;