import React from 'react';
import { Card, Typography, Box, Grid, Button } from '@material-ui/core';
import bemHelper from 'lib/bem';

import styles from './PaymentPlanCard.module.scss';

import { Props } from './PaymentPlanCard';

const bem = bemHelper(styles, 'PaymentPlanCard');

const PaymentPlanCard: React.FC<Props> = ({ values, location }) => (
  <div className={bem.b()}>
    <Card elevation={2} className={bem.el('card')}>
      <Box p={2} py={4}>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h6" color="primary">
                {location.location}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {location.dates.join(' e ')}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="subtitle2">Local do Evento</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {location.event?.name || location.event?.atHotel
                  ? location.hotel?.name
                  : 'A definir'}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="subtitle2">Hotel sugerido</Typography>
            </Grid>
            <Grid item>
              <Typography>{location.hotel?.name || 'A definir'}</Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="subtitle2">À vista</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" color="primary">
                {values
                  .find(({ singlePayment }) => singlePayment)
                  ?.value.toLocaleString('pt-BR', {
                    currency: 'BRL',
                    style: 'currency',
                  })}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="subtitle2">Parcelado</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {values
                  .find(({ singlePayment }) => !singlePayment)
                  ?.value.toLocaleString('pt-BR', {
                    currency: 'BRL',
                    style: 'currency',
                  })}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <Button color="primary" variant="contained">
              Realizar Inscrição
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  </div>
);

export default PaymentPlanCard;
