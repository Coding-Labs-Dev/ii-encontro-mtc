import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Props } from './types';

import { Wrapper } from './styles';

const Loader: React.FC<Props> = ({ size = 50, fullScreen = false }) => {
  if (fullScreen)
    return (
      <Wrapper>
        <CircularProgress size={size} />
      </Wrapper>
    );
  return <CircularProgress size={size} />;
};

export default Loader;
