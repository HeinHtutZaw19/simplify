import { Box, Grid, Text, VStack, Image, Divider, Flex } from "@chakra-ui/react";
import fireIcon from "../assets/fire.png"; // Replace with your fire emoji/icon
const FireIcon = (props) => (
    <Image src={fireIcon} boxSize="24px" objectFit='contain' {...props} />
);
  

const Calendar = () => {
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

    const today = new Date();
    const currentMonth = today.getMonth(); // 0 = January, 11 = December
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday, 1 = Monday...
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    //User's Streak Days
    const streakDays = [5, 6, 7, 8, 9, 15, 20, 21, 26];


  return (
    <Box bg="#CCE0F2" borderRadius="xl" p={4} w="100%" maxW="400px">
      <VStack spacing={2}>
        <Flex direction='row' justifyContent='center' alignItems='center'>
            {/* <Image src={fireIcon} /> */}
            <FireIcon boxSize={20}/>
            <Text fontWeight="bold" fontSize="xl" color="#798B9F">x1</Text>
        </Flex>
        <Text fontWeight="semibold" fontSize="lg" color="#798B9F">JAN 2022</Text>
        <Divider borderColor="#798B9F" borderWidth="1px" />
        <Grid templateColumns="repeat(7, 1fr)" gap={5} >
          {weekdays.map((d) => (
            <Text key={d} fontWeight="bold" fontSize="sm" textAlign="center" color="#798B9F">{d}</Text>
          ))}

          {calendarDays.map((day, i) => (
            <Box
              key={i}
              w={6}
              h={6}
              borderRadius="full"
              mx="auto"
              bg={streakDays.includes(day) ? '#FFCE51' : day ? '#EDEFF1' : 'transparent'}
              display = 'flex'
              alignItems='center'
              justifyContent='center'
            >
              {streakDays.includes(day+1)&&streakDays.includes(day) ? <FireIcon/> : streakDays.includes(day-1)&&streakDays.includes(day) ? <FireIcon/> : ""}
            </Box>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default Calendar;
