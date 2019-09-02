import React from 'react';
import { Box, Button, Text } from 'grommet';

const TableCell = ({id, title, releaseYear, history}) => (
  <Box
    key={id}
    basis="small"
    round="xsmall"
    overflow="hidden"
    >
      <Button fill onClick={e => history.push(`/movies/${id}`)}>
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
      </Button>
  </Box>
);

export default TableCell;