import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { darken } from 'polished';

const dark: PaletteOptions = {
  type: 'dark',
  contrastThreshold: 2,
  primary: {
    main: '#00b894',
    dark: darken(0.04, '#00b894'),
  },
};

export default dark;