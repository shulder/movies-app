import React from 'react';
import { Box, Text, RangeInput } from 'grommet';

const PageIndicator = ({ currentPage, totalPages, onChange }) => (
  <Box align="center" margin={{ vertical: 'large' }}>
    <Box width="200px" align="center">
      <Text>Current page: {currentPage}</Text>
      <RangeInput
        min="1"
        max={totalPages}
        value={currentPage}
        onChange={onChange}
      />
      <Text>Total pages: {totalPages}</Text>
    </Box>
  </Box>
);

export default PageIndicator;

