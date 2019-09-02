import React from 'react';
import {
  Box, 
  Button, 
  Text,
} from 'grommet';

const Header = ({history}) => (
  <Box direction="row" justify="center" align="center">
    <Button
      hoverIndicator 
      onClick={e => history.push('/movies')} 
    >
      <Box
        pad="small"
        direction="row"
        align="center"
        gap="small"
      >
        <Text size="small">
          WebbyLab Test | Oleksandr Shateliuk 
        </Text>
      </Box>
    </Button>
  </Box>
);

export default Header;
