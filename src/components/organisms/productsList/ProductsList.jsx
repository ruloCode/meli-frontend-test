import React from "react";
import Link from "next/link";
import styles from "./ProductsList.module.scss";
import ProductResultCard from "@/components/molecules/productResultCard/ProductResultCard";
import MaxMarginTemplate from "../../templates/maxWidthMarginTemplate/MaxWidthMarginTemplate";

const ProductsList = ({ products }) => {
  return (
    <div className={styles.productsList}>
      <MaxMarginTemplate>
        <ul>
          {products.map((product) => (
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
