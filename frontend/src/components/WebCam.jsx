import { useState, useRef } from 'react';
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

    const handleClickFile = () => fileRef.current.click();

    const handleFileChange = (e) => {
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
        <Flex flexDirection='column' alignItems='center' w="100%" gap={5}>
            {photoFile ? (
                <Image src={URL.createObjectURL(photoFile)} alt="Photo" py={10} px='20vw' w="100%" h='auto' objectFit='contain' />
            ) : (
                image ? (
                    <>
                        <Image src={image} alt="Photo" />
                        <Button onClick={handleRetake}>Retake Photo</Button>
                    </>
                ) : (
                    <>
                        <Webcam
                            style={{
                                borderRadius: 12,
                                border: "2px solid grey",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                filter: "contrast(1.05) brightness(1.02)"
                            }}
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat='image/jpeg'
                            videoConstraints={videoConstraints} />
                        <Button onClick={handlePhoto}>Take Photo</Button>
                    </>
                )
            )}

            <Flex direction="row" mt="5px" mb="40px" align="center" width={300}>
                <Button
                    width="120px"
                    ml="90px"
                    mr="35px"
                    height="35px"
                    lineHeight="90px"
                    bg={colors.BRIGHT3}
                    color={colors.MAIN1}
                    _hover={{ bg: colors.BRIGHT5 }}
                    onClick={handleSubmitClick}
                    isDisabled={disableSubmit}
                    isLoading={disableSubmit}
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
