import { Flex, Image, Box } from '@chakra-ui/react'
import Metrics from './Metrics.jsx'
import Colors from '../utils/Colors.jsx';
import ReactMarkdown from 'react-markdown';

const SkinAnalysis = ({ feedback }) => {
    const colors = Colors();
    const summary = feedback.feedback;
    const imageUrl = feedback.imageUrl;
    return (
        <Box color={colors.TEXT1}>
            {/* <Heading id="home-analysis-heading">Combination Skin Type</Heading> */}
            <Flex id='home-analysis-visuals'>
                <Image src={imageUrl} alt="skin analysis" boxSize="30%"></Image>
                <Metrics
                    luminosity={feedback.luminosity}
                    clarity={feedback.clarity}
                    vibrancy={feedback.vibrancy}
                    overall={Math.floor((feedback.luminosity + feedback.clarity + feedback.vibrancy)/3)}
                />
            </Flex>
            <ReactMarkdown>
                {summary}
            </ReactMarkdown>
        </Box>
    )
}

export default SkinAnalysis