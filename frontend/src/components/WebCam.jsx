import { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button, Flex, Image, Input, Text, useToast } from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { FaRedo } from "react-icons/fa";
import Colors from '../utils/Colors';

const videoConstraints = {
    facingMode: "user"
};

const WebCam = ({ handleSubmitClick, image, setImage, photoFile, setPhotoFile, disableSubmit }) => {
    const colors = Colors();
    const webcamRef = useRef(null);
    const fileRef = useRef(null);

    useEffect(() => {
        console.log('webcam image changed')
    }, [image])

    useEffect(() => {
        console.log('photoFile changed:', photoFile)
    }, [photoFile])

    const handlePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        // console.log(imageSrc)
        setImage(imageSrc);
        setPhotoFile(null);
    };

    const handleRetake = () => {
        setPhotoFile(null);
        setImage(null);
    };

    const handleClickFile = () => {
        console.log('in handleClickFile')
        setPhotoFile(null);
        setImage(null);
        if (fileRef.current) {
            fileRef.current.value = '';
            fileRef.current.click();
        }
    }

    const handleFileChange = (e) => {
        console.log('in handlefilechange')
        const file = e.target.files[0];
        setPhotoFile(file);
        setImage(null);
        console.log('photofile:', file);
    };

    const handleClickRedo = () => {
        setPhotoFile(null);
        setImage(null);
    };

    return (
        <Flex flexDirection="column" alignItems="center" w="100%" gap={5}>
            {photoFile ? (
                <Image
                    src={URL.createObjectURL(photoFile)}
                    alt="Photo"
                    w="40%"
                    h="auto"
                    objectFit="contain"
                    style={{
                        borderRadius: 12,
                        border: '2px solid grey',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        filter: 'contrast(1.05) brightness(1.02)',
                    }}
                />
            ) : image ? (
                <>
                    <Image
                        src={image}
                        alt="Photo"
                        w="40%"
                        h="auto"
                        objectFit="contain"
                        style={{
                            borderRadius: 12,
                            border: '2px solid grey',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            filter: 'contrast(1.05) brightness(1.02)',
                        }}
                    />
                    <Button onClick={handleRetake} mt={2}>
                        Retake Photo
                    </Button>
                </>
            ) : (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        mirrored={true}
                        videoConstraints={videoConstraints}
                        style={{
                            width: '40%',
                            borderRadius: 12,
                            border: '2px solid grey',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            filter: 'contrast(1.05) brightness(1.02)',
                        }}
                    />

                    <Button
                        onClick={handlePhoto}
                        bg="gray.400"
                        size="md"
                        borderRadius="xl"
                        boxShadow="md"
                        _hover={{
                            bg: 'gray.500',
                            boxShadow: 'lg',
                            transform: 'translateY(-1px)',
                        }}
                        mt={2}
                    >
                        Take Photo
                    </Button>
                </>
            )}


            <Flex direction="row" mt="5px" mb="40px" align="center" width={300}>
                <Button
                    width="120px"
                    ml="90px"
                    mr="35px"

                    borderRadius="xl"
                    boxShadow="md"
                    height="35px"
                    lineHeight="30px"
                    bg={colors.BRIGHT3}
                    color={colors.MAIN1}
                    onClick={handleSubmitClick}
                    isDisabled={disableSubmit}
                    isLoading={disableSubmit}
                    _hover={{ bg: colors.BRIGHT5, boxShadow: 'lg', transform: 'translateY(-1px)' }}
                    _active={{ boxShadow: 'sm', transform: 'translateY(0)' }}
                >
                    Submit
                </Button>
                <Input type='file' ref={fileRef} accept='image/png, image/jpeg' onChange={handleFileChange} display='none' />
                <Text fontSize={20} mr="15px" style={{ cursor: 'pointer' }} color={colors.TEXT2} onClick={handleClickFile}>
                    <FiUpload />
                </Text>
                <Text fontSize={15} style={{ cursor: 'pointer' }} color={colors.TEXT2} onClick={handleClickRedo}>
                    <FaRedo />
                </Text>
            </Flex>
        </Flex>
    );
};

export default WebCam;
