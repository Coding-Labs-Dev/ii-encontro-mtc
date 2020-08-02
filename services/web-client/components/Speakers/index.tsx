import React from 'react';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { withPrefix } from 'lib/i18n';
import bemHelper from 'lib/bem';
import { speakers } from 'lib/data.json';

import Title from 'components/Title';

import styles from './Speakers.module.scss';

import SpeakerCard from './SpeakerCard';

const bem = bemHelper(styles, 'Speakers');

const t = withPrefix('Speakers');

const Speakers: React.FC = () => (
  <Box py={5}>
    <Container>
      <Grid container justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            <Title title={t('Title')} />
          </Typography>
        </Grid>
        <div className={bem.el('grid')}>
          {speakers.map((item) => (
            <Grid container justify="center">
              <SpeakerCard
                key={item.id}
                image={item.image}
                name={item.name}
                description={item.description}
                international={item.international}
              />
            </Grid>
          ))}
        </div>
      </Grid>
    </Container>
  </Box>
);

export default Speakers;
