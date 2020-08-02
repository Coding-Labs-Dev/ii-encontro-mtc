import React from 'react';
import bemHelper from 'lib/bem';

import styles from './Background.module.scss';

const bem = bemHelper(styles, 'HeroBackground');

const Background: React.FC = ({ children }) => {
  return (
    <div className={bem.b()}>
      {children}
      <div className={bem.el('texture')} />
    </div>
  );
};

export default Background;
