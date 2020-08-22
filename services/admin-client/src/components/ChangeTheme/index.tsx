import React, { useContext } from 'react';
import { Switch } from '@material-ui/core';
import { ThemeContext } from '~/components/ThemeContext';

const ChangeTheme: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  if (!theme || !setTheme) return null;

  const handleChangeTheme = () => {
    if (theme === 'light') return setTheme('dark');
    return setTheme('light');
  };

  return (
    <Switch
      onChange={handleChangeTheme}
      checked={theme === 'dark'}
      color="primary"
    />
  );
};

export default ChangeTheme;
