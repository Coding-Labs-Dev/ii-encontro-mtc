import React from 'react';
import axios from 'axios';
import t, { withPrefix } from 'lib/i18n';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
} from '@material-ui/core';

import PagSeguroClient, { usePagSeguroDirectPayment } from 'services/PagSeguro';
import api from 'services/api';
import Layout from 'components/Layout';
import Background from 'components/Hero/Background';
import Field from 'components/Field';
import useAlert from 'components/Alert';
import formFields, { FormSchema, validationSchema } from 'lib/formFields';
import { CardBrandData, Installment } from '@services/PagSeguro/types';

import { Subscriptions } from 'types/models';
import { toCurrency } from 'lib/number';
import CheckoutModal from '@components/CheckoutModal';

const c = withPrefix('Checkout');
const fd = withPrefix('Checkout.Form.Data');
const fp = withPrefix('Checkout.Form.Payment');

const parsePhone = (fullPhone: string) => {
  const parsed = fullPhone.replace(/\D/g, '').match(/([0-9]{2})([0-9]+)/);
  if (!parsed) return { areaCode: null, phoneNumber: null };
  return { areaCode: parsed[1], phoneNumber: parsed[2] };
};

const parseInstallments = (
  installments: Array<Installment>
): Array<{ label: string; value: string }> =>
  installments.map((installment) => ({
    value: String(installment.installmentAmount),
    label: `${installment.quantity} x ${toCurrency(
      installment.installmentAmount
    )} (${toCurrency(installment.totalAmount)})`,
  }));

interface Props {
  subscriptions: Subscriptions;
}

