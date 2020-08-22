import React from 'react';
import { Box, Grid, Container } from '@material-ui/core';
import { withPrefix } from 'lib/i18n';
import bemHelper from 'lib/bem';

import Title from 'components/Title';

import styles from './Speakers.module.scss';

import { Speakers as SpeakersType, Speaker } from '../../types/models';
import SpeakerCard from './SpeakerCard';

const bem = bemHelper(styles, 'Speakers');

const t = withPrefix('Speakers');

interface Props {
  speakers: SpeakersType;
}

const Speakers: React.FC<Props> = ({ speakers }) => (
  <Box py={5}>
    <Container>
      <Grid container justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Title title={t('Title')} />
        </Grid>
        <div className={bem.el('grid')}>
          {speakers.map((item: Speaker) => (
            <Grid container justify="center" key={item.id}>
              <SpeakerCard
                image={item.image}
                name={item.name}
                description={item.description}
                international={item.international}
                instagram={item.instagram}
              />
            </Grid>
          ))}
        </div>
      </Grid>
    </Container>
  </Box>
);

export default Speakers;
