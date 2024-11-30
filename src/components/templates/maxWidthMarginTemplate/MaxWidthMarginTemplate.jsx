import React from 'react';
import styles from './MaxWidthMarginTemplate.module.scss';

export const MaxWidthMarginTemplate = ({ children }) => {
  return (
    <div className={styles.maxMarginTemplate__container}>
      {children}
    </div>
  );
};

export default MaxWidthMarginTemplate;
