import Text from "@/components/atoms/text/Text";
import React, { useState } from "react";
import styles from "./Onboarding.module.scss";
import MaxWidthMarginTemplate from "@/components/templates/maxWidthMarginTemplate/MaxWidthMarginTemplate";

const Onboarding = () => {
  const [isOpen, setIsOpen] = useState(true); // Estado para controlar la visibilidad del onboarding

  const handleClose = () => {
    setIsOpen(false); // Cambia el estado a false para ocultar el componente
  };

  if (!isOpen) return null; // Si el onboarding está cerrado, no se renderiza

  return (
    <div className={styles.onboarding__container}>
      <div className={styles.onboarding}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times; {/* Símbolo de cierre */}
        </button>
        <Text text="Hola" size="small" weight="bold" color="white-color" />
        <Text
          text="Para realizar búsquedas, solo debes ingresar el nombre de lo que necesites. Pueden ser productos, marcas y más..."
          size="xsmall"
          weight="regular"
          color="white-color"
        />
        {/* Botón de cierre */}
      </div>
    </div>
  );
};

export default Onboarding;
