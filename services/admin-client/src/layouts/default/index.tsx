import React from 'react';
import { useTheme, Theme } from '@material-ui/core';

import { Wrapper, Main } from './styles';
import Navigation from '~/components/Navigation';
import Header from '~/components/Header';

const DefaultLayout: React.FC = ({ children }) => {
  const theme = useTheme<Theme>();
  const { palette } = theme;
  return (
    <Wrapper type={palette.type}>
      <Header />
      <Navigation />
      <Main>{children}</Main>
    </Wrapper>
  );
};

export default DefaultLayout;
