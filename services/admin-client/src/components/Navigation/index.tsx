import React from 'react';
import { t } from 'utils/i18n';

import { Box, useTheme, Theme, List } from '@material-ui/core';

import navigationLinks from 'config/navigation';

import logo from 'assets/images/logo.png';

import { Wrapper } from './styles';
import NavigationItem from './NavigationItem';
import PrintVersion from '../PrintVersion';

const Navigation: React.FC = () => {
  const { palette } = useTheme<Theme>();

  return (
    <Wrapper>
      <Box
        width="100%"
        height="100%"
        bgcolor={palette.background.default}
        borderRight={`1px solid ${palette.divider}`}
        display="flex"
        flexDirection="column"
      >
        <div className="navigation__logo">
          <img src={logo} alt={t('Application.Name')} />
        </div>
        <Box flex="auto">
          <List component="nav">
            {navigationLinks.map(({ route, i18n, icon, subItems }) => (
              <NavigationItem
                key={route}
                route={route}
                i18n={i18n}
                icon={icon}
                subItems={subItems}
              />
            ))}
          </List>
        </Box>
        <PrintVersion align="center" color="textSecondary" />
      </Box>
    </Wrapper>
  );
};

export default Navigation;
