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
    <div className={styles.input__container}>
      <input
        type={type}
        id="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input__field}  // Renombrado a BEM
      />
    </div>
  );
};

export default Input;
