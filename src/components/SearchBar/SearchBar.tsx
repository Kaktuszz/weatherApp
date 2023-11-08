import { Box, Input } from "@chakra-ui/react";

export const SearchBar = (props: any) => {
  return (
    <Box>
      <Input placeholder="City" size="lg" bgColor="while" variant="filled" margin="10px 0px" />
    </Box>
  );
};
