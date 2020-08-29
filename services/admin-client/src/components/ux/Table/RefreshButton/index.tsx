import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { Sync } from '@material-ui/icons';

export interface Props {
  isLoading: boolean;
  onClick(): void;
}

const useStyles = makeStyles(() => ({
  root: {
    animation: '$rotate 1.4s linear infinite',
  },
  '@keyframes rotate': {
    from: {
      transform: 'rotate(0)',
    },
    to: {
      transform: 'rotate(-360deg)',
    },
  },
}));

const RefreshButton: React.FC<Props> = ({ isLoading, onClick }) => {
  const classes = useStyles();
  return (
    <IconButton
      size="small"
      onClick={onClick}
      className={isLoading ? classes.root : ''}
      disabled={isLoading}
    >
      <Sync />
    </IconButton>
  );
};

export default RefreshButton;
