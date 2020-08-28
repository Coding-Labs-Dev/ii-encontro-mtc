import React from 'react';

import { IconButton } from '@material-ui/core';
import { InvertColors } from '@material-ui/icons';

import { ThemeContext } from 'components/ThemeContext';

const SwitchTheme: React.FC = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const changeTheme = React.useCallback(() => {
    if (!setTheme) return;
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <IconButton size="small" onClick={changeTheme}>
      <InvertColors color={theme === 'dark' ? 'secondary' : 'inherit'} />
    </IconButton>
  );
};

export default SwitchTheme;
