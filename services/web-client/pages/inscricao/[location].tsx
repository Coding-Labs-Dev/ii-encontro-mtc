/* eslint-disable */
// @ts-nocheck
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import t, { withPrefix } from 'lib/i18n';
import { useRouter } from 'next/router';
import useForm from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from '@material-ui/core';

import Layout from 'components/Layout';
import Background from 'components/Hero/Background';
import Fields from 'components/Fields';
import { fields } from 'components/Fields/CheckoutFields';
import Cart from 'components/Cart';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import { Subscriptions } from '../types/models';

const c = withPrefix('Checkout');
const fd = withPrefix('Checkout.Form.Data');
const fp = withPrefix('Checkout.Form.Payment');

interface Props {
  subscriptions: Subscriptions;
}

const Inscricao: NextPage<Props> = ({ subscriptions }) => {
  const router = useRouter();

  const singlePayment = subscriptions.values.reduce((acc, item) => {
    if (item.singlePayment) acc = item.value;
    return acc;
  }, 0);

  const installmentValue = subscriptions.values.reduce((acc, item) => {
    if (!item.singlePayment) acc = item.value;
    return acc;
  }, 0);

  const maxInstallments =
    new Date() > new Date(subscriptions.installments.utc)
      ? subscriptions.installments.after
      : subscriptions.installments.before;

  const location = React.useMemo(() => router.query.location, [router]);

  const [selectedLocation, setSelectedLocation] = useState(location);

  useEffect(() => setSelectedLocation((p) => p || location), [location]);

  const [cart] = useState(
    new Cart([
      {
        id: 'II Encontro MTC',
        description: 'Taxa de inscrição do II Encontro MTC',
        singlePayment,
        installmentValue,
        quantity: 1,
      },
    ])
  );

  useEffect(() => {
    const script = document.createElement('script');
    script.src = process.env.NEXT_PUBLIC_PAGSEGURO!;
    script.id = 'pagSeguro';
    document.body.appendChild(script);
    if (cart) {
      cart.setMaxInstallmentNoInterest(10);
    }
  }, []);

  const {
    register,
    unregister,
    handleSubmit,
    errors,
    setValue,
    setError,
    watch,
  } = useForm({
    defaultValues: {
      location,
      creditCard: { holder: { sameAsBuyer: true } },
    },
  });

  useEffect(() => {
    setValue('location', location);
  }, [location]);

  const [cardBrand, setCardBrand] = useState<
    boolean | Array<{ [key: string]: any }>
  >(false);
  const [installments, setInstallments] = useState([]);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);

  useEffect(() => {
    if (transactionStatus) router.push('/inscricao/pagamentoefetuado');
  }, [transactionStatus]);

  const onSubmit = (data: any) => {
    setFormData({ ...data, location: selectedLocation });
    console.log(data);
    setShowModal(true);
  };

  async function submit() {
    setSending(true);
    try {
      const senderHash = await new Promise((resolve, reject) => {
        window.PagSeguroDirectPayment.onSenderHashReady((response: any) => {
          if (response.status === 'error') {
            console.error(response);
            const error = 'Erro ao recuperar hash do PagSeguro';
            toast.error(error);
            reject(error);
          }
          resolve(response.senderHash);
        });
      });

      let data = {
        cart: cart.getData(),
        sender: {
          ...formData.sender,
          senderHash,
          senderAreaCode: formData.sender.senderFullPhone
            .replace(/\D/g, '')
            .substr(0, 2),
          senderPhone: formData.sender.senderFullPhone
            .replace(/\D/g, '')
            .substr(2),
          senderCPF: formData.sender.senderCPF.replace(/\D/g, ''),
        },
        shipping: {
          ...formData.shippingAddress,
          shippingAddressRequired: true,
          shippingAddressPostalCode: formData.shippingAddress.shippingAddressPostalCode.replace(
            /\D/g,
            ''
          ),
        },
        paymentMethod: 'creditCard',
      };
      const token = await new Promise((resolve, reject) => {
        window.PagSeguroDirectPayment.createCardToken({
          cardNumber: formData.creditCard.number.replace(/\D/g, ''),
          brand: cardBrand.name,
          cvv: formData.creditCard.securityToken.replace(/\D/g, ''),
          expirationMonth: formData.creditCard.expirationDate.substr(0, 2),
          expirationYear:
            Number(formData.creditCard.expirationDate.substr(3)) + 2000,
          success: (response: any) => resolve(response.card.token),
          error: (err: any) => {
            console.error(err.message);
            const error = 'Erro ao recuperar hash do PagSeguro';
            return reject(error);
          },
        });
      });
      data = {
        ...data,
        creditCard: { token },
        creditCardHolder: {
          ...formData.creditCard.holder,
        },
      };
      if (!formData.creditCard.holder.sameAsBuyer) {
        data = {
          ...data,
          creditCardHolder: {
            ...data.creditCardHolder,
            creditCardHolderAreaCode: formData.creditCard.holder.creditCardHolderFullPhone
              .replace(/\D/g, '')
              .substr(0, 2),
            creditCardHolderPhone: formData.creditCard.holder.creditCardHolderFullPhone
              .replace(/\D/g, '')
              .substr(2),
            creditCardHolderCPF: formData.creditCard.holder.creditCardHolderCPF.replace(
              /\D/g,
              ''
            ),
          },
          billing: {
            ...formData.billingAddress,
            billingAddressPostalCode: formData.billingAddress.billingAddressPostalCode.replace(
              /\D/g,
              ''
            ),
          },
        };
      } else {
        data = {
          ...data,
          creditCardHolder: {
            ...data.creditCardHolder,
            creditCardHolderBirthDate: formData.sender.senderBirthDate,
            creditCardHolderAreaCode: formData.sender.senderFullPhone
              .replace(/\D/g, '')
              .substr(0, 2),
            creditCardHolderPhone: formData.sender.senderFullPhone
              .replace(/\D/g, '')
              .substr(2),
            creditCardHolderCPF: formData.sender.senderCPF.replace(/\D/g, ''),
          },
        };
      }

      await axios
        .post(`${process.env.NEXT_PUBLIC_API}/payment`, data)
        .then(({ data: res }) => {
          const { status } = res;
          if (!status) {
            const { error, message, errors: errs, messages } = res;
            if (error) {
              toast.error(message);
              return console.error(message);
            }
            messages.forEach((msg) => toast.error(msg));
            return console.error(errs);
          }
          if (res.transactionStatus <= 3) {
            if (res.paymentLink) {
              setPaymentLink(res.paymentLink);
            }
            return setTransactionStatus(res.transactionStatus);
          }
          if (res.transactionStatus === 7) {
            setSending(false);
            setShowModal(false);
            setFormData({});
            return toast.error('Transação negada pela operadora de crédito');
          }
          setSending(false);
          setShowModal(false);
          setFormData({});
          return toast.error(
            `Erro ao processar a transação. Código: ${transactionStatus}`
          );
        })
        .catch((err) => {
          console.error(err);
          setSending(false);
          setShowModal(false);
          toast.error('Erro na comunicação com PagSeguro');
        });
    } catch (error) {
      setSending(false);
      setShowModal(false);
      console.error(error);
      toast.error('Erro na comunicação com PagSeguro ao realizar a transação');
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (watch('creditCard.holder.sameAsBuyer')) {
      fields.creditCardHolder.forEach(({ name }) => {
        if (
          name !== 'creditCard.holder.sameAsBuyer' &&
          name !== 'creditCard.holder.name'
        ) {
          unregister(name);
        }
      });
      fields.billing.forEach(({ name }) => {
        unregister(name);
      });
    }
  }, [watch('creditCard.holder.sameAsBuyer')]);

  async function handleCreditCard(value) {
    const cc = String(value).replace(/\D/g, '');
    if (cc.length >= 6) {
      try {
        const result = await new Promise((resolve, reject) => {
          window.PagSeguroDirectPayment.getBrand({
            cardBin: cc.substr(0, 6),
            success: (response) => {
              setCardBrand(response.brand);
              resolve(response.brand);
            },
            error: (err) => {
              setCardBrand(false);
              setError(
                'creditCard.number',
                'pattern',
                'Cartão de Crédito inválido'
              );
              reject(err);
            },
          });
        });
        const { name: brand } = result;
        setLoading(true);
        return await new Promise((resolve, reject) => {
          window.PagSeguroDirectPayment.getInstallments({
            amount: installmentValue,
            maxInstallments,
            brand,
            success(response) {
              setLoading(false);
              const values = response.installments[brand]
                .slice(0, maxInstallments)
                .map(
                  (
                    { installmentAmount, interestFree, quantity, totalAmount },
                    i
                  ) => ({
                    name: 'creditCard.installments',
                    value: JSON.stringify({
                      installmentAmount: !i ? singlePayment : installmentAmount,
                      interestFree,
                      quantity,
                      totalAmount: !i ? singlePayment : totalAmount,
                    }),
                    label: `${quantity} x R$${
                      !i
                        ? singlePayment
                        : installmentAmount.toFixed(2).replace('.', ',')
                    } (Total: R$${(!i ? singlePayment : totalAmount)
                      .toFixed(2)
                      .replace('.', ',')})`,
                  })
                );
              setInstallments(values);
              resolve(response.installments[brand]);
            },
            error(response) {
              reject(response);
            },
          });
        });
      } catch (err) {
        console.error('error', err);
      }
    }
    return false;
  }

  useEffect(() => {
    handleCreditCard(watch('creditCard.number'));
  }, [watch('creditCard.number')]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/payment`)
      .then(({ data }) => {
        if (data.status) {
          window.PagSeguroDirectPayment.setSessionId(data.id);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Erro na comunicação com PagSeguro');
      });
  }, []);

  useEffect(() => {
    const creditCardInstallments = watch('creditCard.installments');
    if (creditCardInstallments) {
      cart.setCreditCardPayment(JSON.parse(creditCardInstallments));
    }
  }, [watch('creditCard.installments')]);

  function handleChange(e) {
    if (e.target) {
      setValue(
        e.target.name,
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        e.target.classList.contains('error')
      );
    } else {
      setValue(e.name, e.value, true);
    }
    setValue(e.name, e.value, true);
  }

  return (
    <Layout title={t('Title')} description={t('Subtitle')}>
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
                          <RadioGroup
                            name="location"
                            value={selectedLocation}
                            onChange={(e) =>
                              setSelectedLocation(e.currentTarget.value)
                            }
                          >
                            <FormControlLabel
                              value="campinas"
                              control={<Radio color="primary" />}
                              label="Campinas"
                            />
                            <FormControlLabel
                              value="saopaulo"
                              control={<Radio color="primary" />}
                              label="São Paulo"
                            />
                            <FormControlLabel
                              value="brasilia"
                              control={<Radio color="primary" />}
                              label="Brasília"
                            />
                          </RadioGroup>
                        </Box>
                        <Box mt={3}>
                          <Typography variant="h6">{fd('Title')}</Typography>
                        </Box>
                        <Fields
                          fields={fields.sender}
                          register={register}
                          errors={errors}
                          handleChange={handleChange}
                        />
                        <Fields
                          fields={fields.shipping}
                          register={register}
                          errors={errors}
                          handleChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box mt={3}>
                          <Typography variant="h6">{fp('Title')}</Typography>
                        </Box>
                        <Fields
                          fields={fields.creditCard}
                          register={register}
                          errors={errors}
                          handleChange={handleChange}
                        />
                        {installments.length ? (
                          <Fields
                            fields={[
                              {
                                name: 'creditCard.installments',
                                type: 'text',
                                label: 'Parcelamento',
                                placeholder: 'Escolha a quantidade de parcelas',
                                options: installments,
                                props: {
                                  required: 'Este campo é obrigatório',
                                },
                              },
                            ]}
                            register={register}
                            errors={errors}
                            handleChange={handleChange}
                          />
                        ) : (
                          loading && <p>Carregando</p>
                        )}
                        <Box mt={3}>
                          <Typography variant="h6">
                            {fp('Holder.Title')}
                          </Typography>
                        </Box>
                        <span className="checkmark" />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="creditCard.holder.sameAsBuyer"
                              onChange={handleChange}
                              checked={watch('creditCard.holder.sameAsBuyer')}
                              color="primary"
                              ref={register({
                                name: 'creditCard.holder.sameAsBuyer',
                              })}
                            />
                          }
                          label={fp('Holder.Label')}
                        />
                        {!watch('creditCard.holder.sameAsBuyer') && (
                          <>
                            <Fields
                              fields={fields.creditCardHolder}
                              register={register}
                              errors={errors}
                              handleChange={handleChange}
                            />
                            <Fields
                              fields={fields.billing}
                              register={register}
                              errors={errors}
                              handleChange={handleChange}
                            />
                          </>
                        )}
                      </Grid>
                      <Grid item xs={12} container justify="flex-end">
                        <Button
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
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={showModal}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>{c('Form.Modal.Title')}</DialogTitle>
          <DialogContent>
            {showModal && (
              <Box>
                <Grid container spacing={2}>
                  <Grid item container xs={12}>
                    <Grid item xs={12} md={3}>
                      Nome
                    </Grid>
                    <Grid item xs={12} md={9}>
                      {formData.sender.senderName}
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} md={3}>
                      E-mail
                    </Grid>
                    <Grid item xs={12} md={9}>
                      {formData.sender.senderEmail}
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} md={3}>
                      Local
                    </Grid>
                    <Grid item xs={12} md={9}>
                      {formData.location}
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} md={3}>
                      Cartão
                    </Grid>
                    <Grid item xs={12} md={9}>
                      {formData.creditCard.number
                        .substr(0, 15)
                        .replace(/\d/g, '*')}
                      {formData.creditCard.number.substr(15)}
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} md={3}>
                      Forma de Pagamento
                    </Grid>
                    <Grid item xs={12} md={9}>
                      {JSON.parse(formData.creditCard.installments).quantity} x
                      R${' '}
                      {JSON.parse(formData.creditCard.installments)
                        .installmentAmount.toFixed(2)
                        .replace('.', ',')}{' '}
                      {JSON.parse(formData.creditCard.installments)
                        .interestFree && '(sem juros)'}
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} md={3}>
                      Total
                    </Grid>
                    <Grid item xs={12} md={9}>
                      R$ {cart.getTotal().toFixed(2).replace('.', ',')}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              disabled={sending}
              size="small"
              onClick={() => {
                setShowModal(false);
                setFormData(null);
              }}
            >
              {c('Form.Modal.Cancel')}
            </Button>
            <Button
              disabled={sending}
              color="primary"
              variant="contained"
              size="small"
              onClick={submit}
            >
              {c('Form.Modal.Submit')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
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
