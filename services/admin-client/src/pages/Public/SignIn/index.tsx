import React from 'react';

import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthenticationSelectors from 'store/Authentication/selectors';
import { signIn } from 'store/Authentication/actions';
import { RootState } from 'store/rootState';

import { t as tr, usePrefix, IntlContext } from 'utils/i18n';

import {
  InputAdornment,
  Container,
  Box,
  Paper,
  Grid,
  useTheme,
} from '@material-ui/core';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import { TextField, PasswordField, Checkbox, Button } from 'components/ux/form';
import PrintVersion from 'components/PrintVersion';

import logo from 'assets/images/logo.png';

import formSchema, { Form } from './formSchema';
import { Wrapper } from './styles';

const t = usePrefix('Pages.SignIn');

const SignIn = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootState: RootState) => rootState);
  const isFetching = AuthenticationSelectors.isFetching(state);
  const isAuth = AuthenticationSelectors.isAuth(state);
  const i18n = React.useContext(IntlContext);
  const { palette } = useTheme();
  const formMethods = useForm<Form>({
    resolver: yupResolver(formSchema(i18n.locale!)),
  });
  const { handleSubmit } = formMethods;

  const onSubmit = (data: Form) => {
    dispatch(signIn(data.eml, data.psw, data.rememberMe));
  };

  if (isAuth) return <Redirect to="/dashboard" />;

  return (
    <Wrapper>
      <div>
        <Container maxWidth="xs">
          <Paper>
            <Box p={4}>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <FormProvider {...formMethods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  autoComplete="new-password"
                >
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item>
                      <img src={logo} alt={tr('Application.Name')} />
                    </Grid>
                    <Grid
                      item
                      container
                      direction="column"
                      spacing={1}
                      alignItems="stretch"
                    >
                      <Grid item>
                        <TextField
                          fullWidth
                          placeholder={t('Fields.Email.Placeholder')}
                          name="eml"
                          disabled={isFetching}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AiOutlineMail color={palette.primary.main} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <PasswordField
                          fullWidth
                          placeholder={t('Fields.Password.Placeholder')}
                          name="psw"
                          disabled={isFetching}
                          InputProps={{
                            autoComplete: 'new-password',
                            startAdornment: (
                              <InputAdornment position="start">
                                <AiOutlineLock color={palette.primary.main} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item container justify="center">
                        <Checkbox
                          name="rememberMe"
                          label={t('Buttons.RememberMe')}
                          disabled={isFetching}
                        />
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        isFetching={isFetching}
                      >
                        {t('Buttons.LogIn')}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </FormProvider>
            </Box>
          </Paper>
          <PrintVersion color="textSecondary" />
        </Container>
      </div>
    </Wrapper>
  );
};

export default SignIn;
