import { Box, Button, Flex, Grid, Spinner } from "@chakra-ui/react";
import { CalendarType } from "../../../interfaces/msal";
import {
  GraphEndpoints,
  useAccessToken,
  useMsalAuth,
  useMsGraph,
} from "../../../utils/msal";

export default function Calendar() {
  const accessToken = useAccessToken();
  const msalAuth = useMsalAuth();

  const me = useMsGraph({
    accessToken,
    endpoint: GraphEndpoints.me,
  });

  const calendars = useMsGraph({
    accessToken,
    endpoint: GraphEndpoints.calendars,
  });

  const calendarView = useMsGraph({
    accessToken,
    endpoint: GraphEndpoints.calendarView,
  });

  console.log(calendarView);

  // current datetime
  const now = new Date();
  // start of the day
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).toISOString();
  console.log("start", start);

  // end of the day
  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  ).toISOString();
  console.log("end", end);

  return (
    <Box p="2rem">
      {!msalAuth.isAuthenticated ? (
        <Button onClick={msalAuth.login}>Login</Button>
      ) : calendars?.data?.value ? (
        <>
          <Grid templateColumns="auto auto">
            <Flex direction="column" textAlign="left" gap="1rem">
              {calendars.data.value.map((calendar: CalendarType) => (
                <Box
                  key={calendar.id}
                  px="1rem"
                  py=".75rem"
                  bg="whiteAlpha.200"
                  rounded="8px"
                  cursor="pointer"
                  _hover={{ bg: "whiteAlpha.300" }}
                  _active={{ bg: "whiteAlpha.400" }}
                  transition="background .1s ease-in-out"
                  maxW="14rem"
                >
                  {calendar.name}
                </Box>
              ))}
            </Flex>
          </Grid>
          <Button onClick={msalAuth.logout}>Logout</Button>
        </>
      ) : (
        <Spinner />
      )}
    </Box>
  );
}
