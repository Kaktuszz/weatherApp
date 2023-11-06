import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { conditions, dayRn, monthRn } from "../../../helpers";
export const WeatherBox = (props: any) => {

  const timeOnly = String(props.time).substring(11, 16);
  const dayOnly = String(props.time).substring(0, 10);
  const dateOnly = String(props.time).substring(8, 10);

  return (
    <>
      <Flex>
        <Card id={dayOnly} margin="3px" w="150px" h="200px" align="center">
          <CardBody >
            <Text align="center">{timeOnly}</Text>
            <Text align="center">{conditions(props.weathercode)}</Text>
            <Text align="center">{props.temperature}</Text>
            <Text align="center">{dayRn(dayOnly)}</Text>
            <Text align="center" >{dateOnly}</Text>
            <Text align="center">{monthRn(dayOnly)}</Text>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};
