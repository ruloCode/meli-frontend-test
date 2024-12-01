import React from "react";
import Link from "next/link";
import styles from "./ProductsList.module.scss";
import { useProductsStore } from "@/stores/products-store";
import ProductResultCard from "@/components/molecules/productResultCard/ProductResultCard";
import MaxMarginTemplate from "../../templates/maxWidthMarginTemplate/MaxWidthMarginTemplate";

const ProductsList = () => {
  const { products, offset } = useProductsStore();

  // Calcular el rango de productos para la página actual
  const productsPerPage = 10;
  const startIndex = offset * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className={styles.productsList}>
      <MaxMarginTemplate>
        <ul>
          {currentProducts.map((product) => (
            <li key={product.id}>
              <Link href={`/items/${product.id}`}>
                <ProductResultCard product={product} />
              </Link>
            </li>
          ))}
        </ul>
      </MaxMarginTemplate>
    </div>
  );
};

export default ProductsList;
