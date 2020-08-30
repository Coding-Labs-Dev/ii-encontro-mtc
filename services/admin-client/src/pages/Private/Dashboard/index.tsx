/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Container, Box } from '@material-ui/core';

import { withPrefix } from 'components/ux/Typography';

const Typography = withPrefix('Pages.Dashboard');

const Dashboard: React.FC = () => (
  <Box>
    <Container maxWidth="xl">
      <Typography variant="h5" text="Title" />
    </Container>
  </Box>
);

export default Dashboard;
