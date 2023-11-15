import { Box, Center, ChakraProvider } from "@chakra-ui/react";
import { WeatherTable } from "./components/WeatherTable/WeatherTable";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { geolocation } from "./helpers";
import { weatherCall } from "./apiCalls";



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<any>([]);

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

  return (
    <ChakraProvider>
      <Center bg="#b5c4c7">
        <Box minW="300px" margin="10px">
          <SearchBar />
          <WeatherTable loading={loading} weather={weather} />
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