const Inscricao: NextPage<Props> = ({ subscriptions }) => {
  const router = useRouter();
  const { createAlert } = useAlert();

  const singlePaymentValue = subscriptions.values.reduce((acc, item) => {
    if (item.singlePayment) acc = item.value;
    return acc;
  }, 0);

  const installmentPaymenValue = subscriptions.values.reduce((acc, item) => {
    if (!item.singlePayment) acc = item.value;
    return acc;
  }, 0);

  const isReady = usePagSeguroDirectPayment();
  const methods = useForm<FormSchema>({
    resolver: yupResolver(validationSchema),
  });

  const [pagSeguroClient, setPagSeguroClient] = React.useState<
    PagSeguroClient | undefined
  >();
  const [creditCardBrand, setCreditCardBrand] = React.useState<
    CardBrandData | undefined
  >();
  const [openConfirmationModal, setOpenConfirmationModal] = React.useState(
    false
  );
  const [fetching, setFetching] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const { handleSubmit, setValue, watch, getValues } = methods;

  const location = React.useMemo(() => router.query.location as string, [
    router,
  ]);

  const [availableInstallments, setAvailableInstallments] = React.useState<
    Array<Installment> | undefined
  >();

  const initPaymentSession = React.useCallback(async () => {
    if (typeof window !== 'undefined' && pagSeguroClient) {
      try {
        const response = await api.get('/payment');
        if (!response.data || !response.data.status || !response.data.token) {
          throw new Error('Erro ao iniciar a sessão com PagSeguro');
        }
        await pagSeguroClient.createSession(response.data.token);
        const paymentMethodsResponse = await pagSeguroClient.getPaymentMethods();
        if (
          paymentMethodsResponse.error ||
          !paymentMethodsResponse.paymentMethods?.CREDIT_CARD
        ) {
          throw new Error(
            'Error ao carregar os meios de pagamento com PagSeguro'
          );
        }
      } catch (error) {
        createAlert({
          content: error.message,
          type: 'error',
        });
      }
    }
  }, [pagSeguroClient]);

  const getCreditCardBrand = React.useCallback(
    async (cardBin: string) => {
      if (typeof window !== 'undefined' && pagSeguroClient) {
        try {
          const data = await pagSeguroClient.getCreditCardBrand(cardBin);
          if (data.error) throw new Error('Erro ao identificar o cartão');
          setCreditCardBrand(data.brand);
        } catch (error) {
          createAlert({
            content: error.message || 'Erro ao identificar o cartão',
            type: 'error',
          });
        }
      }
    },
    [pagSeguroClient]
  );

  const getInstallments = React.useCallback(
    async (params: { amount: number; brand: string }) => {
      if (typeof window !== 'undefined' && pagSeguroClient) {
        try {
          setFetching(true);
          const data = await pagSeguroClient.getInstallments(params);
          if (data.error) throw new Error('Erro ao recuperar parcelamento');
          const installments = data.installments[params.brand];
          installments.shift();
          installments.splice(5);
          setAvailableInstallments(installments);
          setFetching(false);
        } catch (error) {
          setFetching(false);
          createAlert({
            content: error.message,
            type: 'error',
          });
        }
      }
    },
    [pagSeguroClient]
  );

  const billingSameAsShipping = watch('other.billingSameAsShipping') as boolean;
  const senderFullPhone = watch('internal.sender.fullPhone') as
    | string
    | undefined;
  const holderFullPhone = watch('internal.creditCard.holder.fullPhone') as
    | string
    | undefined;
  const shippingState = watch('internal.shipping.state') as
    | { value: string; label: string }
    | undefined;
  const shippingPostalCode = watch('internal.shipping.postalCode') as
    | string
    | undefined;
  const billingAddressState = watch('internal.billingAddress.state') as
    | { value: string; label: string }
    | undefined;
  const billingAddressPostalCode = watch(
    'internal.billingAddress.postalCode'
  ) as string | undefined;
  const creditCardNumber = watch('internal.creditCard.number') as
    | string
    | undefined;
  const creditCardExpiration = watch('internal.creditCard.expirationDate') as
    | string
    | undefined;
  const paymentMethod = watch('internal.paymentMethod') as string | undefined;
  const selectedInstallmentValue = watch('internal.creditCard.installments') as
    | string
    | undefined;
  const senderCPF = watch('internal.sender.documents.document.value') as
    | string
    | undefined;
  const holderCPF = watch(
    'internal.creditCard.holder.documents.document.value'
  ) as string | undefined;

  React.useEffect(() => {
    if (senderFullPhone) {
      const { areaCode, phoneNumber } = parsePhone(senderFullPhone);
      if (areaCode) setValue('sender.phone.areaCode', areaCode);
      if (phoneNumber) setValue('sender.phone.number', phoneNumber);
    }
  }, [senderFullPhone]);

  React.useEffect(() => {
    if (holderFullPhone) {
      const { areaCode, phoneNumber } = parsePhone(holderFullPhone);
      if (areaCode) setValue('creditCard.holder.phone.areaCode', areaCode);
      if (phoneNumber) setValue('creditCard.holder.phone.number', phoneNumber);
    }
  }, [holderFullPhone]);

  React.useEffect(() => {
    if (shippingState) {
      const { value } = shippingState;
      setValue('shipping.state', value);
    }
  }, [shippingState]);

  React.useEffect(() => {
    if (shippingPostalCode)
      setValue('shipping.postalCode', shippingPostalCode.replace(/\D/g, ''));
  }, [shippingPostalCode]);

  React.useEffect(() => {
    if (billingAddressPostalCode)
      setValue(
        'billingAddress.postalCode',
        billingAddressPostalCode.replace(/\D/g, '')
      );
  }, [billingAddressPostalCode]);

  React.useEffect(() => {
    if (billingAddressState) {
      const { value } = billingAddressState;
      setValue('billingAddress.state', value);
    }
  }, [billingAddressState]);

  React.useEffect(() => {
    if (paymentMethod === 'installments' && creditCardBrand) {
      setValue('items.item.amount', installmentPaymenValue);
      getInstallments({
        amount: installmentPaymenValue,
        brand: creditCardBrand.name,
      });
    } else {
      setValue('items.item.amount', singlePaymentValue);
    }
  }, [paymentMethod, creditCardBrand]);

  React.useEffect(() => {
    if (isReady) setPagSeguroClient(new PagSeguroClient());
  }, [isReady]);

  React.useEffect(() => {
    const trimed = creditCardNumber?.replace(/\D/g, '');
    if (pagSeguroClient && trimed && trimed.length >= 6) {
      const cardBin = trimed.substr(0, 6);
      getCreditCardBrand(cardBin);
    }
  }, [creditCardNumber, pagSeguroClient]);

  React.useEffect(() => {
    const match = creditCardExpiration?.match(/(\d{2})\/(\d+)/);
    if (match) {
      setValue('internal.creditCard.expirationMonth', match[1]);
      setValue('internal.creditCard.expirationYear', `20${match[2]}`);
    }
  }, [creditCardExpiration]);

  React.useEffect(() => {
    if (paymentMethod === 'installments') {
      const installment = availableInstallments?.find(
        ({ installmentAmount }) =>
          String(installmentAmount) === selectedInstallmentValue
      );
      if (installment) {
        setValue('creditCard.installment.quantity', installment.quantity);
        setValue('creditCard.installment.value', installment.installmentAmount);
        setValue('other.paymentTotal', installment.totalAmount);
      }
    } else {
      setValue('creditCard.installment.quantity', 1);
      setValue('creditCard.installment.value', singlePaymentValue);
      setValue('other.paymentTotal', singlePaymentValue);
    }
  }, [paymentMethod, selectedInstallmentValue, availableInstallments]);

  React.useEffect(() => {
    if (availableInstallments) {
      const installment = availableInstallments[0];
      setValue(
        'internal.creditCard.installments',
        String(installment.installmentAmount)
      );
      setValue('creditCard.installment.quantity', installment.quantity);
      setValue('creditCard.installment.value', installment.installmentAmount);
      setValue('other.paymentTotal', installment.totalAmount);
    }
  }, [availableInstallments]);

  React.useEffect(() => {
    if (senderCPF)
      setValue('sender.documents.document.value', senderCPF.replace(/\D/g, ''));
  }, [senderCPF]);

  React.useEffect(() => {
    if (holderCPF)
      setValue(
        'creditCard.holder.documents.document.value',
        holderCPF.replace(/\D/g, '')
      );
  }, [holderCPF]);

  React.useEffect(() => {
    initPaymentSession();
    setValue('items.item.amount', singlePaymentValue);
  }, [initPaymentSession]);

  const onSubmit = () => {
    setOpenConfirmationModal(true);
  };

  const makePayment = async () => {
    setSending(true);
    try {
      // Get CreditCard Token
      const expirationMonth = getValues(
        'internal.creditCard.expirationMonth'
      ) as string;
      const expirationYear = getValues(
        'internal.creditCard.expirationYear'
      ) as string;
      const cvv = getValues('internal.creditCard.securityToken') as string;
      const cardToken = await pagSeguroClient!.getCreditCardToken({
        brand: creditCardBrand!.name,
        cardNumber: creditCardNumber!.replace(/\D/g, ''),
        cvv: cvv.replace(/\D/g, ''),
        expirationMonth: expirationMonth.replace(/\D/g, ''),
        expirationYear: expirationYear.replace(/\D/g, ''),
      });
      if (cardToken.error)
        throw new Error('Erro ao processar o cartão de crédito');
      const { token } = cardToken.card;
      setValue('creditCard.token', token);

      // Get SenderHash
      const senderHash = await pagSeguroClient!.getSenderHash();
      setValue('sender.hash', senderHash);

      const formData = getValues();
      const response = await api.post('/payment', {
        ...formData,
        internal: undefined,
      });
      if (response.status === 200) {
        const { transactionStatus } = response.data;
        if (transactionStatus === 7) {
          throw new Error('Transação negada pela operadora de crédito');
        }
        if (transactionStatus <= 3) {
          router.push('/inscricao/pagamentoefetuado');
        } else {
          throw new Error(
            `Erro ao processar a transação. Código: ${transactionStatus}`
          );
        }
      }
    } catch (error) {
      setSending(false);
      createAlert({
        type: 'error',
        content: error.message || 'Erro ao processar o pagamento',
      });
    }
  };

  return (
    <Layout title={t('Title')} description={t('Subtitle')}>
      <FormProvider {...methods}>
        <Box minHeight="100vh" width="100%" position="relative">
          <Background />
          <Box
            height="100%"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            py={10}
          >
            <Container>
              <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {formFields.hidden.map((field) => (
                    <Field key={field.name} {...field} />
                  ))}
                  <Paper>
                    <Box
                      py={3}
                      px={3}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignContent="center"
                    >
                      <Typography variant="h3">{c('Title')}</Typography>
                      <Grid container spacing={5}>
                        <Grid item xs={12} md={6}>
                          <Box mt={3}>
                            <Typography variant="h6">Local</Typography>
                          </Box>
                          <Box px={2}>
                            {location &&
                              formFields.location.map((field) => (
                                <Field
                                  key={field.name}
                                  {...field}
                                  defaultValue={location}
                                />
                              ))}
                          </Box>
                          <Box mt={3}>
                            <Typography variant="h6">{fd('Title')}</Typography>
                          </Box>
                          {formFields.sender.map((field) => (
                            <Field key={field.name} {...field} />
                          ))}
                          {formFields.shipping.map((field) => (
                            <Field key={field.name} {...field} />
                          ))}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box mt={3}>
                            <Typography variant="h6">{fp('Title')}</Typography>
                          </Box>
                          {formFields.creditCard.map((field) => (
                            <Field key={field.name} {...field} />
                          ))}
                          <Box mt={3}>
                            <Typography variant="h6">{fp('Method')}</Typography>
                          </Box>
                          {formFields.paymentMethod.map((field) =>
                            field.type === 'radio' ? (
                              <Field
                                {...field}
                                key={field.name}
                                options={field.options.map((option) => ({
                                  ...option,
                                  label: `${option.label} (${
                                    option.value === 'single'
                                      ? toCurrency(singlePaymentValue)
                                      : toCurrency(installmentPaymenValue)
                                  })`,
                                }))}
                                defaultValue="single"
                              />
                            ) : null
                          )}
                          {paymentMethod === 'installments' &&
                            !!availableInstallments?.length &&
                            !fetching && (
                              <Field
                                type="select"
                                name="internal.creditCard.installments"
                                options={parseInstallments(
                                  availableInstallments
                                )}
                                label="Parcelas"
                              />
                            )}
                          {paymentMethod === 'installments' && fetching && (
                            <LinearProgress />
                          )}
                          <Box mt={3}>
                            <Typography variant="h6">
                              {fp('Holder.Title')}
                            </Typography>
                          </Box>
                          <span className="checkmark" />
                          {formFields.billingSameAsShipping.map((field) => (
                            <Field key={field.name} {...field} />
                          ))}
                          {!billingSameAsShipping && (
                            <>
                              {formFields.creditCardHolder.map((field) => (
                                <Field key={field.name} {...field} />
                              ))}
                              {formFields.billing.map((field) => (
                                <Field key={field.name} {...field} />
                              ))}
                            </>
                          )}
                        </Grid>
                        <Grid item xs={12} container justify="flex-end">
                          <Button
                            disabled={fetching}
                            color="primary"
                            variant="contained"
                            type="submit"
                          >
                            {c('Form.Continue')}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </form>
              </Box>
            </Container>
          </Box>
        </Box>
        <CheckoutModal
          showModal={openConfirmationModal}
          onCancel={() => setOpenConfirmationModal(false)}
          onConfirm={makePayment}
          installments={availableInstallments || []}
          singlePaymentValue={singlePaymentValue}
          isFetching={sending}
        />
      </FormProvider>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const api = 'http://localhost:4000';
  const { data: subscriptions } = await axios.get(`${api}/subscriptions`);
  return { props: { subscriptions } };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: false,
  paths: [
    { params: { location: 'campinas' } },
    { params: { location: 'saopaulo' } },
    { params: { location: 'brasilia' } },
  ],
});

export default Inscricao;
