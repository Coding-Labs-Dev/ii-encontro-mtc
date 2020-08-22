import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Link,
} from '@material-ui/core';
import Instagram from '@material-ui/icons/Instagram';
import bemHelper from 'lib/bem';

import styles from './SpeakerCard.module.scss';

import { Props } from './SpeakerCard';

const bem = bemHelper(styles, 'SpeakerCard');

const SpeakerCard: React.FC<Props> = ({
  image,
  name,
  description,
  international,
  instagram,
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
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" color="primary">
              {name}
            </Typography>
          </Grid>
          {description && (
            <Grid item xs={12}>
              <Typography variant="body2">{description}</Typography>
            </Grid>
          )}
          {instagram && (
            <Grid item xs={12}>
              <Box pt={1}>
                <Link href={`https://instagram.com/${instagram}`}>
                  <Grid container>
                    <Grid item>
                      <Instagram fontSize="small" />
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">{`${instagram}`}</Typography>
                    </Grid>
                  </Grid>
                </Link>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  </div>
);

export default SpeakerCard;
