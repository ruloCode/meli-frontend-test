"use client";
import { useEffect, useState } from "react";
import PaginationControls from "@/components/organisms/paginationControls/PaginationControls";
import { fetchData } from "../actions"; // Asegúrate de importar la función fetchData
import { useRouter, useSearchParams } from "next/navigation"; // Necesitamos para manejar la URL

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams(); // Obtener los parámetros de búsqueda de la URL
  const router = useRouter(); // Hook de Next.js para navegación

  // Obtener los parámetros de búsqueda y paginación de la URL
  const searchValue = searchParams.get("search") || ''; // Termino de búsqueda
  const page = Number(searchParams.get("page")) || 1; // Número de página
  const per_page = Number(searchParams.get("per_page")) || 10; // Elementos por página
  const offset = (page - 1) * per_page; // Calcular el offset basado en la página

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      // Realiza la búsqueda con el término y la paginación
      const { items, categories, total } = await fetchData(searchValue, offset, per_page);
      setProducts(items);
      setCategories(categories);
      setTotal(total);
      setLoading(false);
    };

    loadData(); // Cargar los productos cuando cambien los parámetros

  }, [searchValue, page, per_page]); // Dependemos de los parámetros search, page y per_page

  const start = (page - 1) * per_page;
  const end = start + per_page;

  // Cambiar la URL para navegar entre páginas
  const handlePageChange = (newPage) => {
    router.push(`/items?search=${encodeURIComponent(searchValue)}&page=${newPage}&per_page=${per_page}`);
  };

  return (
    <div>
      <h1>Page {page}</h1>
      <h2>Per page {per_page}</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {products.length > 0 ? (
            products.map((entry) => (
              <div key={entry.id}>
                <p>{entry.title}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron resultados para: "{searchValue}"</p>
          )}

          <PaginationControls
            hasNextPage={end < total}
            hasPrevPage={start > 0}
            page={page}
            per_page={per_page}
            onPageChange={handlePageChange} // Pasamos el manejador de cambio de página
          />
        </>
      )}
    </div>
  );
}
