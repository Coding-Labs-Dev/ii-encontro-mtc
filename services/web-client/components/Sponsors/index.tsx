import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { withPrefix } from 'lib/i18n';
import bemHelper from 'lib/bem';
import Title from 'components/Title';

import { sponsors } from 'lib/data.json';
import styles from './Sponsors.module.scss';

const t = withPrefix('Sponsors');
const bem = bemHelper(styles, 'Sponsors');

const Sponsors: React.FC = () => (
  <Box py={5}>
    <Container>
      <Grid container justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Title title={t('Title')} />
        </Grid>
        <Grid item xs={12} container justify="center" spacing={2}>
          {sponsors.map((sponsor: string) => (
            <Grid key={sponsor} item>
              <div
                className={bem.el('image')}
                style={{ backgroundImage: `url(${sponsor})` }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Sponsors;
