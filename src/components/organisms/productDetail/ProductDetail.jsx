import Breadcrumbs from "@/components/molecules/breadcrumbs/Breadcrumbs";
import MaxWidthMarginTemplate from "@/components/templates/maxWidthMarginTemplate/MaxWidthMarginTemplate";
import React from "react";
import styles from "./ProductDetail.module.scss";
import Image from "next/image";
import Text from "@/components/atoms/text/Text";
// import Image from "@/components/atoms/image/Image";

const ProductDetail = ({ product }) => {
  console.log(product);
  return (
    <div className={styles.productDetail}>
      <MaxWidthMarginTemplate>
        <div className={styles.productDetail__container}>
          <Breadcrumbs
            steps={[
              { label: "Home", href: "/" },
              { label: "Items", href: "/items" },
            ]}
          />
          <div className={styles.productCard}>
            <div className={styles.productImageAndInfo}>
              <div className={styles.imageContainer}>
                <Image
                  src={product.pictures[0].url}
                  alt={product.title}
                  fill
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <Text
                  text={product?.title}
                  size="xlarge"
                  weight="bold"
                  color="primary"
                />
                <Text
                  text={product?.price}
                  currency
                  size="xlarge"
                  weight="bold"
                  color="primary"
                />
              </div>
            </div>
            <Text
              text={product?.description}
              size="xlarge"
              weight="bold"
              color="primary"
            />
          </div>
        </div>
      </MaxWidthMarginTemplate>
    </div>
  );
};

export default ProductDetail;
