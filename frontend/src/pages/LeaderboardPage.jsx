import { Image, Tabs, TabList, Tab, VStack, Flex, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkLogin } from "../API/API.jsx"
import UserCard from "../components/UserCard.jsx"
import LeaderboardPodium from "../components/LeaderPodium.jsx"
import mascot from "../assets/mascot.gif"
import Colors from '../utils/Colors';

import { fetchLeaderboard } from "../API/API.jsx"

const mockLeaderboard = [
  { id: 10, name: "User 1", points: 400, trend: "up" },
  { id: 11, name: "User 2", points: 300, trend: "up" },
  { id: 12, name: "Henry", points: 200, trend: "down" },
  { id: 13, name: "User 3", points: 150, trend: "up" },
  { id: 14, name: "User 4", points: 140, trend: "down" },
  { id: 15, name: "User 5", points: 130, trend: "down" },
  { id: 16, name: "User 6", points: 120, trend: "up" },
  { id: 17, name: "User 7", points: 110, trend: "up" },
  { id: 18, name: "User 8", points: 90, trend: "down" },
  { id: 19, name: "User 9", points: 85, trend: "down" },
  { id: 20, name: "User 10", points: 70, trend: "up" },
];

const top3 = [
  { id: "r", name: "Robert", points: 1000, image: "https://hips.hearstapps.com/hmg-prod/images/robert-pattinson-attends-the-national-board-of-review-news-photo-1738604310.pjpeg" },
  { id: "s", name: "Ben", points: 800, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSIHtAeJ2NQipUtMoj7uqdeEk_AZ3Il9DqhRexYxFIh5Jozb2VWKD9D_8Sf8_PqGRuiHOh_H-v9ETCH-eI_fK9_AQ" },
  { id: "j", name: "Christian", points: 500, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSkHfrXAaySqEFgbc9JIG2ZZeoPDSF-5i1ZYlO_XjQQqO1S0l3VO4lGHTiRtkFesFXigOQuXRwlhCMmR6ZfEmdhkQ" },
]

const LeaderboardPage = () => {
  const colors = Colors();

  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [primaryTab, setPrimaryTab] = useState("cumulative")
  const [secondaryTab, setSecondaryTab] = useState("regional")
  const [leaderboard, setLeaderboard] = useState([]);
  const [topboard, setTopboard] = useState([]);
  const [name, setName] = useState("");
  

  useEffect(() => {
    const fetchLoginData = async () => {
      const user = await checkLogin();
      if (!user) {
        navigate('/welcome');
      }
      else {
        const username = user.username;
        setName(username);
        console.log("username:", username);
        setLoaded(true);
      }
    };
    const getLeaderboard = async () => {
      const leaderboard = await fetchLeaderboard();
      console.log("Fetched Leaderboard data:", leaderboard);
      setLeaderboard(leaderboard);
      const top = leaderboard.slice(0,3);
      setTopboard(top);
      
    };
    fetchLoginData();
    getLeaderboard();
  }, [navigate]);

  return (
    <> {loaded &&
    <Flex direction="column" width="full" alignItems={"center"}>
      {/* VStack */}
      <VStack align="center" spacing={2} m={5} flex={1}>
        <Tabs
          mt={2}
          index={primaryTab === "cumulative" ? 0 : 1}
          onChange={(i) => setPrimaryTab(i === 0 ? "cumulative" : "monthly")}
          variant="outline"
        >
          <TabList>
            <Tab
              _selected={{ bg: colors.BRIGHT5, color: colors.MAIN1 }}
              px={10}
              py={2}
              borderRadius="md"
            >
              Cumulative
            </Tab>
            <Tab
              _selected={{ bg: colors.BRIGHT5, color: colors.MAIN1 }}
              px={10}
              py={2}
              borderRadius="md"
            >
              Monthly
            </Tab>
          </TabList>
        </Tabs>

        <Tabs
          index={secondaryTab === "regional" ? 0 : 1}
          onChange={(i) => setSecondaryTab(i === 0 ? "regional" : "global")}
          variant="outline"
        >
          <TabList>
            <Tab
              _selected={{ bg: colors.BRIGHT5, color: colors.MAIN1 }}
              px={4}
              py={2}
              borderRadius="md"
            >
              Regional
            </Tab>
            <Tab
              _selected={{ bg: colors.BRIGHT5, color: colors.MAIN1 }}
              px={4}
              py={2}
              borderRadius="md"
            >
              Global
            </Tab>
          </TabList>
        </Tabs>
      </VStack>
      <Flex w="full" direction={{ lg: "row", md: "row", sm: "column" }} justifyContent="center" alignItems={"center"} bg={colors.BRIGHT5} height="full">
        <Flex flex={1} display={{ lg: "none", md: "none", sm: "flex" }} mt={90} mb={5} justifyContent={" center"} alignItems="center">
          <LeaderboardPodium flex={1} first={top3[0]} second={top3[1]} third={top3[2]} />
        </Flex>
        <VStack alignItems="center" height="500px" overflowY={"auto"} flex={{ base: 2, md: 1, lg: 1 }} p={5} >
          {leaderboard.map((user, index) => (
            <UserCard key={index} user={user} name={name}/>
          ))}
            
          </VStack>
          <Flex display={{ lg: "flex", md: "flex", sm: "none" }} direction="column" flex={1} justifyContent={"center"} alignItems="center">
            <LeaderboardPodium flex={1} first={topboard[0] || { username: "", points: 0 }} 
              second={topboard[1]|| { username: "", points: 0 }}
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
      </Flex>}
    </>
  )
}

export default LeaderboardPage
