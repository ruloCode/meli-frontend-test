import Breadcrumbs from "@/components/molecules/breadcrumbs/Breadcrumbs";
import MaxWidthMarginTemplate from "@/components/templates/maxWidthMarginTemplate/MaxWidthMarginTemplate";
import React from "react";
import styles from "./ProductDetail.module.scss";
import ProductGallery from "@/components/molecules/productGallery/ProductGallery";
import { formatCurrency } from "@/utils/currencyFormatter";

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
          <Breadcrumbs steps={getBreadcrumbs()} />
          <div className={styles.productCard}>
            <div className={styles.productImageAndInfo}>
            <div className={styles.productImageContainer}>
                <ProductGallery images={product.pictures} />
            </div>

              <div className={styles.productInfo}>
                <small className={styles.productInfo__status}>
                  Nuevo | +100 vendidos
                </small>
                <div className={styles.productName}>
                  <h1 className={styles.productInfo__title}>
                    {product?.title}
                  </h1>
                  <p className={styles.productInfo__seller}>
                    Por: OCEANGREEN ARGENTINA
                  </p>
                </div>
                <div>
                  <p className={styles.productInfo__price}>
                    {formatCurrency(product?.price)}
                  </p>
                  <span className={styles.productInfo__installments}>
                    {" "}
                    Mismo precio en 10 cuotas de $151.423
                  </span>
                </div>
                {product?.free_shipping && (
                  <p className={styles.productInfo__shipping}>Envío gratis</p>
                )}


                  {product?.color && (
                    <div className={styles.productColor}>
                      <span className={styles.productInfo__colorLabel}>
                        Color:{" "}
                      </span>
                      <strong className={styles.productInfo__color}>
                        {product?.color}
                      </strong>
                    </div>
                  )}
              </div>
            </div>
            <div className={styles.productDescription}>
              <h2 className={styles.productDescription__title}>Descripción</h2>
              <p className={styles.productDescription__text}>
                {product?.description}
              </p>
            </div>
          </div>
        </div>
      </MaxWidthMarginTemplate>
    </div>
  );
};

export default ProductDetail;
