// components/MaxMarginTemplate.js
import React from 'react';
import styles from './MaxMarginTemplate.module.scss';

const MaxMarginTemplate = ({ children, className }) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      {children}
    </div>
  );
};

export default MaxMarginTemplate;
