"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

import styles from "./Logo.module.scss";

const Logo = () => {


  return (
    <Link href="/" >
      <div className={styles["logo__container"]}> 
      </div>
    </Link>
  );
};

export default Logo;
