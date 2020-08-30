import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'store/Authentication/actions';

import { Menu, MenuItem } from '@material-ui/core';

import { t } from 'utils/i18n';

interface Props {
  anchorEl: HTMLElement | null;
  closeMenu(): void;
}

const UserMenu: React.FC<Props> = ({ anchorEl, closeMenu }) => {
  const dispatch = useDispatch();
  return (
    <Menu
      id="user-menu"
      anchorEl={anchorEl}
      keepMounted
      open={!!anchorEl}
      onClose={closeMenu}
    >
      <MenuItem onClick={() => dispatch(signOut())}>
        {t('UX.UserMenu.Logout')}
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
