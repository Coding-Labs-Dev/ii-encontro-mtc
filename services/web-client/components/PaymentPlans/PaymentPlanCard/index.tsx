import React from 'react';
import Link from 'next/link';
import {
  Card,
  Typography,
  Box,
  Grid,
  Button,
  Link as MUILink,
} from '@material-ui/core';
import bemHelper from 'lib/bem';

import styles from './PaymentPlanCard.module.scss';

import { Props } from './PaymentPlanCard';

const bem = bemHelper(styles, 'PaymentPlanCard');

const PaymentPlanCard: React.FC<Props> = ({ values, location }) => {
  const eventLocation: string = React.useMemo(() => {
    if (location.event && location.event.name) return location.event.name;
    if (location.event && location.event.atHotel) {
      if (location.hotel) return location.hotel.name;
    }
    return 'A definir';
  }, [location]);

  const eventUrl: string | undefined = React.useMemo(() => {
    if (eventLocation === 'A definir') return undefined;
    if (location.event && location.event.url) return location.event.url;
    if (location.event && location.event.atHotel) {
      if (location.hotel && location.hotel.url) return location.hotel.url;
    }
    return undefined;
  }, [location, eventLocation]);

  const hotelLocation: string = React.useMemo(() => {
    if (location.hotel) return location.hotel.name;
    return 'A definir';
  }, [location]);

  const hotelUrl: string | undefined = React.useMemo(() => {
    if (location.hotel) return location.hotel.url;
    return undefined;
  }, [location]);

  const hotelPhone: string | undefined = React.useMemo(() => {
    if (hotelLocation === 'A definir') return undefined;
    return location.hotel?.phone;
  }, [location, hotelLocation]);

  return (
    <div className={bem.b()}>
      <Card elevation={2} className={bem.el('card')}>
        <Box p={2} py={4} display="flex" height="100%">
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-between"
            spacing={3}
          >
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
                  {eventUrl ? (
                    <MUILink href={eventUrl}>{eventLocation}</MUILink>
                  ) : (
                    eventLocation
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <Typography variant="subtitle2">Hotel sugerido</Typography>
              </Grid>
              <Grid item container direction="column" alignItems="center">
                <Grid item>
                  <Typography>
                    {hotelUrl ? (
                      <MUILink href={hotelUrl}>{hotelLocation}</MUILink>
                    ) : (
                      hotelLocation
                    )}
                  </Typography>
                </Grid>
                {hotelPhone && (
                  <Grid item>
                    <Typography variant="caption">{hotelPhone}</Typography>
                  </Grid>
                )}
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
              <Link
                href="/inscricao/[location]"
                as={`/inscricao/${location.slug}`}
              >
                <Button color="primary" variant="contained">
                  Realizar Inscrição
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
};

export default PaymentPlanCard;
