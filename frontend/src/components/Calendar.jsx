import { Box, Grid, Text, VStack, Image, Divider, Flex } from "@chakra-ui/react";
import fireIcon from "../assets/fire.png";
import Colors from "../utils/Colors";


const FireIcon = (props) => (
  <Image src={fireIcon} boxSize="24px" objectFit='contain' {...props} />
);

const Calendar = () => {

  const colors = Colors();
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

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
    <VStack id="home-calendar" borderRadius="xl" bg={colors.MAIN3}>
      <Flex id="home-calendar-streak">
        <FireIcon boxSize="5vw" />
        <Text fontWeight="bold" fontSize="1.7vw" color={colors.TEXT4}>x1</Text>
      </Flex>
      <Text fontWeight="semibold" fontSize="1.6vw" color={colors.TEXT4}>{monthNames[currentMonth]} {currentYear}</Text>
      <Divider borderColor={colors.TEXT4} borderWidth="1px" m={2} />
      <Grid templateColumns="repeat(7, 1fr)" w="100%">
        {weekdays.map((d, index) => (
          <Text key={index} fontWeight="bold" fontSize="sm" textAlign="center" mb={1} color={colors.TEXT4}>{d}</Text>
        ))}

        {calendarDays.map((day, i) => (
          <Box className="home-calendar-day" key={i} bg={streakDays.includes(day) ? '#FFCE51' : day ? colors.MAIN2 : 'transparent'}>
            {streakDays.includes(day + 1) && streakDays.includes(day) ? <FireIcon /> : streakDays.includes(day - 1) && streakDays.includes(day) ? <FireIcon /> : ""}
          </Box>
        ))}
      </Grid>
    </VStack>
  );
};

export default Calendar;
