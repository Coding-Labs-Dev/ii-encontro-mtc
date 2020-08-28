/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography, TypographyProps, Tooltip } from '@material-ui/core';

const PrintVersion: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Tooltip title={`Builded: ${COMMITDATE}`}>
      <Typography variant="caption" {...props}>
        {`Version: ${VERSION}`}
      </Typography>
    </Tooltip>
  );
};

export default PrintVersion;
