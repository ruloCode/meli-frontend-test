import React from 'react';
import styles from './MaxMarginTemplate.module.scss';

const MaxMarginTemplate = ({ children }) => {
  return (
    <div className={styles.maxMarginTemplate__container}>
      {children}
    </div>
  );
};

export default MaxMarginTemplate;
