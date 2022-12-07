import {
  Box,
  Text,
  Button,
  Image,
  Spinner,
  Progress,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { JSXElementConstructor, ReactElement } from "react";
import {
  BsArrowRepeat,
  BsChevronLeft,
  BsChevronRight,
  BsPause,
  BsPlay,
  BsShuffle,
  BsVolumeMute,
} from "react-icons/bs";
import useSpotify from "../../hooks/useSpotify";

function ControlButton({
  icon,
  isEnabled,
  onClick,
}: {
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  isEnabled?: boolean;
  onClick: () => void;
}) {
  return (
    <IconButton
      aria-label="control button"
      icon={icon}
      size="lg"
      _after={{
        content: "''",
        position: "absolute",
        top: "-5px",
        right: "-5px",
        borderRadius: "50%",
        bg: "green.300",
        h: "10px",
        w: "10px",
        opacity: isEnabled ? 1 : 0,
      }}
      onClick={onClick}
    />
  );
}

export default function Spotify() {
  const {
    playerState,
    toggleShuffle,
    togglePlayPause,
    skip,
    getAuthUrl,
    isAuthed,
    toggleRepeat,
    logOut,
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
                filter="brightness(0.65)"
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
              pb=".25rem"
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
        <Link href={getAuthUrl()} target="_blank">
          <Button>Login to Spotify</Button>
        </Link>
      )}
    </Box>
  );
}
