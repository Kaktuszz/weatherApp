import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { reverseGeoCall } from "../../apiCalls";
import { geolocation } from "../../helpers";

interface City {
  name: string;
}

export const SearchBar = () => {
  const [city, setCity] = useState("");
  const [geoCity, setGeocity] = useState<City[]>([]);

  const setCityHandler = (e: any) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (geoCity && geoCity.length > 0) {
      setCity(geoCity[0].name);
    }
  }, [geoCity]);

  useEffect(() => {
    const dataFetcher = async () => {
      try {
        const localData = await geolocation();
        if (localData) {
          const reverseGeo = await reverseGeoCall(
            localData.latitude,
            localData.longitude
          );
          const data = await reverseGeo();
          setGeocity(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    dataFetcher();
  }, []);

  return (
    <Box margin="3px">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.500"
          fontSize="1.5em"
          marginTop="13px"
          marginLeft="10px"
        >
          <SearchIcon />
        </InputLeftElement>
        <Input
          value={city}
          onChange={setCityHandler}
          placeholder="City"
          size="lg"
          bgColor="while"
          variant="filled"
          margin="10px 0px"
        />
      </InputGroup>
    </Box>
  );
};
