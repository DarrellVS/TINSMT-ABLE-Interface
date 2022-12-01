import { Box, Text, Grid } from "@chakra-ui/react";
import React, { useState } from "react";

function CalcButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      onClick={onClick}
      py=".5rem"
      _hover={{
        background: "rgba(255, 255, 255, .1)",
      }}
      rounded="md"
    >
      {label}
    </Box>
  );
}

export default function Calculator() {
  const [answer, setAnswer] = useState();
  const [input, setInput] = useState("");

  const handleInput = (val: string) => {
    setInput(input + val);
  };

  const handleClear = () => {
    setInput("");
    setAnswer(undefined);
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleEqual = () => {
    setAnswer(eval(input));
    setInput("");
  };

  return (
    <Grid templateRows="2rem 4rem auto">
      <Text>{input}</Text>
      <Box
        color="white"
        p="1rem"
        fontSize="2rem"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        {answer}
      </Box>

      <Grid templateColumns="1fr 1fr 1fr 1fr" templateRows="1fr 1fr 1fr 1fr">
        <CalcButton label="C" onClick={handleClear} />
        <CalcButton label="←" onClick={handleBackspace} />
        <Box></Box>
        <CalcButton label="÷" onClick={() => handleInput("/")} />
        <CalcButton label="7" onClick={() => handleInput("7")} />
        <CalcButton label="8" onClick={() => handleInput("8")} />
        <CalcButton label="9" onClick={() => handleInput("9")} />
        <CalcButton label="x" onClick={() => handleInput("*")} />
        <CalcButton label="4" onClick={() => handleInput("4")} />
        <CalcButton label="5" onClick={() => handleInput("5")} />
        <CalcButton label="6" onClick={() => handleInput("6")} />
        <CalcButton label="-" onClick={() => handleInput("-")} />
        <CalcButton label="1" onClick={() => handleInput("1")} />
        <CalcButton label="2" onClick={() => handleInput("2")} />
        <CalcButton label="3" onClick={() => handleInput("3")} />
        <CalcButton label="+" onClick={() => handleInput("+")} />
        <Box></Box>
        <CalcButton label="0" onClick={() => handleInput("0")} />
        <CalcButton label="." onClick={() => handleInput(".")} />
        <CalcButton label="=" onClick={handleEqual} />
      </Grid>
    </Grid>
  );
}
