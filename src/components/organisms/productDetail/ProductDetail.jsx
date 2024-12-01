import Breadcrumbs from "@/components/molecules/breadcrumbs/Breadcrumbs";
import MaxWidthMarginTemplate from "@/components/templates/maxWidthMarginTemplate/MaxWidthMarginTemplate";
import React from "react";
import styles from "./ProductDetail.module.scss";
import Image from "next/image";
import Text from "@/components/atoms/text/Text";

const ProductDetail = ({ product }) => {

  const getBreadcrumbs = () => {
    if (product.categorys.length > 1) {
      return [
        { label: product.categorys[0], href: "/" },
        { label: product.categorys[1], href: "/" },
        { label: product.title, href: "/items" },
      ];
    } else {
      return [
        { label: product.categorys[0], href: "/" },
        { label: product.title, href: "/items" },
      ];
    }
  };
  return (
    <div className={styles.productDetail}>
      <MaxWidthMarginTemplate>
        <div className={styles.productDetail__container}>
          <Breadcrumbs
            steps={getBreadcrumbs()}
          />
          <div className={styles.productCard}>
            <div className={styles.productImageAndInfo}>
              <div className={styles.imageContainer}>
                <Image
                  src={product.pictures[0]}
                  alt={product.title}
                  fill
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <Text
                  text={"Nuevo | +100 vendidos"}
                  size="xsmall"
                  weight="tiny"
                  color="primary"
                />
                <div className={styles.productName}>
                  <Text text={product?.title} size="medium" weight="bold" />
                  <Text
                    text={"Por: OCEANGREEN ARGENTINA"}
                    size="small"
                    weight="tiny"
                  />
                </div>
                <div>
                  <Text
                    text={product?.price}
                    currency
                    size="large"
                    weight="regular"
                  />
                  <Text
                    text={"Mismo precio en 10 cuotas de $151.426"}
                    size="small"
                    weight="tiny"
                    color="success-color"
                  />
                </div>
                {product?.free_shipping && (
                  <Text
                    text={"Envío gratis"}
                    size="small"
                    weight="bold"
                    color="success-color"
                  />
                )}
             
                <div className={styles.productColor}>
                  <Text text={`Color: `} size="small" weight="regular" />
                  <Text
                    text={` ${product?.color}`}
                    size="small"
                    weight="bold"
                  />
                </div>
              </div>
            </div>
            <div className={styles.productDescription}>
              <Text
                text={"Descripción"}
                size="medium"
                weight="regular"
                color="primary"
              />
              <Text text={product?.description} size="small" weight="regular" />
            </div>
          </div>
        </div>
      </MaxWidthMarginTemplate>
    </div>
  );
};

export default ProductDetail;
