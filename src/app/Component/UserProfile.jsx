import {
  Avatar,
  Button,
  Flex,
  VStack,
  Badge,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import Repos from "./Repos";

function UserProfile({ userData }) {
  const createdAt = userData.created_at; // Example date in ISO 8601 format

  // Create a Date object from the ISO 8601 date string
  const date = new Date(createdAt);

  // Extract the date portion in YYYY-MM-DD format
  const formattedDate = date.toISOString().split("T")[0];

  return (
    <>
      <Flex
        my={16}
        border={"2px solid"}
        borderColor={"purple.500"}
        borderRadius={4}
        padding={8}
        backgroundColor={"#072541"}
      >
        <VStack gap={5}>
          <Avatar size="xl" name={userData.name} src={userData.avatar_url} />
          <Button colorScheme="purple">
            <a href={userData.html_url} target="_blank">
              View Profile
            </a>
          </Button>
        </VStack>

        <VStack ml={8} alignItems={"self-start"}>
          <Flex gap={4}>
            <Badge colorScheme="green">
              Public Repo:{userData.public_repos}
            </Badge>
            <Badge colorScheme="red">
              Public gists:{userData.public_gists}
            </Badge>
            <Badge colorScheme="purple">Followers:{userData.followers}</Badge>
            <Badge colorScheme="yellow">Following:{userData.following}</Badge>
          </Flex>
          <Text fontSize="2xl" fontWeight="bold" color={"purple.300"}>
            {userData.name}
          </Text>
          <Text fontSize="md" fontWeight="bold" color={"purple.400"}>
            {userData.bio}
          </Text>
          <Box>
            <Text fontSize="md">
              <Text as={"span"} fontWeight="bold" color={"purple.200"} mr={"1"}>
                Company:
              </Text>
              {userData.company || "Not Specified"}
            </Text>
            <Text fontSize="md">
              <Text as={"span"} fontWeight="bold" color={"purple.200"} mr={"1"}>
                Location:
              </Text>
              {userData.location || "Not Specified"}
            </Text>
            <Text fontSize="md">
              <Text as={"span"} fontWeight="bold" color={"purple.200"} mr={"1"}>
                Member Since:
              </Text>
              {formattedDate || "Not Specified"}
            </Text>
            <Text fontSize="md">
              <Text as={"span"} fontWeight="bold" color={"purple.200"} mr={"1"}>
                blog/Website:
              </Text>
              {userData.blog ? (
                <a href={userData.blog} target="_blank">
                  {userData.blog}{" "}
                </a>
              ) : (
                "Not Specified"
              )}
            </Text>
          </Box>
        </VStack>
      </Flex>
      {/* here repos url gives us the whole repository as an object  */}
      <Repos reposUrl={userData.repos_url} />
    </>
  );
}

export default UserProfile;
