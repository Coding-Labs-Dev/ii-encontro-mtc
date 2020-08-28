import { ThemeOptions } from '@material-ui/core/styles';

const theme: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  typography: {
    h1: {
      fontSize: '5.5rem',
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h5: {
      fontStyle: 'italic',
    },
    body1: {
      fontFamily: 'Poppings, Roboto, sans-serif',
    },
    body2: {
      fontFamily: 'Poppings, Roboto, sans-serif',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          'background-color': '#ffffff',
        },
        '#__next': {
          height: '100%',
        },
      },
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
      disableRipple: true,
      disableTouchRipple: true,
      disableFocusRipple: true,
    },
    MuiIconButton: {
      disableRipple: true,
      disableTouchRipple: true,
      disableFocusRipple: true,
    },
  },
};

export default theme;
export { default as palette } from './palette';
