import React, { useMemo, createContext } from 'react';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';

import usePersistedState from '~/utils/usePersistedState';
import globalTheme, { darkTheme, lightTheme } from '~/styles/theme';

interface ThemeContextProps {
  theme?: 'light' | 'dark';
  setTheme?: (theme: 'light' | 'dark') => void;
}

export const ThemeContext = createContext<Partial<ThemeContextProps>>({
  theme: 'light',
});

const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = usePersistedState<'light' | 'dark'>(
    'theme',
    'light'
  );

  const selectedTheme = useMemo(
    () =>
      createMuiTheme({
        ...globalTheme,
        palette: theme === 'light' ? { ...lightTheme } : { ...darkTheme },
      }),
    [theme]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
