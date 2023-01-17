import { Box, Button, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { CalendarType } from "../../../interfaces/msal";
import {
  callMsGraph,
  GraphEndpoints,
  useAccessToken,
  useMsalAuth,
} from "../../../utils/msal";

export default function Calendar() {
  const accessToken = useAccessToken();
  const msalAuth = useMsalAuth();
  const [calendars, setCalendars] = useState<any>();
  const [calendarView, setCalendarView] = useState<any>();

  // current datetime
  const now = new Date();
  // start of the day
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).toISOString();

  // end of the day
  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  ).toISOString();

  const fetchCalendarView = useCallback(
    async (id: string) => {
      const response = await callMsGraph({
        accessToken,
        endpoint: GraphEndpoints.calendarView,
        urlVariables: {
          id,
        },
        params: {
          startDateTime: start,
          endDateTime: end,
        },
      });

      setCalendarView(response.value);
    },
    [accessToken, end, start]
  );

  useEffect(() => {
    if (!accessToken) return;

    callMsGraph({
      accessToken,
      endpoint: GraphEndpoints.calendars,
    }).then((response) => {
      setCalendars(response.value);
    });
  }, [accessToken]);

  useEffect(() => {
    if (!calendars) return;

    fetchCalendarView(calendars[0].id);
  }, [calendars, fetchCalendarView]);

  return (
    <Box p="2rem">
      {!msalAuth.isAuthenticated ? (
        <Button
          colorScheme="green"
          h="auto"
          py="1rem"
          px="2rem"
          onClick={msalAuth.login}
        >
          Login with Microsoft
        </Button>
      ) : calendars ? (
        <>
          <Grid templateRows="auto auto" gap="1rem">
            <Box
              maxH="20rem"
              overflow="auto"
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {calendarView ? (
                calendarView.length === 0 && (
                  <Text fontSize="1.25rem" fontWeight="bold">
                    No events today!
                  </Text>
                )
              ) : (
                <Spinner />
              )}
              {calendarView?.map((event: any) => {
                const startDate = new Date(event.start.dateTime);
                const endDate = new Date(event.end.dateTime);

                return (
                  <Box
                    key={event.id}
                    rounded="8px"
                    bg="whiteAlpha.200"
                    p="1rem"
                    mb={
                      calendarView.indexOf(event) === calendarView.length - 1
                        ? 0
                        : "1rem"
                    }
                  >
                    <Text fontSize="1.25rem" fontWeight="bold">
                      {event.subject}
                    </Text>
                    <Flex alignItems="center" gap=".5rem">
                      <Text>
                        {startDate.getHours()}:
                        {("0" + startDate.getMinutes()).slice(-2)}
                      </Text>
                      <Text>-</Text>
                      <Text>
                        {endDate.getHours()}:
                        {("0" + endDate.getMinutes()).slice(-2)}
                      </Text>
                    </Flex>
                  </Box>
                );
              })}
            </Box>

            <Box
              overflow="auto"
              whiteSpace="nowrap"
              w="25rem"
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {calendars.map((calendar: CalendarType, index: number) => (
                <Flex
                  key={calendar.id}
                  bg="whiteAlpha.200"
                  rounded="8px"
                  cursor="pointer"
                  _hover={{ bg: "whiteAlpha.300" }}
                  _active={{ bg: "whiteAlpha.400" }}
                  transition="background .1s ease-in-out"
                  maxW="14rem"
                  px="1rem"
                  py="0.75rem"
                  display="inline-block"
                  mr={index === calendars.length - 1 ? 0 : "1rem"}
                  onClick={() => fetchCalendarView(calendar.id)}
                >
                  {calendar.name}
                </Flex>
              ))}
            </Box>
          </Grid>
          {/* <Button onClick={msalAuth.logout}>Logout</Button> */}
        </>
      ) : (
        <Spinner />
      )}
    </Box>
  );
}
