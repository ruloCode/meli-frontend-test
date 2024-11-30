// components/molecules/ProductCard/ProductCard.js
import React from "react";
import Image from "@/components/atoms/image/Image"; // Importar componente de imagen
import Text from "@/components/atoms/text/Text"; // Importar componente de texto
import styles from "./ProductResultCard.module.scss";

const ProductResultCard = ({ product }) => {
  console.log(product, "product");
  return (
    <div className={styles.productCard}>
      <Image
        src={product.picture}
        alt={product.name}
        className={styles.productImage}
      />
      <div className={styles.productInfo}>
        <div className={styles.productName__container}>
          <Text
            text={product.title}
            size="regular"
            weight="regular"
            color="primary"
            fontFamily="primary-font"
          />
          <Text
            text={`Por: ${product.seller}`}
            size="tiny"
            weight="tiny"
            color="secondary"
            fontFamily="primary-font"
          />
        </div>

        <div>
          <Text
            text={`${product.price.amount}`}
            currency
            size="xlarge"
            weight="regular"
            color="primary"
            fontFamily="primary-font"
          />
          <Text
            text={product.installments}
            size="tiny"
            weight="regular"
            color="success-color"
            fontFamily="primary-font"
          />
        </div>
        {product.condition && (
          <Text
            text={product.condition}
            size="tiny"
            weight="regular"
            color="success-color"
            fontFamily="primary-font"
          />
        )}
        {product.free_shipping && (
          <Text
            text={product.free_shipping}
            size="tiny"
            weight="bold"
            color="success-color"
            fontFamily="primary-font"
          />
        )}
      </div>
    </div>
  );
};

export default ProductResultCard;
