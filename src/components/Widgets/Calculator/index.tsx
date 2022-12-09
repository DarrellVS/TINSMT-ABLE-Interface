import { Box, Text, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import CalcButton from "./CalculatorButton";

export default function Calculator() {
  const [answer, setAnswer] = useState();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleInput = (val: string) => {
    setError(undefined);
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
    try {
      setAnswer(eval(input));
    } catch (error) {
      setError("Invalid Expression");
      setAnswer(undefined);
    }
    setInput("");
  };

  return (
    <Grid templateRows="2rem 4rem auto" p="2rem" pb="0">
      <Text fontWeight="bold" opacity={0.6} fontSize="20px">
        {input}
      </Text>
      <Box
        fontSize="2rem"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        fontWeight="bold"
        color={error ? "red.500" : "white"}
      >
        {error ? error : answer}
      </Box>

      <Grid
        templateColumns="1fr 1fr 1fr 1fr"
        templateRows="1fr 1fr 1fr 1fr"
        w="20rem"
        gap=".75rem"
      >
        <CalcButton label="C" onClick={handleClear} />
        <CalcButton label="←" onClick={handleBackspace} />
        <Box bg="#1E2840" rounded="md"></Box>
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
        <Box bg="#1E2840" rounded="md"></Box>
        <CalcButton label="0" onClick={() => handleInput("0")} />
        <CalcButton label="." onClick={() => handleInput(".")} />
        <CalcButton label="=" onClick={handleEqual} />
      </Grid>
    </Grid>
  );
}
