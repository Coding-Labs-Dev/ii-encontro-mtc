import React from 'react';
import {
  Container,
  Box,
  Grid,
  Typography,
  useTheme,
  Theme,
} from '@material-ui/core';
import t from 'lib/i18n';

const Footer: React.FC = () => {
  const { palette } = useTheme<Theme>();
  return (
    <Box width="100%" py={4} style={{ backgroundColor: palette.primary.main }}>
      <Container maxWidth="xl">
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item container justify="center">
            <Typography
              variant="subtitle2"
              style={{ color: palette.common.white }}
            >
              {t('Footer.Text')}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
