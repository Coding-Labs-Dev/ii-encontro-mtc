import React from 'react';
import { Container, Box, Grid, Typography } from '@material-ui/core';

const Footer: React.FC = () => {
  return (
    <Box
      width="100%"
      py={3}
    >
      <Container maxWidth="xl">
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item container justify="center">
            <Typography variant="caption">2020</Typography>
          </Grid>
        </Grid>
        <Box display={{ xs: 'block', md: 'none' }} width="100%" py={3} />
      </Container>
    </Box>
  );
};

export default Footer;
