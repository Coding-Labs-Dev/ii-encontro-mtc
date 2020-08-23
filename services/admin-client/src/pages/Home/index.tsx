/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import {
  InputAdornment,
  Container,
  Box,
  Paper,
  Grid,
  useTheme,
} from '@material-ui/core';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import { t as tr, usePrefix, IntlContext } from 'utils/i18n';
import { TextField, PasswordField, Checkbox, Button } from 'components/ux/form';

import logo from 'assets/images/logo.png';

import formSchema from './formSchema';
import { Wrapper } from './styles';
import PrintVersion from '~/components/PrintVersion';

const t = usePrefix('Pages.Home');

const Home = () => {
  const i18n = React.useContext(IntlContext);
  const { palette } = useTheme();
  const formMethods = useForm({
    resolver: yupResolver(formSchema(i18n.locale!)),
  });
  const { handleSubmit } = formMethods;

  const [isFetching, setIsFetching] = React.useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    setIsFetching(true);
  };

  return (
    <Wrapper>
      <div>
        <Container maxWidth="xs">
          <Paper>
            <Box p={4}>
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

export default Home;
