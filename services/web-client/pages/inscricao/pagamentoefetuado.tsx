import React from 'react';
import t from 'lib/i18n';

import { Box, Container, Paper, Typography } from '@material-ui/core';

import Layout from 'components/Layout';
import Background from 'components/Hero/Background';

const IndexPage = () => (
  <Layout title={t('Title')} description={t('Subtitle')}>
    <Box
      minHeight="100vh"
      width="100%"
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <Background />
      <Box
        height="100%"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        py={10}
      >
        <Container>
          <Box>
            <Paper>
              <Box
                py={3}
                px={3}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignContent="center"
              >
                <Typography variant="h6" align="center">
                  {t('Payment')}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  </Layout>
);

export default IndexPage;
