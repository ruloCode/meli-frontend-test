"use client";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import styles from "./PaginationControls.module.scss";

const PaginationControls = ({
  searchParams,
  hasNextPage,
  hasPrevPage,
  totalPages, // Total de páginas disponibles
}) => {
  const router = useRouter();

  // Obtener la página actual y asegurarse de que sea un número válido
  const page = Math.max(Number(searchParams.page) || 1, 1);
  const per_page = Number(searchParams.per_page) || 10;
  const searchValue = searchParams.search || "";

  const changePage = (newPage) => {
    router.push(
      `/items?search=${encodeURIComponent(
        searchValue
      )}&page=${newPage}&per_page=${per_page}`
    );
  };

  const pageNumbers = [];
  const range = 4;

  for (
    let i = Math.max(1, page - range);
    i <= Math.min(totalPages, page + range);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationControls}>
      {page > 1 && (
        <button
          onClick={() => changePage(page - 1)}
          disabled={!hasPrevPage}
          className={styles.paginationControls__button}
        >
        <span>{"< "}</span>

          <p>{"Anterior"}</p>
        
        </button>
      )}

      {page > 5 && (
        <div className={styles.paginationControls__pageNumbers}>
          <button
            onClick={() => changePage(1)}
            className={`${styles.paginationControls__pageButton} ${
              page === 1 ? styles.active : ""
            }`}
            disabled={page === 1}
          >
            1
          </button>
          <div>...</div>
        </div>
      )}

      <div className={styles.paginationControls__container}>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
            className={`${styles.paginationControls__pageButton} ${
              pageNumber === page ? styles.active : ""
            }`}
            disabled={pageNumber === page}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        onClick={() => changePage(page + 1)}
        disabled={!hasNextPage}
        className={styles.paginationControls__button}
      >
        <p>{"Siguiente "}</p>
        
        <span>{">"}</span>
      </button>
    </div>
  );
};

const PaginationControlsWithSuspense = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <PaginationControls {...props} />
  </Suspense>
);

export default PaginationControlsWithSuspense;
