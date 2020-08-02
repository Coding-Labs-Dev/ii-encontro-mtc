import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import bemHelper from 'lib/bem';

import styles from './SpeakerCard.module.scss';

import { Props } from './SpeakerCard';

const bem = bemHelper(styles, 'SpeakerCard');

const SpeakerCard: React.FC<Props> = ({
  image,
  name,
  description,
  international,
}) => (
  <div className={bem.b()}>
    <Card elevation={2} className={bem.el('card')}>
      <div className={bem.el('media')}>
        {international && (
          <img
            src="/images/china.svg"
            alt="International Speaker"
            className={bem.el('flag')}
          />
        )}
        <CardMedia image={image} title={name} />
      </div>
      <CardContent>
        <Typography variant="h6" color="primary">
          {name}
        </Typography>
        {description && <Typography variant="body2">{description}</Typography>}
      </CardContent>
    </Card>
  </div>
);

export default SpeakerCard;
