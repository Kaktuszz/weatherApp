import { Box, Input } from "@chakra-ui/react";

export const SearchBar = () => {
  return (
    <Box margin="3px">
      <Input placeholder="City" size="lg" bgColor="while" variant="filled" margin="10px 0px" />
    </Box>
  );
};
