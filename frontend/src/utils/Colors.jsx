

// Color Palette chosen from Paletton
// Base as our Main color which is #CCE0F2 with monochromatic scheme
// And an additional color scheme which is based on #415689 which is the color of our logo
// Main
// #F3F9FE
// #E1EEF9
// #CCE0F2  Main
// #B5D0E8
// #9CBDDB

// Secondary
// #96A4C6
// #6577A4
// #415689  Logo
// #293E72
// #122556

// Text related colors -> based on background as #CCE0F2
// Text should have contrast of at least 4.5:1 against background(Recommended by WCAG)
// #122556  Navy Blue - contrast 12.52
// #293E72  Dark Blue - contrast 8.07
// #415689  Indigo Gray - okay for normal text / contrast 5.67
// #6577A4  Medium Gray - okay for large text / constrast 4.18

import { useColorMode } from '@chakra-ui/react';


const Colors = () => {
    const {colorMode} = useColorMode();
    const isLight = colorMode === 'light';

    return isLight ?
    {
        //Main Palette
        MAIN1: '#F3F9FE',  // Lightest
        MAIN2: '#E1EEF9',
        MAIN3: '#CCE0F2',  // Main Background
        MAIN4: '#B5D0E8',
        MAIN5: '#9CBDDB',

        //Secondary Palette
        SECONDARY1: '#96A4C6',
        SECONDARY2: '#6577A4',
        SECONDARY3: '#415689',  // Logo
        SECONDARY4: '#293E72',
        SECONDARY5: '#122556',

        //Text Color
        TEXT1: '#122556',  // Navy Blue - (12.52)
        TEXT2: '#293E72',  // Dark Blue - (8.07)
        TEXT3: '#415689',  // Indigo Gray - normal text (5.67)
        TEXT4: '#6577A4',  // Medium Gray - large text (4.18)

        // Bright Palette
        BRIGHT1: '#7EB2E5',
        BRIGHT2: '#5397D9',
        BRIGHT3: '#3181CE',
        BRIGHT4: '#0E6BC4',
        BRIGHT5: '#084F93',

    } :
    {
        // Main Palette (Dark backgrounds for layout)
        MAIN1: '#1A202C',  // Deep slate blue - lightest dark background
        MAIN2: '#1E2733',
        MAIN3: '#232F3E',  // Primary background for containers
        MAIN4: '#2C3A52',
        MAIN5: '#3C4C66',

        // Secondary Palette (accent elements, sidebars, cards)
        SECONDARY1: '#5D6F94',
        SECONDARY2: '#7485A6',
        SECONDARY3: '#AAB8D4',  // Logo-like soft highlight
        SECONDARY4: '#CBD5E0',
        SECONDARY5: '#E2E8F0',

        // Text Colors (on dark backgrounds)
        TEXT1: '#F7FAFC',   // White
        TEXT2: '#E2E8F0',   // Light gray-blue
        TEXT3: '#CBD5E0',   // For secondary emphasis
        TEXT4: '#A0AEC0',   // For muted/inactive text

        // Bright Palette (preserving vibrancy in dark UI)
        BRIGHT1: '#3D8ACF',
        BRIGHT2: '#2C78C4',
        BRIGHT3: '#2168B3',
        BRIGHT4: '#15599E',
        BRIGHT5: '#0C417A',
    }
}
// {
//     Light: {
//         //Main Palette
//         MAIN1: '#F3F9FE',  // Lightest
//         MAIN2: '#E1EEF9',
//         MAIN3: '#CCE0F2',  // Main Background
//         MAIN4: '#B5D0E8',
//         MAIN5: '#9CBDDB',

//         //Secondary Palette
//         SECONDARY1: '#96A4C6',
//         SECONDARY2: '#6577A4',
//         SECONDARY3: '#415689',  // Logo
//         SECONDARY4: '#293E72',
//         SECONDARY5: '#122556',

//         //Text Color
//         TEXT1: '#122556',  // Navy Blue - (12.52)
//         TEXT2: '#293E72',  // Dark Blue - (8.07)
//         TEXT3: '#415689',  // Indigo Gray - normal text (5.67)
//         TEXT4: '#6577A4',  // Medium Gray - large text (4.18)

//         THEME: '#5A67BA',
//         // HomePage
//         HomepageBG:'#FFFFFF',
//         RoutineBG:'#5A67BA',
//         SkinAnalysisBG: '#3182CE',

//         LeaderBoardFont: '#5A67BA',
//         LeaderBoardCard: '#1E1F24',

//         //Login, Signup
//         INPUTBG:  '#E3EDF9',

//         //SkinLab
//         ImageBorder: '#90cdf4',
//         BoxBoarder: '#2b88ed',

//         //Survey
//         SurveyBG: '#C3D7F0'
//     }
// }
export default Colors;