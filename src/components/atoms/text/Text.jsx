import React from "react";
import styles from "./Text.module.scss";

const Text = ({ 
  text, 
  fontFamily = "primary-font", 
  size = "regular", 
  weight = "regular-weight", 
  color = "primary-color", // Establecer un valor por defecto para color
  className = "", 
  currency = false,
  strikethrough = false  // Nueva propiedad para aplicar el tachado
}) => {
  // Formatear el texto como un precio si 'currency' está activo
  const formattedText = currency 
    ? new Intl.NumberFormat('es-CO', { 
        style: 'currency', 
        currency: 'COP',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0  
      }).format(text) 
    : text;

  return (
    <p className={`${styles.text} ${styles[fontFamily]} ${styles[size]} ${styles[weight]} ${styles[color]} ${className} ${strikethrough ? styles.strikethrough : ''}`}>
      {formattedText}
    </p>
  );
};

export default Text;
