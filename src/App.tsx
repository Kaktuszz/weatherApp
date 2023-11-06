import { Center, ChakraProvider } from "@chakra-ui/react";
import { WeatherTable } from "./components/WeatherTable/WeatherTable";

function App() {
  return (
    <ChakraProvider>
      <Center bg="#b5c4c7">
        <WeatherTable />
      </Center>
    </ChakraProvider>
  );
}

export default App;
