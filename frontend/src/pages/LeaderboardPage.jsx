import { Image, Tabs, TabList, Tab, VStack, Flex } from "@chakra-ui/react"
import { useState } from "react"
import UserCard from "../components/UserCard.jsx"
import LeaderboardPodium from "../components/LeaderPodium.jsx"
import mascot from "../assets/mascot.gif"

const THEME_COLOR = "#5A67BA"

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
  const [primaryTab, setPrimaryTab] = useState("cumulative")
  const [secondaryTab, setSecondaryTab] = useState("regional")

  return (
    <Flex direction="column" width="full" alignItems={"center"}>
      <VStack align="center" spacing={2} m={5} flex={1}>
        <Tabs
          mt={2}
          index={primaryTab === "cumulative" ? 0 : 1}
          onChange={(i) => setPrimaryTab(i === 0 ? "cumulative" : "monthly")}
          variant="outline"
        >
          <TabList>
            <Tab
              _selected={{ bg: THEME_COLOR, color: "white" }}
              px={10}
              py={2}
              borderRadius="md"
            >
              Cumulative
            </Tab>
            <Tab
              _selected={{ bg: THEME_COLOR, color: "white" }}
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
              _selected={{ bg: THEME_COLOR, color: "white" }}
              px={4}
              py={2}
              borderRadius="md"
            >
              Regional
            </Tab>
            <Tab
              _selected={{ bg: THEME_COLOR, color: "white" }}
              px={4}
              py={2}
              borderRadius="md"
            >
              Global
            </Tab>
          </TabList>
        </Tabs>
      </VStack>
      <Flex w="full" justifyContent="center" alignItems={"center"} bg={THEME_COLOR} height="full">
        <VStack align="stretch" height="500px" overflowY={"auto"} flex={1} p={5} >
          {mockLeaderboard.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </VStack>
        <Flex direction="column" flex={1} justifyContent={"center"} alignItems="center">
          <LeaderboardPodium flex={1} first={top3[0]} second={top3[1]} third={top3[2]} />
          <Image src={mascot} alt="mascot.gif" boxSize="35%" mt={10} flex={1} ></Image>
        </Flex>

      </Flex>
    </Flex>
  )
}



export default LeaderboardPage
