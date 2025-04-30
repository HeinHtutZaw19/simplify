import {useState, useRef} from 'react';
import Webcam from 'react-webcam';
import {Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { FaRedo } from "react-icons/fa";
import Colors from '../utils/Colors';


const videoConstraints = {
    facingMode: "user"
};

const WebCam = ({ handleSubmitClick }) => {
    const colors = Colors();
    // webcam photo
    const [image, setImage] = useState(null);
    const webcamRef = useRef(null);
    const fileRef = useRef(null);
    // uploaded file photo
    const [photoFile, setPhotoFile] = useState(null);

    // handles taking a photo with webcam
    const handlePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }
    // handles the reset of webcam image -> shows webcam video
    const handleRetake = () => {
        setImage(null);
    }
    // handles file input -> user browses and picks image file
    const handleClickFile = () => fileRef.current.click();
    // uploaded file value change
    const handleFileChange = (e) => {
    const file = e.target.files[0];
        setPhotoFile(file);
    };
    // handles the reset of file upload -> shows webcam video 
    const handleClickRedo = () => {
        setPhotoFile(null);
    };

    return (
        <>  <Flex flexDirection='column' alignItems='center'  w="100%" gap={5}>
                {/* Dipslay difference of Webcam, Webcam photo, File upload */}
                {photoFile ? (
                        <Image src={URL.createObjectURL(photoFile)} alt="Photo" py={10} px='20vw' gap={5}  w="100%" h='auto' objectFit='contain'/>
                    ) : (
                        <>
                        {image ? (
                            <>
                                <Image src={image} alt="Photo"/>
                                <Button onClick={handleRetake}>Retake Photo</Button>
                            </>
                        ):
                        (
                            <>
                                <Webcam audio ={false} ref={webcamRef} screenshotFormat='image/jpeg' videoConstraints={videoConstraints} />
                                <Button onClick={handlePhoto}>Take Photo</Button>
                            </>
                        )
                        }
                        </>
                    )
                }
                 {/*Button Container*/}
                <Flex direction="row" mt="5px" mb="40px" align="center" width={300}>
                    <Button width="120px" ml="90px" mr="35px" height="35px" lineHeight="90px" bg={colors.BRIGHT3} color={colors.MAIN1} _hover={{ bg: colors.BRIGHT5 }} onClick={handleSubmitClick}>
                        Submit
                    </Button>
                    <Input type='file' ref={fileRef} accept='image/png, image/jpeg' onChange={handleFileChange} display='none'/>
                    <Text fontSize={20} mr="15px" style={{ cursor: 'pointer' }} color={colors.TEXT2} onClick={handleClickFile}>
                        <FiUpload />
                    </Text>
                    <Text fontSize={15} style={{ cursor: 'pointer' }} color={colors.TEXT2} onClick={handleClickRedo}>
                        <FaRedo />
                    </Text>
                </Flex>
            </Flex>
        </>

    );
}

export default WebCam;