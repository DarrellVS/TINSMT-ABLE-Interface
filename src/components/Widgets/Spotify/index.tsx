import { Box, Text, Button, Image, Progress, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  BsArrowRepeat,
  BsChevronLeft,
  BsChevronRight,
  BsPause,
  BsPlay,
  BsShuffle,
  BsVolumeMute,
} from "react-icons/bs";
import useSpotify from "../../../hooks/useSpotify";
import ControlButton from "./ControlButton";

export default function Spotify() {
  const {
    isAuthed,
    playerState,
    toggleShuffle,
    togglePlayPause,
    skip,
    authUrl,
    toggleRepeat,
  } = useSpotify();

  return (
    <Box>
      {isAuthed ? (
        playerState ? (
          <Box>
            <Box position="relative">
              <Image
                src={playerState.item.album.images[0].url}
                alt="Track image"
                rounded="14px"
                h="12rem"
                w="25rem"
                objectFit="cover"
                filter="brightness(0.4)"
              />

              <Box position="absolute" left="0" top="0" right="0" p="1.25rem">
                <Text fontSize="2rem" noOfLines={1}>
                  {playerState.item.name}
                </Text>
                <Text fontSize="1.25rem" noOfLines={1}>
                  {playerState.item.artists[0].name}
                </Text>

                <Progress
                  min={0}
                  max={playerState.item.duration_ms}
                  value={playerState.progress_ms}
                  rounded="full"
                  mt="1.5rem"
                />

                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  mt=".5rem"
                >
                  <Text>
                    {new Date(playerState.progress_ms)
                      .toISOString()
                      .substr(14, 5)}
                  </Text>
                  <Text>
                    {new Date(playerState.item.duration_ms)
                      .toISOString()
                      .substr(14, 5)}
                  </Text>
                </Flex>
              </Box>
            </Box>

            <Flex
              justifyContent="space-between"
              alignItems="center"
              p="1.25rem"
              pb="1rem"
            >
              <ControlButton
                icon={<BsShuffle />}
                isEnabled={playerState.shuffle_state}
                onClick={toggleShuffle}
              />
              <ControlButton icon={<BsChevronLeft />} onClick={skip.previous} />
              <ControlButton
                icon={
                  playerState.is_playing ? (
                    <BsPause size="1.5rem" />
                  ) : (
                    <BsPlay size="1.5rem" />
                  )
                }
                aria-label="play pause"
                onClick={togglePlayPause}
              />
              <ControlButton icon={<BsChevronRight />} onClick={skip.next} />
              <ControlButton
                icon={<BsArrowRepeat />}
                isEnabled={playerState.repeat_state === "track"}
                onClick={toggleRepeat}
              />
              <ControlButton
                icon={<BsVolumeMute />}
                isEnabled={playerState.device.volume_percent === 0}
                onClick={toggleShuffle}
              />
            </Flex>
          </Box>
        ) : (
          <Text p="2rem">Nothing is playing!</Text>
        )
      ) : (
        <Box p="2rem">
          <Link href={authUrl} target="_blank">
            <Button colorScheme="green" h="auto" py="1rem" px="2rem">
              Login to Spotify
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}
