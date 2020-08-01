import React from 'react';

import styles from './Background.module.scss';

const Background: React.FC = ({ children }) => {
  return (
    <div className={styles['b-HeroBackground']}>
      {children}
      <div className={styles['b-HeroBackground__texture']} />
    </div>
  );
};

export default Background;
