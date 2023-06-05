import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

const Spiner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="50vh"
    >
      <Spinner color="red.500" />
      <Box ml="2">Loading...</Box>
    </Box>
  );
};

export default Spiner;
