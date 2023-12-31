import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { WeatherBox } from "../UI/WeatherBox/WeatherBox";
import { useState } from "react";

export const WeatherTable = ({ weather, loading }: any) => {

  const [day, setDay] = useState(0);

  const addDayHandler = () => {
    setDay((prevDay) => (prevDay >= 0 && prevDay <= 5 ? prevDay + 1 : prevDay));
  };

  const subDayHandler = () => {
    setDay((prevDay) => (prevDay >= 1 ? prevDay - 1 : prevDay));
  };

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
    (time: string) => time > weather.current.time
  );
  const filteredTime = weather.hourly.time.slice(startIndex);

  return (
    <>
      <WeatherBox
        margin="3px"
        w="306px"
        nextDay={addDayHandler}
        prevDay={subDayHandler}
        weathercode={weather.daily.weather_code[day]}
        maxT={weather.daily.temperature_2m_max[day]}
        minT={weather.daily.temperature_2m_min[day]}
        windSpeed={weather.daily.wind_speed_10m_max[day]}
        sunrise={weather.daily.sunrise[day]}
        sunset={weather.daily.sunset[day]}
        day={weather.daily.time[day]}
      />

      <Box maxW="1000px" height="230px" overflowX="auto">
        <Flex>
          <WeatherBox
            time={weather.current.time}
            temperature={weather.current.temperature_2m}
            weathercode={weather.current.weather_code}
            margin="3px"
            w="150px"
            h="200px"
            align="center"
          />

          {filteredTime.map((time: string, index: number) => (
            <WeatherBox
              key={startIndex + index - 1}
              time={time}
              temperature={
                weather.hourly.temperature_2m[startIndex + index - 1]
              }
              weathercode={weather.hourly.weather_code[startIndex + index - 1]}
              margin="3px"
              w="150px"
              h="200px"
              align="center"
            />
          ))}
        </Flex>
      </Box>
    </>
  );
};
