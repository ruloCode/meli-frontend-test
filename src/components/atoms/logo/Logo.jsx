// Logo.js
"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import styles from "./Logo.module.scss";

const Logo = ({ searchTerm }) => {
  // Función para manejar el clic en el logo
  const handleClick = () => {
    if (searchTerm) {
      // Guardar el término de búsqueda en localStorage
      localStorage.setItem("searchTerm", "");
    }
  };

  return (
    <Link href="/" onClick={handleClick}>
      <div className={styles["logo__container"]}> {/* Renombrado a BEM */}
        {/* Aquí va la imagen de tu logo */}
      </div>
    </Link>
  );
};

export default Logo;
