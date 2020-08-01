import React from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  CssBaseline,
} from '@material-ui/core';

import globalTheme, { palette } from './themes';

const selectedTheme = responsiveFontSizes(
  createMuiTheme({
    ...globalTheme,
    palette: { ...palette },
  })
);

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={selectedTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default Theme;
