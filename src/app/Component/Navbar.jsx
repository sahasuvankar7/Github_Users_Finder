"use client";
import React from "react";
import { Flex, Spacer, Box, Button, useDisclosure } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import HistoryModal from "./HistoryModal";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex justifyContent="center" my="10">
      <Box bg="white" p="1" borderRadius={5}>
        <Image
          width={50}
          objectFit="cover"
          src="https://i.pinimg.com/originals/30/b1/50/30b150cd489202db131009ac9540cec0.png"
          alt="_blank"
        />
      </Box>
      <Spacer />
      <Button colorScheme="whatsapp" size="lg" onClick={onOpen}>
        Search history
      </Button>
      {isOpen && <HistoryModal isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
}

export default Navbar;
