"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchData } from "../actions";
import Link from "next/link";
import styles from "./results.module.scss";

const ITEMS_PER_PAGE = 10; // Cantidad de productos por página

const ItemsPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");

  // Recuperar el valor del 'offset' desde localStorage si existe, sino establecerlo en 0
  const storedOffset = typeof window !== "undefined" ? localStorage.getItem("offset") : null;
  const initialOffset = storedOffset ? parseInt(storedOffset, 10) : 0;

  const [allProducts, setAllProducts] = useState([]); // Productos que ya hemos cargado
  const [productsToShow, setProductsToShow] = useState([]); // Productos que se deben mostrar en la página
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(initialOffset); // Desplazamiento inicial desde localStorage
  const [totalItems, setTotalItems] = useState(0); // Total de productos
  const [totalPages, setTotalPages] = useState(0); // Total de páginas

  // Guardar el offset en localStorage cuando cambie
  useEffect(() => {
    if (offset !== initialOffset) {
      localStorage.setItem("offset", offset.toString());
    }
  }, [offset, initialOffset]);

  const getProducts = async (searchTerm, offset) => {
    setLoading(true);
    setError(null);

    try {
      const { results, total } = await fetchData(searchTerm, offset, ITEMS_PER_PAGE);
      setAllProducts((prev) => [...prev, ...results]); // Agregar los productos nuevos al estado
      setTotalItems(total);
      // Asegurarse de calcular correctamente el número de páginas
      setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
    } catch (error) {
      setError("Hubo un error al realizar la búsqueda.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProductsToShow = (offset) => {
    const startIdx = offset;
    const endIdx = offset + ITEMS_PER_PAGE;
    setProductsToShow(allProducts.slice(startIdx, endIdx)); // Mostrar solo los productos de la página actual
  };

  useEffect(() => {
    if (searchTerm) {
      if (allProducts.length <= offset) {
        getProducts(searchTerm, offset); // Hacer la llamada si no hay suficientes productos cargados
      } else {
        updateProductsToShow(offset); // Mostrar productos ya cargados
      }
    }
  }, [searchTerm, offset, allProducts]);

  // Configurar la paginación
  const pageNumbers = [];
  let startPage = Math.floor(offset / ITEMS_PER_PAGE) - 4;
  if (startPage < 0) startPage = 0;

  let endPage = startPage + 9;
  if (endPage >= totalPages) endPage = totalPages - 1;

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i + 1);
  }

  const goToNextPage = () => {
    const newOffset = offset + ITEMS_PER_PAGE;
    // Verificar si no excedemos el total de productos
    if (newOffset < totalItems) {
      setOffset(newOffset); // Avanzar al siguiente conjunto de productos
    }
  };

  const goToPreviousPage = () => {
    const newOffset = Math.max(offset - ITEMS_PER_PAGE, 0);
    setOffset(newOffset); // Retroceder al conjunto anterior de productos
  };

  const goToFirstPage = () => {
    setOffset(0); // Ir a la primera página
  };

  const goToLastPage = () => {
    // Calcular el último offset correctamente
    const lastPageOffset = Math.max(
      0,
      Math.floor((totalItems - 1) / ITEMS_PER_PAGE) * ITEMS_PER_PAGE
    );
    setOffset(lastPageOffset); // Ir a la última página
  };

  if (!searchTerm) {
    return <p>No se proporcionó un término de búsqueda.</p>;
  }

  if (loading) return <p>Cargando...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{`Resultados de la búsqueda: ${searchTerm}`}</h1>

      {productsToShow.length === 0 ? (
        <p>No se encontraron resultados para la búsqueda: {searchTerm}</p>
      ) : (
        <ul>
          {productsToShow.map((product) => (
            <li key={product.id}>
              <Link href={`/items/${product.id}`}>
                <h3>{product.title}</h3>
                <p>Precio: ${product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Paginación */}
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={goToPreviousPage}
          disabled={offset === 0}
        >
          Anterior
        </button>
        {startPage > 0 && (
          <button
            className={`${styles.paginationButton} ${styles.first}`}
            onClick={goToFirstPage}
            disabled={offset === 0}
          >
            1
          </button>
        )}

        {startPage > 0 && (
          <button className={`${styles.paginationButton} ${styles.ellipsis}`}>
            ...
          </button>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`${styles.paginationButton} ${
              offset / ITEMS_PER_PAGE === page - 1 ? styles.active : ""
            }`}
            onClick={() => setOffset((page - 1) * ITEMS_PER_PAGE)}
          >
            {page}
          </button>
        ))}

        <button
          className={styles.paginationButton}
          onClick={goToNextPage}
          disabled={offset + ITEMS_PER_PAGE >= totalItems}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ItemsPage;
