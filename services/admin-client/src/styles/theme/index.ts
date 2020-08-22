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
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
        },
        '#root': {
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
    }
  },
};

export default theme;
export { default as darkTheme } from './dark';
export { default as lightTheme } from './light';