"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';

// Creamos el contexto
const ProductsContext = createContext();

// Proveedor del contexto
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Productos cargados
  const [totalItems, setTotalItems] = useState(0); // Total de productos
  const [totalPages, setTotalPages] = useState(0); // Total de páginas
  const [offset, setOffset] = useState(0); // Offset de la paginación
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Error de la API

  // Función para obtener los productos del API
  const fetchProducts = async (searchTerm, offset) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/products?search=${searchTerm}&offset=${offset}`);
      const data = await response.json();
      setProducts(data.results);
      setTotalItems(data.total);
      setTotalPages(Math.ceil(data.total / 10)); // Suponiendo que tienes 10 productos por página
    } catch (err) {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, totalItems, totalPages, offset, setOffset, loading, error, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useProducts = () => useContext(ProductsContext);
