import React from 'react';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import t from 'lib/i18n';

const Footer: React.FC = () => (
  <Box width="100%" py={3}>
    <Container maxWidth="xl">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container justify="center">
          <Typography variant="caption">{t('Footer.Text')}</Typography>
        </Grid>
      </Grid>
      <Box display={{ xs: 'block', md: 'none' }} width="100%" py={3} />
    </Container>
  </Box>
);

export default Footer;
