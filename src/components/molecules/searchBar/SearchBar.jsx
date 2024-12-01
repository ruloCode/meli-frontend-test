"use client";
import React, { useState } from "react";
import Input from "@/components/atoms/input/Input";
import Icon from "@/components/atoms/buttonIcon/ButtonIcon";
import { useProductsStore } from "@/stores/products-store";
import { useRouter } from "next/navigation"; // Importar useRouter para manejar la navegación
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  // Obtener searchTerm y la función setSearchTerm del store
  const { setSearchTerm } = useProductsStore();
  const [localSearchTerm, setLocalSearchTerm] = useState(""); // Estado local para el término de búsqueda
  const router = useRouter(); // Hook de Next.js para navegar

  // Al hacer una nueva búsqueda, navegamos a la página de resultados con el término de búsqueda
  const handleSearch = () => {
    if (localSearchTerm) {
      setSearchTerm(localSearchTerm); // Actualizar el estado global solo cuando se envíe el formulario
      router.push(`/items?search=${encodeURIComponent(localSearchTerm)}`); // Navegar a la página de resultados
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto de envío del formulario

    handleSearch();
  };

  // Función para manejar la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Actualizar el término de búsqueda local
  const handleChange = (e) => {
    setLocalSearchTerm(e.target.value); // Actualizar el estado local mientras escribe
  };

  return (
    <form onSubmit={handleSubmit} className={styles["search-bar"]}>
      <Input
        type="text"
        value={localSearchTerm}
        onChange={handleChange} // Llamar a handleChange al escribir
        onKeyPress={handleKeyPress}
        placeholder="Buscar productos..."
      />
      <div
        className={styles["search-bar__icon-container"]}
        onClick={handleSearch}
      >
        <Icon
          src={"/assets/ic_Search@2x.png"}
          alt="search_icon"
          width={16}
          height={16}
        />
      </div>
    </form>
  );
};

export default SearchBar;
