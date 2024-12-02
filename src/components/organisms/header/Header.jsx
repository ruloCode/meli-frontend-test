"use client";
import Logo from "@/components/atoms/logo/Logo";
import SearchBar from "@/components/molecules/searchBar/SearchBar";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import MaxMarginTemplate from "../../templates/maxWidthMarginTemplate/MaxWidthMarginTemplate";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm");
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  return (
    <div className={styles["header"]}>
      <MaxMarginTemplate>
        <div className={styles["header__container"]}>
          <Logo searchTerm={searchTerm} />
          <SearchBar searchParams={searchTerm} />
        </div>
      </MaxMarginTemplate>
    </div>
  );
};

export default Header;
