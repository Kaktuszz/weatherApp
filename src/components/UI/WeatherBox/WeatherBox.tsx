import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { conditions, dayRn, monthRn } from "../../../helpers";
import { BiWind } from "react-icons/bi";
import { GiSunset, GiSunrise } from "react-icons/gi";

export const WeatherBox = (props: any) => {
  const timeOnly = String(props.time).substring(11, 16);
  const dayOnly = String(props.time).substring(0, 10);
  const dateOnly = String(props.time).substring(8, 10);
  const month = String(props.day).substring(5, 7);
  const day = String(props.day).substring(8, 10);

  return (
    <>
      <Flex>
        <Card
          id={dayOnly}
          margin={props.margin}
          w={props.w}
          h={props.h}
          align={props.align}
        >
          <CardBody>
            <Text align="center">{timeOnly}</Text>
            {props.prevDay && props.nextDay ? (
              <>
                <Button onClick={props.prevDay} margin={props.margin} size="xs">
                  PrevDay
                </Button>
                <Button onClick={props.nextDay} margin={props.margin} size="xs">
                  NextDay
                </Button>
              </>
            ) : (
              ""
            )}
            <HStack>
              {props.day ? (
                <>
                  <Text align="center">{conditions(props.weathercode)}</Text>
                  <Heading size="lg">
                    {month} {day}
                  </Heading>
                </>
              ) : (
                <Text align="center">{conditions(props.weathercode)}</Text>
              )}
            </HStack>
            {props.maxT && props.minT ? (
              <>
                <HStack>
                  <Text>Max: {props.maxT}°C</Text>
                </HStack>
                <HStack>
                  <Text>Min: {props.minT}°C</Text>
                </HStack>
                <HStack>
                  <BiWind />
                  <Text>{props.windSpeed}km/h</Text>
                  <GiSunrise />
                  <Text>{String(props.sunrise).substring(11, 16)}</Text>
                  <GiSunset />
                  <Text>{String(props.sunset).substring(11, 16)}</Text>
                </HStack>
              </>
            ) : (
              <Text align="center">{props.temperature}°C</Text>
            )}
            {props.time ? (
              <>
                <Text align="center">{dayRn(dayOnly)}</Text>
                <Text align="center">{dateOnly}</Text>
                <Text align="center">{monthRn(dayOnly)}</Text>
              </>
            ) : (
              ""
            )}
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};
