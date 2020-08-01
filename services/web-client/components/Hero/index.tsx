import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  useTheme,
  Theme,
} from '@material-ui/core';
import { LocationOn, Schedule } from '@material-ui/icons';

import { withPrefix } from 'lib/i18n';

import Background from './Background';

const t = withPrefix('Hero');

// import { Container } from './styles';

const Hero: React.FC = () => {
  const { palette } = useTheme<Theme>();
  return (
    <Box height="100vh" width="100%" position="relative">
      <Background>
        <Box
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
        >
          <Container>
            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <Box>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <Schedule fontSize="small" style={{ color: 'white'}} />
                      </Grid>
                      <Grid item>
                        <Typography style={{ color: 'white'}} variant="body2">
                          {t('Date')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item>
                  <Box>
                    <Grid container alignItems="center">
                      <Grid item>
                        <LocationOn style={{ color: 'white'}} fontSize="small" />
                      </Grid>
                      <Grid item>
                        <Typography style={{ color: 'white'}} variant="body2">
                          {t('Locations')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Typography style={{ color: palette.warning.main }} variant="h1">
                {t('Title')}
              </Typography>
              <Typography style={{ color: 'white'}} variant="h5">
                {t('Subtitle')}
              </Typography>
            </Box>
          </Container>
        </Box>
      </Background>
    </Box>
  );
};

export default Hero;
