// src/components/atoms/Input.js
import React from 'react';
import styles from "./Input.module.scss";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        id="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input} 
      />
    
    </div>
  );
};

export default Input;
