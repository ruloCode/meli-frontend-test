import Text from "@/components/atoms/text/Text";
import React, { useState } from "react";
import styles from "./Onboarding.module.scss";

const Onboarding = () => {
  const [isOpen, setIsOpen] = useState(true); 

  const handleClose = () => {
    setIsOpen(false); 
  };

  if (!isOpen) return null;

  return (
    <div className={styles.onboarding__container}>
      <div className={styles.onboarding}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times; 
        </button>
        <Text text="Hola" size="small" weight="bold" color="white-color" />
        <Text
          text="Para realizar búsquedas, solo debes ingresar el nombre de lo que necesites. Pueden ser productos, marcas y más..."
          size="xsmall"
          weight="regular"
          color="white-color"
        />
      </div>
    </div>
  );
};

export default Onboarding;
