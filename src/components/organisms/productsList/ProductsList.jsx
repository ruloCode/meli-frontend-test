"use client";
import React, { useState, useEffect } from "react";
import ProductResultCard from "@/components/molecules/productResultCard/ProductResultCard";
import Link from "next/link";
import styles from "./ProductsList.module.scss";
import MaxMarginTemplate from "../../templates/maxWidthMarginTemplate/MaxWidthMarginTemplate";

const ITEMS_PER_PAGE = 10;

const ProductsList = ({ initialProducts, totalItems, totalPages, searchTerm }) => {
  const [productsToShow, setProductsToShow] = useState(initialProducts);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setProductsToShow(initialProducts);
  }, [initialProducts]);

  const goToNextPage = () => {
    setOffset((prevOffset) => Math.min(prevOffset + ITEMS_PER_PAGE, totalItems));
  };

  const goToPreviousPage = () => {
    setOffset((prevOffset) => Math.max(prevOffset - ITEMS_PER_PAGE, 0));
  };

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
          <button onClick={goToPreviousPage} disabled={offset === 0}>
            Anterior
          </button>
          <button onClick={goToNextPage} disabled={offset + ITEMS_PER_PAGE >= totalItems}>
            Siguiente
          </button>
        </div>
      </MaxMarginTemplate>
    </div>
  );
};



export default ProductsList;
