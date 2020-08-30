import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';

import UserMenu from './UserMenu';

const UserAvatar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={openMenu}>
        <Avatar>PA</Avatar>
      </IconButton>
      <UserMenu anchorEl={anchorEl} closeMenu={closeMenu} />
    </>
  );
};

export default UserAvatar;
