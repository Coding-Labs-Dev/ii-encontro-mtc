import React from 'react';
import { Button, Typography } from '@material-ui/core';

const DayButton: React.FC = () => (
  <Button
    variant="contained"
    color="primary"
    size="large"
    href="/II-Encontro-Internacional-de-MTC.pdf"
    download="II Encontro Internacional de MTC"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Typography variant="h6">Baixe a programação</Typography>
  </Button>
);

export default DayButton;
