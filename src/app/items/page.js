"use client";
import React, { useEffect, useState } from "react";
import { useProductsStore } from "@/stores/products-store";
import { fetchData } from "../actions"; // Asegúrate de tener la función fetchData en esta ubicación
import ProductsList from "@/components/organisms/productsList/ProductsList";

const ItemsPage = () => {
  // Obtener el término de búsqueda desde el store de zustand
  const {
    searchTerm,
    setProducts,
    setTotalItems,
    setTotalPages,
    products,
    totalItems,
    totalPages,
  } = useProductsStore();
  const [loading, setLoading] = useState(true); // Para mostrar un estado de carga
  const [error, setError] = useState(null); // Para manejar posibles errores
  const [currentPage, setCurrentPage] = useState(1); // Para manejar la paginación

  useEffect(() => {
    if (searchTerm) {
      const getData = async () => {
        setLoading(true);
        try {
          const offset = (currentPage - 1) * 20; // Suponiendo que se muestran 20 productos por página
          const { items, total } = await fetchData(searchTerm, offset);

          // Actualizamos el estado con los productos y la información relevante
          setProducts(items);
          setTotalItems(total);
          setTotalPages(Math.ceil(total / 20)); // Calculamos las páginas totales (total de productos / 20)

          setLoading(false); // Terminamos de cargar
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Hubo un problema al obtener los productos.");
          setLoading(false); // Terminamos de cargar con error
        }
      };

      getData(); // Ejecutamos la función de búsqueda
    }
  }, [searchTerm, currentPage, setProducts, setTotalItems, setTotalPages]);

  if (loading) return <div>Cargando...</div>; // Estado mientras se cargan los productos
  if (error) return <div>{error}</div>; // Mostrar el error si ocurre uno

  return (
    <div>
      <ProductsList
        initialProducts={products}
        totalItems={totalItems}
        totalPages={totalPages}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default ItemsPage;
