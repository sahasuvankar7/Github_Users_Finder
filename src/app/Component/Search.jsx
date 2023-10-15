"use client";
import React, { useState } from "react";
import { Button, Center, Input, Flex, useToast } from "@chakra-ui/react";

const Search = ({ setLoading, setUserData }) => {
  const [query, setQuery] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if there is no query
    if (!query) return;
    // before searching the query , make setLoading is true and setUserData as false;
    setLoading(true);
    setUserData(false);

    // here fetching the data
    try {
      const res = await fetch(`https://api.github.com/users/${query}`);
      const data = await res.json();
      console.log(data);
      // if data is found or data.message is not found
      if (data.message) {
        return toast({
          title: "error",
          description:
            data.message === "Not Found" ? "user not found" : data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      // set searched data as data in UI
      setUserData(data);

      // whenever we found any data we put the user name into our brower local storage which is for search history.
      addUserToLocalStorage(data,query);
    } catch (error) {
      console.error("some error occured");
      toast({
        title: "error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // implementing localStorage function
  const addUserToLocalStorage = (data, username)=>{
    const users = JSON.parse(localStorage.getItem('github-users')) || [];
    const userExists = users.find(user=>user.id === username);
    if(userExists){
      users.splice(users.indexOf(userExists), 1);
    }
    // The unshift method is an array method in JavaScript that adds one or more elements to the beginning of an array.

    users.unshift({
      id:username,
      avatar_url:data.avatar_url,
      name:data.name,
      url:data.html_url,
    });
    localStorage.setItem('github-users', JSON.stringify(users));
  }
  return (
    <form onClick={handleSubmit}>
      <Flex>
        <Input
          style={{ width: "820px" }}
          mx="2"
          variant={"outline"}
          placeholder="Type a username (i.e - sahasuvankar7)"
          focusBorderColor="green.500"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Center>
          <Button disabled={!query} opacity={!query ? 0.5 : 1}>
            Search
          </Button>
        </Center>
      </Flex>
    </form>
  );
};

export default Search;
