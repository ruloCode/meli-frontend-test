import React, { useState, useEffect } from "react";
import { fetchData } from "../../../app/actions";
import Link from "next/link";
import styles from "./ProductsList.module.scss";
import { useProductsStore } from "@/stores/products-store";

import ProductResultCard from "@/components/molecules/productResultCard/ProductResultCard";
import MaxMarginTemplate from "../../templates/maxWidthMarginTemplate/MaxWidthMarginTemplate";

const ITEMS_PER_PAGE = 10; // Cantidad de productos por página

const ProductsList = () => {
  const { searchTerm, setSearchTerm, offset, setOffset, products, setProducts, setTotalItems, setTotalPages, productsCache, setProductsCache, totalPages, totalItems } = useProductsStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productsToShow, setProductsToShow] = useState([]); // Productos que se deben mostrar en la página

  // Obtener productos si no están en caché o si no se han cargado
  const getProducts = async (searchTerm, offset) => {
    setLoading(true);
    setError(null);

    try {
      // Verifica si ya están en el caché
      if (productsCache[offset]) {
        setProductsToShow(productsCache[offset]);
        return;
      }

      // Si no están en caché, realiza la llamada API
      const { items, total } = await fetchData(searchTerm, offset);

      // Actualiza los productos y paginación
      setProducts(items);
      setTotalItems(total);
      setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));

      // Guarda en caché
      setProductsCache(offset, items);
      
      setProductsToShow(items); // Muestra los productos cargados
    } catch (error) {
      setError("Hubo un error al realizar la búsqueda.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Actualiza los productos para mostrar en la página actual
  const updateProductsToShow = () => {
    const startIdx = offset;
    const endIdx = offset + ITEMS_PER_PAGE;
    setProductsToShow(products.slice(startIdx, endIdx));
  };

  useEffect(() => {
    if (searchTerm) {
      getProducts(searchTerm, offset); // Solo carga los productos si hay un término de búsqueda
    }
  }, [searchTerm, offset]);

  useEffect(() => {
    // Actualiza los productos a mostrar cada vez que se cambie el offset
    if (products.length > 0) {
      updateProductsToShow();
    }
  }, [products, offset]);

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
    if (newOffset < totalItems) {
      setOffset(newOffset);
    }
  };

  const goToPreviousPage = () => {
    const newOffset = Math.max(offset - ITEMS_PER_PAGE, 0);
    setOffset(newOffset);
  };

  const goToFirstPage = () => {
    setOffset(0);
  };

  if (!searchTerm) {
    return <p>No se proporcionó un término de búsqueda.</p>;
  }

  if (loading) return <p>Cargando...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.productsList}>
      <MaxMarginTemplate>
        {productsToShow.length === 0 ? (
          <p>No se encontraron resultados para la búsqueda: {searchTerm}</p>
        ) : (
          <ul>
            {productsToShow.map((product) => (
              <li key={product.id}>
                <Link href={`/items/${product.id}`}>
                  <ProductResultCard product={product} />
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
      </MaxMarginTemplate>
    </div>
  );
};

export default ProductsList;
