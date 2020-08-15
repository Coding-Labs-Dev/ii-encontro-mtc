import React from 'react';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { withPrefix } from 'lib/i18n';
import bemHelper from 'lib/bem';
import { subscriptions } from 'lib/data.json';

import Title from 'components/Title';

import styles from './PaymentPlans.module.scss';

import PaymentPlanCard from './PaymentPlanCard';

const bem = bemHelper(styles, 'PaymentPlans');

const t = withPrefix('PaymentPlans');

const Speakers: React.FC = () => (
  <Box py={5}>
    <Container>
      <Grid container justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Title title={t('Title')} />
        </Grid>
        <div className={bem.el('grid')}>
          {subscriptions.locations.map((location) => (
            <Grid container justify="center" key={location.id}>
              <PaymentPlanCard
                location={location}
                values={subscriptions.values}
              />
            </Grid>
          ))}
        </div>
        <Box p={2}>
          <Typography variant="caption" color="textSecondary">
            {t('Footer', {
              coupon: subscriptions.coupon,
              ...subscriptions.installments,
            })}
          </Typography>
        </Box>
      </Grid>
    </Container>
  </Box>
);

export default Speakers;