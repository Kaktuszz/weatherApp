import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { fullDate, geolocation } from "../../helpers";
import { WeatherBox } from "../UI/WeatherBox/WeatherBox";
import { useEffect, useState } from "react";
import { weatherCall } from "../../apiCalls";

export const WeatherTable = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<any>([]);
  const dayHour = fullDate();

  //// загружати функцію з вставлянням локації першим
  useEffect(() => {
    const dataFetcher = async () => {
      try {
        const localData = await geolocation();
        if (localData) {
          const fetchData = await weatherCall(
            localData.latitude,
            localData.longitude
          );
          const data = await fetchData();
          setWeather(data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    dataFetcher();
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
              key={startIndex + index - 2}
              time={time}
              condition={weather.hourly.cloud_cover[startIndex + index - 2]}
              temperature={
                weather.hourly.temperature_2m[startIndex + index - 2]
              }
              weathercode={weather.hourly.weather_code[startIndex + index - 2]}
            />
          ))}
        </Flex>
      </Box>
    </>
  );
};
