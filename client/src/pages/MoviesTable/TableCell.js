import React from 'react';
import { Box, RoutedButton, Text } from 'grommet';

const TableCell = ({id, title, releaseYear}) => (
  <Box
    key={id}
    basis="small"
    round="xsmall"
    overflow="hidden"
    >
      <RoutedButton path={`/movies/${id}`} fill>
        <Box
          direction="row"
          justify="between"
          align="center"
          pad="small"
          background={{ color: 'light-4', opacity: true }}
        >
          <Text> 
            {title} ({releaseYear})
          </Text>
        </Box>
      </RoutedButton>
  </Box>
);

export default TableCell;