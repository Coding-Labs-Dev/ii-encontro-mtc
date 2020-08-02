import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { EventAvailableOutlined } from '@material-ui/icons';

import { Props } from './DayButton';

const DayButton: React.FC<Props> = ({ active, title, onClick }) => (
  <Button
    variant={active ? 'contained' : 'outlined'}
    color="primary"
    size="large"
    startIcon={<EventAvailableOutlined fontSize="large" />}
    onClick={onClick}
  >
    <Typography variant="h6">{title}</Typography>
  </Button>
);

export default DayButton;
