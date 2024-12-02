"use client";
import { useEffect, useState } from "react";
import PaginationControls from "@/components/organisms/paginationControls/PaginationControls";
import { fetchDataResults } from "../../lib/data";
import { useRouter } from "next/navigation";
import ProductsList from "@/components/organisms/productsList/ProductsList";
import ProductListingSkeleton from "@/components/molecules/productResultsCardSkeleton/ProductResultCardSkeleton";

export default function Home({searchParams}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const searchValue = searchParams.search;
  const page = Number(searchParams.page) || 1;
  const per_page = Number(searchParams.per_page) || 10;
  const offset = (page - 1) * per_page;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { items, categories, total } = await fetchDataResults(
        searchValue,
        offset,
        per_page
      );
      setProducts(items);
      setCategories(categories);
      setTotal(total);
      setLoading(false);
    };

    loadData();
  }, [searchValue, page, per_page]);

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const totalPages = Math.ceil(total / per_page);

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

          <PaginationControls
            searchParams={searchParams}
            hasNextPage={end < total}
            hasPrevPage={start > 0}
            totalPages={totalPages}
            page={page}
            per_page={per_page}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
