import { Image, Tabs, TabList, Tab, VStack, Flex, Text, Heading } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserCard from "../components/UserCard.jsx"
import LeaderboardPodium from "../components/LeaderPodium.jsx"
import mascot from "../assets/mascot.gif"
import Colors from '../utils/Colors';
import { fetchLeaderboard } from "../API/API.jsx"

const LeaderboardPage = ({ user }) => {
  const colors = Colors();

  const navigate = useNavigate();
  const [primaryTab, setPrimaryTab] = useState("cumulative")
  const [leaderboard, setLeaderboard] = useState([]);
  const [topboard, setTopboard] = useState([]);
  const [name, setName] = useState("");


  useEffect(() => {
    const getLeaderboard = async () => {
      const leaderboard = await fetchLeaderboard();
      console.log("Fetched Leaderboard data:", leaderboard);
      setLeaderboard(leaderboard);
      const top = leaderboard.slice(0, 3);
      setTopboard(top);

    };
    setName(user.username);
    getLeaderboard();
  }, [navigate]);

  return (
    <Flex direction="column" width="full" alignItems={"center"}>
      <VStack align="center" spacing={2} m={5} flex={1}>

        <Heading fontFamily='Feather Bold'>Leaderboard</Heading>

      </VStack>
      <Flex w="full" direction={{ lg: "row", md: "row", sm: "column" }} justifyContent="center" alignItems={"center"} bg={colors.BRIGHT5} height="full">
        <Flex flex={1} display={{ lg: "none", md: "none", sm: "flex" }} mt={90} mb={5} justifyContent={" center"} alignItems="center">
          <LeaderboardPodium flex={1} first={topboard[0] || { username: "", streak: 0 }}
            second={topboard[1] || { username: "", streak: 0 }}
            third={topboard[2] || { username: "", streak: 0 }} />
        </Flex>
        <VStack alignItems="center" height="500px" overflowY="auto" flex={{ base: 2, md: 1, lg: 1 }} p={5} sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
          {leaderboard.map((user, index) => (
            <UserCard key={index} user={user} name={name} />
          ))}

        </VStack>
        <Flex display={{ lg: "flex", md: "flex", sm: "none" }} direction="column" flex={1} justifyContent={"center"} alignItems="center">
          <LeaderboardPodium flex={1} first={topboard[0] || { username: "", points: 0 }}
            second={topboard[1] || { username: "", points: 0 }}
            third={topboard[2] || { username: "", points: 0 }} />
          <Image src={mascot} alt="mascot.gif" boxSize="50%" mt={10} flex={1} ></Image>
        </Flex>

        <Flex flex={1} display={{ lg: "none", md: "none", sm: "flex" }} px={5} mb={5} justifyContent={" center"} alignItems="center">
          <Image src={mascot} alt="mascot.gif" boxSize="100px"  ></Image>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            ml={5}
            textColor={colors.MAIN1}
            textAlign="center"
            fontWeight="bold"
            mt={5}
          >
            Keep up the good work!
          </Text>

        </Flex>
      </Flex >
    </Flex>
  )
}

export default LeaderboardPage
