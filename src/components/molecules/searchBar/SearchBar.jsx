"use client";
import React, { useEffect, useState, Suspense } from "react";
import Input from "@/components/atoms/input/Input";
import Icon from "@/components/atoms/buttonIcon/ButtonIcon";
import { useProductsStore } from "@/stores/products-store";
import { useRouter } from "next/navigation"; 
import styles from "./SearchBar.module.scss";

const SearchBar = ({searchParams}) => {
  const { setSearchTerm } = useProductsStore();
  const [localSearchTerm, setLocalSearchTerm] = useState(""); // Estado local para el término de búsqueda
  const router = useRouter(); // Hook de Next.js para manejar la navegación

  // Maneja la búsqueda al enviar el formulario
  const handleSearch = () => {
    if (localSearchTerm) {
      setSearchTerm(localSearchTerm); // Actualizar el estado global con el término de búsqueda
      // Redirigir a la página de resultados con el término de búsqueda, y página 1 como predeterminada
      router.push(`/items?search=${encodeURIComponent(localSearchTerm)}&page=1&per_page=10`);
    }
  };

  // Evitar el comportamiento por defecto del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que se recargue la página
    handleSearch();
  };

  // Función para manejar el enter y realizar la búsqueda
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Actualizar el término de búsqueda local mientras escribe
  const handleChange = (e) => {
    setLocalSearchTerm(e.target.value); // Actualizar el estado local con lo que se escribe
  };



  return (
    <Suspense fallback={<div>Loading...</div>}> {/* Suspense Boundary */}
      <form onSubmit={handleSubmit} className={styles["search-bar"]}>
        <Input
          type="text"
          value={localSearchTerm}
          onChange={handleChange} // Llamar a handleChange para actualizar el término de búsqueda local
          onKeyPress={handleKeyPress} // Permite hacer búsqueda con la tecla Enter
          placeholder="Buscar productos..."
        />
        <div
          className={styles["search-bar__icon-container"]}
          onClick={handleSearch} // Llamar a handleSearch al hacer clic en el icono
        >
          <Icon
            src={"/assets/ic_Search@2x.png"}
            alt="search_icon"
            width={16}
            height={16}
          />
        </div>
      </form>
    </Suspense>
  );
};

export default SearchBar;
