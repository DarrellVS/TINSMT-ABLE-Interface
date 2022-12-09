import { Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

enum PROGRESS {
  VISIBLE = 0,
  HIDDEN = 1,
  EXIT = 2,
}

export default function Welcome({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(PROGRESS.VISIBLE);

  useEffect(() => {
    setTimeout(() => {
      setProgress(PROGRESS.HIDDEN);

      setTimeout(() => {
        setProgress(PROGRESS.EXIT);
      }, 1000);
    }, 1000);
  }, []);

  return (
    <>
      <Flex
        background="linear-gradient(135deg, rgba(17,22,34,1) 0%, rgba(32,32,82,1) 100%)"
        position="absolute"
        left="0"
        right="0"
        top="0"
        bottom="0"
        alignItems="center"
        justifyContent="center"
        opacity={progress === PROGRESS.VISIBLE ? 1 : 0}
        transition="opacity 1s"
        zIndex="1000000"
        pointerEvents="none"
      >
        <Image src="/logo/svg.svg" alt="Logo" w="40rem" />
      </Flex>
      {children}
    </>
  );
}
