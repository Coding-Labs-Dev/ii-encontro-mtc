import React from 'react';
import { Typography, Box } from '@material-ui/core';
import bemHelper from 'lib/bem';

import styles from './Title.module.scss';

import { Props } from './Title';

const bem = bemHelper(styles, 'Title');

const Title: React.FC<Props> = ({ title, short }) => (
  <div className={bem.b()}>
    <Box my={5}>
      <div className={bem.el('outlined')}>
        <Typography align="center" variant="h1">
          {short || title}
        </Typography>
      </div>
      <div className={bem.el('main')}>
        <Typography align="center" variant="h2" color="primary">
          {title}
        </Typography>
      </div>
    </Box>
  </div>
);

export default Title;
