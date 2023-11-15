import { Box, Center, ChakraProvider } from "@chakra-ui/react";
import { WeatherTable } from "./components/WeatherTable/WeatherTable";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { geolocation } from "./helpers";
import { weatherCall } from "./apiCalls";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<any>([]);
  const [geoFromSearch, setGeoFromSearch] = useState<
    | [
        {
          lat: number | null;
          lon: number | null;
        }
      ]
    | null
  >(null);

  useEffect(() => {
    const dataFetcher = async () => {
      if (geoFromSearch != null) {
        if(geoFromSearch.length > 0){
          setLoading(true);
        try {
          if (geoFromSearch) {
            const fetchData = await weatherCall(
              geoFromSearch[0].lat,
              geoFromSearch[0].lon
            );
            const data = await fetchData();
            setWeather(data);
          }
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
        }else{
          console.error("Invalid city name");
        }
      } else {
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
      }
    };

    dataFetcher();
  }, [geoFromSearch]);

  return (
    <ChakraProvider>
      <Center bg="#b5c4c7">
        <Box minW="300px" margin="10px">
          <SearchBar setLatLon={setGeoFromSearch} />
          <WeatherTable loading={loading} weather={weather} />
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
