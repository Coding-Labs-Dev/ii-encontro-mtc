import React from 'react';

import { IntlContext } from 'utils/i18n';
import { IconButton, Menu, MenuItem } from '@material-ui/core';

const SwitchLanguage: React.FC = () => {
  const { locale, switchLanguage, availableLocales } = React.useContext(
    IntlContext
  );
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(
    availableLocales.findIndex(availableLocale => availableLocale === locale)
  );

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const selectLocale = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    switchLanguage(availableLocales[index]);
    closeMenu();
  };

  return (
    <>
      <IconButton size="small" onClick={openMenu}>
        {locale}
      </IconButton>
      <Menu
        id="language-selector"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={closeMenu}
      >
        {availableLocales.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={e => selectLocale(e, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SwitchLanguage;
