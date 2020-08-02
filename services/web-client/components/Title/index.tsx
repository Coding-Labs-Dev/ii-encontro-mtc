import React from 'react';
import { Typography } from '@material-ui/core';
import bemHelper from 'lib/bem';

import styles from './Title.module.scss';

import { Props } from './Title';

const bem = bemHelper(styles, 'Title');

const Title: React.FC<Props> = ({ title, short }) => (
  <div className={bem.b()}>
    <div className={bem.el('outlined')}>
      <Typography variant="h1">{short || title}</Typography>
    </div>
    <div className={bem.el('main')}>
      <Typography variant="h2" color="secondary">
        {title}
      </Typography>
    </div>
  </div>
);

export default Title;
