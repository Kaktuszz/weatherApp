import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { fullDate } from "../../helpers";
import { WeatherBox } from "../UI/WeatherBox/WeatherBox";
import { useEffect, useState } from "react";
import { weatherCall } from "../../apiCalls";

export const WeatherTable = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<any>([]);
  const fetchData = weatherCall(null, null);
  const dayHour = fullDate();

  useEffect(() => {
    fetchData()
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!weather) {
    return (
      <div>
        <button onClick={() => console.log(weather)}>
          Error loading weather data
        </button>
      </div>
    );
  }

  const startIndex = weather.hourly.time.findIndex(
    (time: string) => time > dayHour
  );
  const filteredTime = weather.hourly.time.slice(startIndex - 1);

  return (
    <>
      <Box maxW="1000px" height="230px" overflowX="auto">
        <Flex>
          {filteredTime.map((time: string, index: number) => (
            <WeatherBox
              key={startIndex+index-1}
              time={time}
              condition={weather.hourly.cloud_cover[startIndex+index-1]}
              temperature={weather.hourly.temperature_2m[startIndex+index-1]}
              weathercode={weather.hourly.weather_code[startIndex+index-1]}
            />
          ))}
        </Flex>
      </Box>
    </>
  );
};
