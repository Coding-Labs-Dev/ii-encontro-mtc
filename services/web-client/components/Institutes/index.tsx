import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { withPrefix } from 'lib/i18n';
import bemHelper from 'lib/bem';
import Title from 'components/Title';

import { institutes } from 'lib/data.json';
import styles from './Institutes.module.scss';

const t = withPrefix('Institutes');
const bem = bemHelper(styles, 'Institutes');

const Institutes: React.FC = () => (
  <Box py={5}>
    <Container>
      <Grid container justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Title title={t('Title')} />
        </Grid>
        <Grid item xs={12} container justify="center" spacing={2}>
          {institutes.map((institute: string) => (
            <Grid key={institute} item>
              <div
                className={bem.el('image')}
                style={{ backgroundImage: `url(${institute})` }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Institutes;
