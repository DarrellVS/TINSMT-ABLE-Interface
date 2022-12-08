import {
  Text,
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { ModalControls } from "../interfaces";

export default function SettingsModal({ isOpen, onClose }: ModalControls) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="3xl">Settings</ModalHeader>
        <ModalBody>
          <Text fontWeight="bold" fontSize="xl" mb=".5rem">
            Color mode
          </Text>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <BsMoon /> : <BsSun />}
            onClick={toggleColorMode}
          />
        </ModalBody>

        <ModalFooter>
          <Button px="2rem" colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
