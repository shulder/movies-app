import React from 'react';
import { Box, Text } from 'grommet';

const MovieProperty = ({ name, value }) => (
  <Box direction="row-responsive" gap="small">
    <Box basis="1/4">
      <Text> {name} </Text>
    </Box>
    <Text>
      {typeof value ==='object' 
        ? value.map((star, index) => ( 
            <strong key={star.id}>
              {star.name} {star.surname}
              {index !==(value.length - 1) ? ', ' : ' '}
            </strong>
          ))
        : ( <strong> {value} </strong> )
      }
    </Text>
  </Box>
);

export default MovieProperty;