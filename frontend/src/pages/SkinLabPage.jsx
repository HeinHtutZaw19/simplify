import React, { useEffect, useState } from 'react'
import { Flex, Box, Image, Button, Text, SimpleGrid, Spinner, useToast } from '@chakra-ui/react'
import { FiUpload } from "react-icons/fi";
import { FaRedo } from "react-icons/fa";
import SkinLabAnalysis from '../components/SkinLabAnalysis';
import PatchDetail from '../components/PatchDetail';
import BoxOverlayImage from '../components/BoxOverlayImage';
import testImage from '../assets/skinanalysis.png';
import Colors from '../utils/Colors';
import WebCam from '../components/WebCam';
import { createClient } from '@supabase/supabase-js';
import { uploadSelfie } from '../API/API.jsx';

const boxes = [
  { x: 50, y: 35, color: 'green.500' },   // Green
  { x: 65, y: 50, color: 'blue.500' },   // Blue
  { x: 50, y: 50, color: 'yellow.500' }, // Yellow
  { x: 30, y: 50, color: 'red.500' },  // Red
];
const SkinLabPage = () => {
  const colors = Colors();

  const markdown = `

Likely **Combination to Oily Skin**, showing visible redness, uneven texture, and signs of acne or sun damage, including hyperpigmentation and irritation.

---

🚀 **Your Skin Can Improve!**

---

**Skin Condition Percentages:**
- **Luminosity:** 30% — _because (detailed description)_
- **Clarity:** 20% — _because (detailed description)_
- **Vibrancy:** 40% — _because (detailed description)_
`;

  const toast = useToast();
  const [aiDescription, setAIDescription] = useState({ luminosity: 30, clarity: 20, vibrancy: 40, overall: 35, description: markdown })
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // for loading text bubbles

  function stripMarkdown(text) {
    // Remove **bold**, *italic*, _underline_, etc.

    return text.replace(/[*_~`>#-]+/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
  }

  function extractPercentages(rawText) {
    const text = stripMarkdown(rawText);
    const regex = /(\bLuminosity|\bClarity|\bVibracy|\bVibrancy|\bOverall):\s*(\d+)%/gi;
    const result = {};
    let match;

    while ((match = regex.exec(text)) !== null) {
      let key = match[1].toLowerCase();
      if (key === 'vibracy') key = 'vibrancy';
      result[key] = parseInt(match[2], 10);
    }

    return result;
  }

  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  };

  const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://gsklwlfjuenpokozvlot.supabase.co'
  const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdza2x3bGZqdWVucG9rb3p2bG90Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjk3MDE4NSwiZXhwIjoyMDU4NTQ2MTg1fQ.y52c3BsE5JdadBMGQ-tvCpUBI_PUerbuxBlp5lIDGIM'
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleSubmitClick = async () => {
    if (!image) {
      toast({
        title: "No image provided",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const blob = dataURLtoBlob(image);
      const fileName = `image-${Date.now()}.jpeg`;

      const { data: uploadResult, error: uploadError } = await supabase.storage
        .from('selfies')
        .upload(fileName, blob, { contentType: 'image/jpeg' });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: urlData, error: urlError } = supabase
        .storage
        .from('selfies')
        .getPublicUrl(uploadResult?.path);

      if (urlError) {
        throw new Error(urlError.message);
      }

      const publicUrl = urlData?.publicUrl;
      const response = await uploadSelfie({ image: publicUrl });

      toast({
        title: "Image submitted successfully",
        description: "Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      const description = response.message;
      const percentages = extractPercentages(description);
      setAIDescription({
        luminosity: percentages['luminosity'],
        clarity: percentages['clarity'],
        vibrancy: percentages['vibrancy'],
        overall: percentages['overall'],
        description: description
      });

    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Submission failed",
        description: err.message || "Unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Flex className="page" overflow="hidden" color="black" bg={colors.MAIN1}>
      <Flex className="flex-scroll" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
        <Text
          fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="bold"
          textAlign="center"
          fontFamily='Feather Bold'
          pt={10}
          pb={5}
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
          color={colors.TEXT1}
        >
          Upload your selfie to analyze your skin with Simplify!
        </Text>

        {/* Webcam */}
        <Flex py={10} width={{ sm: "100%", md: "100%", lg: "120%" }} >
          <WebCam
            handleSubmitClick={handleSubmitClick}
            image={image}
            setImage={setImage}
          />

          {/* Overlay only over the webcam area */}
          {isLoading && (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="whiteAlpha.800"
              backdropBlur="sm"
              zIndex={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner size="xl" />
              <Text ml={3} fontSize="lg" fontWeight="medium">
                Analyzing...
              </Text>
            </Box>
          )}
        </Flex>

        {/* Skin Lab Analysis */}
        <SkinLabAnalysis luminosity={aiDescription.luminosity} clarity={aiDescription.clarity} vibrancy={aiDescription.vibrancy} overall={aiDescription.overall} text={aiDescription.description} />
      </Flex>
    </Flex>
  )
}

export default SkinLabPage