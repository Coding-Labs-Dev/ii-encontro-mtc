import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

const PrintVersion: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography variant="caption" {...props}>
      {`Version: ${VERSION}`}
    </Typography>
  );
};

export default PrintVersion;
