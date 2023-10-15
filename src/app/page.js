"use client";
import Navbar from "./Component/Navbar";
import Image from "next/image";
import styles from "./page.module.css";
import { Button, Container, Text } from "@chakra-ui/react";
import Search from "./Component/Search";
import { useState } from "react";
import UserProfile from "./Component/UserProfile";

export default function Home() {
  // for showing user data
  const [userData, setUserData] = useState(null);
  // when we enter search there loading symbol for searching the feteched data
  const [loading, setLoading] = useState(false);

  console.log(userData);
  return (
    <Container maxW="container.lg">
      <Navbar />
      <Text fontSize={"2xl"} textAlign={"center"} my="4">
        Search Users on Github
      </Text>
      <Search setUserData={(res) => setUserData(res)} setLoading={setLoading} />
      {/* if you had user data then render this UserProfile otherwise don't */}
      {userData && <UserProfile userData={userData} />}
    </Container>
  );
}
