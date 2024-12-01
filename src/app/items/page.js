"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../actions";
import ProductsList from "@/components/organisms/productsList/ProductsList";
import { useProductsStore } from "@/stores/products-store";

const ItemsPage = () => {
  const {
    searchTerm,
    setProducts,
    setTotalItems,
    setTotalPages,
    products,
    totalItems,
    totalPages,
    setSearchTerm,
    setOffset,
    offset,
  } = useProductsStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    console.log("get items");

    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    try {
      const currentOffset = offset || 0;

      const { items, totalItems, totalPages } = await fetchData(
        searchTerm,
        currentOffset
      );

      console.log("items", items, searchTerm);

      // Usa functional updates para evitar problemas de dependencias
      setProducts(items);
      setTotalItems(totalItems);
      setTotalPages(totalPages);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Hubo un problema al obtener los productos.");
      setLoading(false);
    }
  };

  // Usa una función de dependencia más específica
  useEffect(() => {
    getData();
  }, [searchTerm, offset]); // Elimina las funciones de estado de Zustand de las dependencias

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {products?.length > 0 ? (
        <ProductsList />
      ) : (
        <p>No se encontraron resultados para la búsqueda: {searchTerm}</p>
      )}
    </div>
  );
};

export default ItemsPage;
