import React from 'react';

import { withPrefix } from 'lib/i18n';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Button,
  LinearProgress,
} from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { FormSchema } from 'lib/formFields';
import { Installment } from '@services/PagSeguro/types';
import { toCurrency } from 'lib/number';

const t = withPrefix('Checkout.Form.Modal');

const locations = {
  campinas: 'Campinas',
  saopaulo: 'São Paulo',
  brasilia: 'Brasília',
};

const getTotalValue = (
  installments: Array<Installment>,
  value?: string
): string | null => {
  if (!value) return null;
  const installment = installments.find(
    ({ installmentAmount }) => String(installmentAmount) === value
  );
  if (installment) return toCurrency(installment.totalAmount);
  return null;
};

const parseInstallment = (
  installments: Array<Installment>,
  value?: string
): string | null => {
  if (!value) return null;
  const installment = installments.find(
    ({ installmentAmount }) => String(installmentAmount) === value
  );
  if (!installment) return null;
  return `${installment.quantity} x ${toCurrency(
    installment.installmentAmount
  )}`;
};

interface Props {
  showModal: boolean;
  installments: Array<Installment>;
  onCancel(): void;
  onConfirm(): void;
  singlePaymentValue: number;
  isFetching: boolean;
}

const CheckoutModal: React.FC<Props> = ({
  showModal,
  installments,
  singlePaymentValue,
  onCancel,
  onConfirm,
  isFetching,
}) => {
  const { watch } = useFormContext<FormSchema>();

  const senderName = watch('sender.name') as string | undefined;
  const senderEmail = watch('sender.email') as string | undefined;
  const location = watch('other.location') as
    | 'brasilia'
    | 'campinas'
    | 'saopaulo'
    | undefined;
  const creditCardNumber = watch('internal.creditCard.number') as
    | string
    | undefined;
  const installmentValue = watch('internal.creditCard.installments') as
    | string
    | undefined;
  const paymentMethod = watch('internal.paymentMethod') as string | undefined;
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={showModal}
      maxWidth="xs"
      fullWidth
    >
      {isFetching && <LinearProgress />}
      <DialogTitle>{t('Title')}</DialogTitle>
      <DialogContent>
        {showModal && (
          <Box>
            <Grid container spacing={2}>
              <Grid item container xs={12}>
                <Grid item xs={12} md={3}>
                  Nome
                </Grid>
                <Grid item xs={12} md={9}>
                  {senderName}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={12} md={3}>
                  E-mail
                </Grid>
                <Grid item xs={12} md={9}>
                  {senderEmail}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={12} md={3}>
                  Local
                </Grid>
                <Grid item xs={12} md={9}>
                  {location && locations[location]}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={12} md={3}>
                  Cartão
                </Grid>
                <Grid item xs={12} md={9}>
                  {creditCardNumber?.substr(0, 15).replace(/\d/g, '*')}
                  {creditCardNumber?.substr(15)}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={12} md={3}>
                  Forma de Pagamento
                </Grid>
                <Grid item xs={12} md={9}>
                  {paymentMethod === 'single'
                    ? 'À vista'
                    : parseInstallment(installments, installmentValue)}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={12} md={3}>
                  Total
                </Grid>
                <Grid item xs={12} md={9}>
                  {paymentMethod === 'single'
                    ? toCurrency(singlePaymentValue)
                    : getTotalValue(installments, installmentValue)}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={isFetching} onClick={onCancel}>
          {t('Cancel')}
        </Button>
        <Button
          disabled={isFetching}
          color="primary"
          variant="contained"
          onClick={onConfirm}
        >
          {t('Submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutModal;
