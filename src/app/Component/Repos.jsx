"use client";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Flex,
  Link,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";

const Repos = ({ reposUrl }) => {
  const toast = useToast();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showmore, setShowmore] = useState(false);
  console.log(repos);

  // whenever there is concept of fetching data . and after feteching data there is possibility of changing UI , In these cases we use "useEffect" hooks.

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await fetch(reposUrl);
        const data = await res.json();
        if (data.message) throw new Error(data.message);
        setRepos(data);
      } catch (error) {
        toast({
          title: "error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchRepo();
  }, [reposUrl, toast]);
  return (
    <>
      <Text
        textAlign={"center"}
        letterSpacing={1.5}
        fontSize={"3xl"}
        fontWeight={"bold"}
        color={"purple.400"}
        mt={4}
      >
        REPOSITORIES
      </Text>
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} my={4} />
        </Flex>
      )}
      {repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .map((repo, idx) => {
          // if index > 4 and showmore state is true then return null
          if (idx > 4 && !showmore) return null;
          return (
            <Flex
              key={repo.id}
              padding={4}
              bg={"whiteAlpha.200"}
              _hover={{ bg: "whiteAlpha.400" }}
              my={4}
              px={10}
              gap={4}
              transition={"all 0.3s ease"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex flex={1} direction={"column"}>
                <Link href={repo.html_url} fontSize={"md"} fontWeight={"bold"}>
                  {repo.name}
                </Link>
                <Badge
                  fontSize={"0.7em"}
                  colorScheme={"purple"}
                  w={"min-content"}
                  textAlign={"center"}
                  px={1}
                  mt={1}
                >
                  Language : {repo.language || "None"}
                </Badge>
              </Flex>
              <Flex flex={1} gap={4} ml={6}>
                <Badge
                  fontSize={"0.9em"}
                  colorScheme={"orange"}
                  flex={1}
                  textAlign={"center"}
                >
                  Start : {repo.stargazers_count}
                </Badge>
                <Badge
                  fontSize={"0.9em"}
                  colorScheme={"cyan"}
                  flex={1}
                  textAlign={"center"}
                >
                  Forks : {repo.forks_count}
                </Badge>
                <Badge
                  fontSize={"0.9em"}
                  colorScheme={"pink"}
                  flex={1}
                  textAlign={"center"}
                >
                  Watchers : {repo.watchers_count}
                </Badge>
              </Flex>
            </Flex>
          );
        })}
      {showmore && (
        <Flex justifyContent={"center"} my={4}>
          <Button
            size="md"
            colorScheme="purple"
            onClick={() => setShowmore(false)}
          >
            {" "}
            show less
          </Button>
        </Flex>
      )}
      {!showmore && repos.length > 5 && (
        <Flex justifyContent={"center"} my={4}>
          <Button
            size="md"
            colorScheme="purple"
            onClick={() => setShowmore(true)}
          >
            {" "}
            show More
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Repos;
