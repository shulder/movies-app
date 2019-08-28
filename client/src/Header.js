import React from 'react';
import {
  Box, 
  RoutedButton, 
  Text,
} from 'grommet';

const Header = () => (
  <Box direction="row" justify="center" align="center">
    <RoutedButton path="/" hoverIndicator>
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
    </RoutedButton>
  </Box>
);

export default Header;
