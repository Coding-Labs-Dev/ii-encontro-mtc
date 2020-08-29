import React from 'react';

import { useTheme, Theme, Box } from '@material-ui/core';

import { Wrapper } from './styles';
import NotificationIndicator from './NotificationIndicator';
import UserAvatar from './UserAvatar';
import SwitchTheme from './SwitchTheme';
import SwitchLanguage from './SwitchLanguage';

const Header: React.FC = () => {
  const { palette } = useTheme<Theme>();

  return (
    <Wrapper>
      <Box
        borderBottom={`1px solid ${palette.divider}`}
        bgcolor={palette.background.paper}
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        px={5}
        py={1}
      >
        <div className="header__actions">
          <SwitchLanguage />
          <SwitchTheme />
          <NotificationIndicator />
          <UserAvatar />
        </div>
      </Box>
    </Wrapper>
  );
};

export default Header;
