import { Box, Flex } from "@chakra-ui/react";
import { hourRn } from "../../helpers";
import { WeatherBox } from "../UI/WeatherBox/WeatherBox";
import { useEffect, useState } from "react";
import { weatherCall } from "../../apiCalls";

export const WeatherTable = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<any>([]);
  const fetchData = weatherCall(null, null);

  useEffect(()=>{
    fetchData()
    .then(data =>{
      setWeather(data)
      setLoading(false)
    }).
    catch(error =>{
      console.log(error)
      setLoading(false)
    });
  },[])
  

  if(loading){
    return <div><button onClick={()=>console.log(weather)}>Loading...</button></div>
  }

  if (!weather || !weather.hourly) {
    return <div><button onClick={()=>console.log(weather)}>Error loading weather data</button></div>;
  }
  
  return (
    <>
      <Box maxW="800px" height="230px" overflowX="auto">
        <Flex>
          {weather.hourly.time.map((time: string, index: number) => (
            <WeatherBox
              key={index}
              time={time}
              condition={weather.hourly.cloud_cover[index]}
              temperature={weather.hourly.temperature_2m[index]}
              weathercode={weather.hourly.weather_code[index]}
            />
          ))}
        </Flex>
      </Box>
    </>
  );
};
