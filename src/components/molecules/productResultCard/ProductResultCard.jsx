import React from "react";
import Image from "next/image"; // Importar componente de imagen
import Text from "@/components/atoms/text/Text"; // Importar componente de texto
import styles from "./ProductResultCard.module.scss";

const ProductResultCard = ({ product }) => {
  const originalPrice = parseFloat(product.original_price);
  const currentPrice = parseFloat(product.price.amount);

  return (
    <div className={styles.productCard}>
      <Image
        src={product.picture}
        alt={product.name}
        width={160}
        height={160}
        objectFit="cover"
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
          {/* Mostrar el precio original solo si es mayor que el precio actual */}
          {originalPrice > currentPrice && (
            <Text
              text={`${product.original_price}`}
              currency
              size="micro"
              weight="regular"
              color="secondary"
              strikethrough
              fontFamily="primary-font"
            />
          )}

          <div className={styles.price__container}>
            {/* Mostrar el precio actual */}
            <Text
              text={`${product.price.amount}`}
              currency
              size="xlarge"
              weight="regular"
              color="primary"
              fontFamily="primary-font"
            />

            {/* Mostrar el porcentaje de descuento solo si es mayor que 0 */}
            {Number(product.discount_percentage) > 0 && (
              <Text
                text={`${product.discount_percentage}% OFF`}
                size="micro"
                weight="tiny"
                color="success-color"
                fontFamily="primary-font"
              />
            )}
          </div>

          {/* Mostrar la opción de pago en cuotas */}
          <Text
            text={product.installments}
            size="tiny"
            weight="regular"
            color="success-color"
            fontFamily="primary-font"
          />
        </div>

        {/* Mostrar la condición del producto si existe */}
        {product.condition && (
          <Text
            text={product.condition}
            size="tiny"
            weight="regular"
            color="success-color"
            fontFamily="primary-font"
          />
        )}

        {/* Mostrar el mensaje de envío gratis si aplica */}
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
