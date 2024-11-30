"use client";
import React, { useState, useEffect } from "react";
import Input from "@/components/atoms/input/Input";
import Icon from "@/components/atoms/buttonIcon/ButtonIcon";
import { useRouter } from 'next/navigation'; // Importar useRouter para manejar la navegación
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  // Inicializamos el estado con el valor guardado en localStorage (si existe)
  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("searchTerm") || ""; // Recuperar término de búsqueda del localStorage
    }
    return "";
  });

  const router = useRouter(); // Hook de Next.js para navegar

  // Función para manejar la búsqueda
  const handleSearch = () => {
    if (searchTerm) {
      localStorage.setItem("searchTerm", searchTerm); // Guardar el término de búsqueda en localStorage
      // Al hacer una nueva búsqueda, se resetea el offset a 0
      router.push(`/items?search=${encodeURIComponent(searchTerm)}&offset=0`); // Navegar a la página de resultados con el término de búsqueda
    }
  };

  // Función para manejar la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Actualizar el término de búsqueda en el estado y localStorage cuando el usuario escribe
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    localStorage.setItem("searchTerm", value); // Guardar el término de búsqueda en localStorage cada vez que se cambia
  };

  return (
    <div className={styles["search-bar"]}>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleChange} // Llamar a handleChange al escribir
        onKeyPress={handleKeyPress}
        placeholder="Buscar productos..."
      />
      <div className={styles["iconContainer"]} onClick={handleSearch}>
        <Icon
          src={"/assets/ic_Search@2x.png"}
          alt="search_icon"
          width={16}
          height={16}
        />
      </div>
    </div>
  );
};

export default SearchBar;
