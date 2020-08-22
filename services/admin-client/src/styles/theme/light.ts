import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { darken } from 'polished';

const light: PaletteOptions = {
  type: 'light',
  contrastThreshold: 2,
  primary: {
    main: '#00b894',
    dark: darken(0.04, '#00b894'),
  },
  action: {
    disabledBackground: 'rgba(0, 0, 0, 0.05)',
  }
};

export default light;