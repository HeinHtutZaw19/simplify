import { Progress, Button, Flex, Box, Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { CloseIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { checkLogin, uploadImage, getRecommendedRoutine } from '../API/API';
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
    const [submitted, setSubmitted] = useState(false);

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
        }
    };

    const handleSubmit = async () => {
        if (!photoFile && !image) {
            console.log('No image/file selected: submission cancelled');
            return;
        }

        console.log('survey submit clicked');
        setSubmitted(true);

        try {
            // save photo
            const formData = new FormData();
            if (photoFile) {
                console.log('submission photo(file)');
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
            if (!result.imageUrl) {
                console.error('Image upload error(Survey page):', result.error);
                return;
            }
            console.log('Uploaded to:', result.imageUrl);

            const surveyData = {
                oiliness: responses["How dry/oily does your skin feel?"],
                sensitivity: responses["How sensitive is your skin?"],
                ageGroupIndex: responses["What is your age group?"],
                waterIntakeIndex: responses["How many cups of water do you usually drink in a day?"],
                imageUrl: result.imageUrl
            };
            console.log('survey data before being sent to AI:', surveyData);

            const recommendation = await getRecommendedRoutine(surveyData);
            if (!recommendation) {
                console.log('Survey routine recommendation error');
                return;
            }
            console.log('AI generated routine:', recommendation);

            const arrayMatch = recommendation.routine.match(/```javascript\s*([\s\S]*?)\s*```/);
            const routine = arrayMatch ? arrayMatch[1] : null;

            const scoreMatch = recommendation.routine.match(/```json\s*([\s\S]*?)\s*```/);
            let scores = null;
            try {
                const rawScoreText = scoreMatch ? scoreMatch[1].toLowerCase() : null;
                scores = rawScoreText ? JSON.parse(rawScoreText) : null;
            } catch (e) {
                console.error('Error parsing skin analysis scores JSON:', e);
            }

            const feedback = recommendation.routine.split("```")[0].trim();

            navigate('/signup', {
                state: {
                    feedbackText: feedback,
                    routine: routine,
                    imageUrl: result.imageUrl,
                    scores: scores // luminosity, clarity, vibrancy
                }
            });
        }
        catch (error) {
            console.error('Survey submit error:', error);
            setSubmitted(false);
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
        <Box w='100%' px={20} pt={10} overflow='auto' sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
            {submitted && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    width="100vw"
                    height="100vh"
                    bg="rgba(0,0,0,0.5)"
                    zIndex={1000}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Spinner size="xl" color="white" thickness="4px" />
                </Box>
            )}

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
                    <Box w="84vw" px="70px" alignContent='center' style={{border:'1px solid red'}} >
                        <WebCam
                            handleSubmitClick={handleSubmit}
                            image={image}
                            setImage={setImage}
                            photoFile={photoFile}
                            setPhotoFile={setPhotoFile}
                            disableSubmit={submitted}
                        />
                    </Box>
                </>
            )}
        </Box>
    )
}

export default SurveyPage;