import React from 'react';
import { Box, Text } from 'grommet';

const Message = ({type, text}) => (
  <Box margin={{ vertical: 'xlarge' }} align="center">
    <Text color={type ==='error' ? 'red' : 'green'}> 
      {text}
    </Text>
  </Box>
);

export default Message;