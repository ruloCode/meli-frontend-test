"use client";
import React from "react";
import Input from "@/components/atoms/input/Input";
import Icon from "@/components/atoms/buttonIcon/ButtonIcon";
import { useProductsStore } from "@/stores/products-store";
import { useRouter } from 'next/navigation'; // Importar useRouter para manejar la navegación
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  // Obtener searchTerm y la función setSearchTerm del store
  const { searchTerm, setSearchTerm } = useProductsStore();
  const router = useRouter(); // Hook de Next.js para navegar

  // Al hacer una nueva búsqueda, navegamos a la página de resultados con el término de búsqueda
  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/items?search=${encodeURIComponent(searchTerm)}&offset=0`); // Navegar a la página de resultados
    }
  };

  // Función para manejar la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Actualizar el término de búsqueda en el store
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Actualizar el estado en el store
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
      <div className={styles["search-bar__icon-container"]} onClick={handleSearch}>
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
