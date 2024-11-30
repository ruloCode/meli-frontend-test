import React from "react";
import Image from "next/image";
import styles from "./ButtonIcon.module.scss";

const ButtonIcon = ({ src, alt, width = 16, height = 16, onClick}) => {
  return (
    <button className={styles.buttonIcon__container} onClick={onClick}>
      <Image
        src={src}          
        alt={alt}          
        width={width}      
        height={height}    
      />
    </button>
  );
};

export default ButtonIcon;
