"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useProductsStore } from "@/stores/products-store";

import styles from "./Logo.module.scss";

const Logo = ({ searchTerm }) => {
  const { setSearchTerm } = useProductsStore();

  const handleClick = () => {
    if (searchTerm) {
      setSearchTerm("");
    }
  };

  return (
    <Link href="/" onClick={handleClick}>
      <div className={styles["logo__container"]}> 
      </div>
    </Link>
  );
};

export default Logo;
