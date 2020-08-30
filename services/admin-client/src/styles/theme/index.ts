import { ThemeOptions } from '@material-ui/core/styles';
import {
  PaletteOptions,
  SimplePaletteColorOptions,
} from '@material-ui/core/styles/createPalette';

const globalTheme: ThemeOptions = {
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
    MuiTypography: {
      h1: {
        fontFamily: 'Poppins, Roboto, sans-serif',
      },
      h2: {
        fontFamily: 'Poppins, Roboto, sans-serif',
      },
      h3: {
        fontFamily: 'Poppins, Roboto, sans-serif',
      },
      h4: {
        fontFamily: 'Poppins, Roboto, sans-serif',
      },
      h5: {
        fontFamily: 'Poppins, Roboto, sans-serif',
      },
      h6: {
        fontFamily: 'Poppins, Roboto, sans-serif',
      },
      subtitle2: {
        fontFamily: 'Poppins, Roboto, sans-serif',
      },
      button: {
        fontFamily: 'Poppins, Roboto, sans-serif',
      },
    },
    MuiListItemText: {
      root: {
        fontFamily: 'Poppins, Roboto, sans-serif',
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

export const themeColorOverrides = (theme: PaletteOptions): ThemeOptions => {
  const primary = theme.primary as SimplePaletteColorOptions;
  return {
    overrides: {
      MuiIconButton: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent',
            color: primary.main,
          },
        },
      },
    },
  };
};

export default globalTheme;
export { default as darkTheme } from './dark';
export { default as lightTheme } from './light';
