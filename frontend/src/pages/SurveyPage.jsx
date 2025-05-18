import { Progress, Button, Flex, Heading, Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { CloseIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { checkLogin, uploadImage } from '../API/API';
import Question from '../components/Question'
import Colors from '../utils/Colors.jsx';
import WebCam from '../components/WebCam.jsx';

const SurveyPage = () => {
    const colors = Colors();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState({});
    const [image, setImage] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [isLast, setIsLast] = useState(false);

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
    }, []);

    useEffect(() => {
        console.log('survey responses:', responses);
    }, [responses]);

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
        }
        else if (currentStep == questions.length - 1) {
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
            }, 200);
            setIsLast(true);
        }
        else {
            console.log("Survey complete");
            // navigate('/signup');
        }
    };

    const handleSubmit = async () => {
        if (!photoFile && !image) {
            console.log('No image/file selected: submission cancelled');
            return;
        }

        console.log('survey submit clicked');

        // save photo
        const formData = new FormData();

        if (photoFile) {
            console.log('submission photo(file):', photoFile);
            formData.append('image', photoFile);
        }
        else if (image) {
            console.log('submission photo(webcam)');
            const res = await fetch(image);
            const blob = await res.blob();
            const file = new File([blob], 'survey_webcam_photo.png', { type: blob.type });
            formData.append('image', file);
        }

        const result = await uploadImage(formData);
        if (result.imageUrl) {
            console.log('Uploaded to:', result.imageUrl);
            navigate('/signup', { state: { surveyData: responses } });
        } else {
            console.error(result.error);
        }
    }

    const handleCloseClick = async () => {
        navigate('/welcome');
    }

    const handleBackClick = async () => {
        setCurrentStep(currentStep - 1);
        setIsLast(false);
    }

    const progressStatus = ((currentStep + 1) / questions.length) * 100;

    return (
        <> {loaded && (
            <Box w='100%' px={20} pt={10}>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignContent='center'>
                    {currentStep == 0 ?
                        <Button bgColor='transparent' onClick={handleCloseClick}><CloseIcon boxSize={5} /></Button>
                        : <Button bgColor='transparent' onClick={handleBackClick}><ArrowBackIcon boxSize={5} /></Button>}
                </Box>

                {!isLast ? (
                    <>
                        <Box w="84vw" alignContent='center' borderRadius="30px" bgColor={colors.MAIN3}>
                            <Progress value={progressStatus} size="lg" m={3} rounded={30} alignSelf='center' bgColor={colors.MAIN3} />
                        </Box>
                        <Flex flex="1" direction="column" alignItems="center" pt={50}>
                            <Question
                                question={questions[currentStep].question}
                                answers={questions[currentStep].answers}
                                selected={responses[questions[currentStep].question] || ''}
                                onSelect={handleSelectAnswer}
                            />
                        </Flex>
                    </>
                ) : (
                    <>
                        <Box w="84vw" alignContent='center' >
                            <WebCam handleSubmitClick={handleSubmit} image={image} setImage={setImage} photoFile={photoFile} setPhotoFile={setPhotoFile} />
                        </Box>
                    </>
                )}
            </Box>
        )}
        </>
    )
}

export default SurveyPage;