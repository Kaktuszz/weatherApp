import { Box, Center, ChakraProvider } from "@chakra-ui/react";
import { WeatherTable } from "./components/WeatherTable/WeatherTable";
import { SearchBar } from "./components/SearchBar/SearchBar";

function App() {

  return (
    <ChakraProvider>
      <Center bg="#b5c4c7">
        <Box minW="300px" margin="10px">
          <SearchBar />
          <WeatherTable />
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
