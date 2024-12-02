"use client";
import { useEffect, useState } from "react";
import PaginationControls from "@/components/organisms/paginationControls/PaginationControls";
import { fetchData } from "../actions"; // Asegúrate de importar la función fetchData
import { useRouter } from "next/navigation"; // Necesitamos para manejar la URL
import ProductsList from "@/components/organisms/productsList/ProductsList";
import ProductListingSkeleton from "@/components/molecules/productResultsCardSkeleton/ProductResultCardSkeleton";

export default function Home({searchParams}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter(); // Hook de Next.js para navegación

  // Obtener los parámetros de búsqueda y paginación de la URL
  const searchValue = searchParams.search; // Termino de búsqueda
  const page = Number(searchParams.page) || 1; // Número de página
  const per_page = Number(searchParams.per_page) || 10; // Elementos por página
  const offset = (page - 1) * per_page; // Calcular el offset basado en la página

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      // Realiza la búsqueda con el término y la paginación
      const { items, categories, total } = await fetchData(
        searchValue,
        offset,
        per_page
      );
      setProducts(items);
      setCategories(categories);
      setTotal(total);
      setLoading(false);
    };

    loadData(); // Cargar los productos cuando cambien los parámetros
  }, [searchValue, page, per_page]); // Dependemos de los parámetros search, page y per_page

  const start = (page - 1) * per_page;
  const end = start + per_page;

  // Calcular el total de páginas
  const totalPages = Math.ceil(total / per_page);

  // Cambiar la URL para navegar entre páginas
  const handlePageChange = (newPage) => {
    router.push(
      `/items?search=${encodeURIComponent(
        searchValue
      )}&page=${newPage}&per_page=${per_page}`
    );
  };

  return (
    <div>
      {loading ? (
        <ProductListingSkeleton />
      ) : (
        <>
          {products.length > 0 ? (
            <ProductsList products={products} />
          ) : (
            <p>No se encontraron resultados</p>
          )}

          {/* Pasamos totalPages como prop */}
          <PaginationControls
          searchParams={searchParams}
            hasNextPage={end < total}
            hasPrevPage={start > 0}
            totalPages={totalPages} // Pasa el total de páginas
            page={page}
            per_page={per_page}
            onPageChange={handlePageChange} // Pasamos el manejador de cambio de página
          />
        </>
      )}
    </div>
  );
}

