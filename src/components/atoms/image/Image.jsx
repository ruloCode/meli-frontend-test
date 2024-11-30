import React from "react";
import ImageNext from "next/image"; // Importar el componente de imagen de Next.js
import styles from "./Image.module.scss"; // Importar los estilos SCSS como módulos

const Image = ({
  src,
  alt,
  width,
  height,
  className,
  fetchPriority = "low",
}) => {
  // Si se pasa una clase personalizada, se combina con la clase del módulo
  const imageWrapperClassName = className
    ? `${styles["image__wrapper"]} ${className}`
    : styles["image__wrapper"];

  const imageClassName = styles["image__picture"]; // Clase para la imagen en sí

  return (
    <figure className={imageWrapperClassName}>
      <ImageNext
        src={src} // Ruta de la imagen
        alt={alt} // Texto alternativo para la imagen
        fill // Alto de la imagen
        className={imageClassName} // Clase de la imagen
        fetchPriority={fetchPriority} // Prioridad de carga de la imagen (high/low)
        decoding="sync" // Decodificación de la imagen (sincronizada para mayor rapidez)
      />
    </figure>
  );
};

export default Image;
