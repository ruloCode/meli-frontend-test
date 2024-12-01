"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import styles from "./PaginationControls.module.scss"; // Importa el SCSS module

const PaginationControls = ({
    hasNextPage,
    hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Obtener la página actual y asegurarse de que sea un número válido
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const per_page = Number(searchParams.get("per_page")) || 10; // Número de elementos por página
  const searchValue = searchParams.get("search") || ''; // Término de búsqueda

  // Función para cambiar la página
  const changePage = (newPage) => {
    router.push(`/items?search=${encodeURIComponent(searchValue)}&page=${newPage}&per_page=${per_page}`);
  };

  return (
    <div className={styles.paginationControls}>
      <button
        onClick={() => changePage(page - 1)} // Cambiar página hacia atrás
        className={styles.paginationControls__button}
        disabled={!hasPrevPage}
      >
        Anterior
      </button>
      <div>
        <p className={styles.paginationControls__pageNumber}>Página {page}</p>
      </div>
      <button
        onClick={() => changePage(page + 1)} // Cambiar página hacia adelante
        disabled={!hasNextPage}
        className={styles.paginationControls__button}
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginationControls;
