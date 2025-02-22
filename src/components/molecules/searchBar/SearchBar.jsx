"use client";
import React, { useEffect, useState, Suspense } from "react";
import Input from "@/components/atoms/input/Input";
import Icon from "@/components/atoms/buttonIcon/ButtonIcon";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (localSearchTerm) {
      router.push(
        `/items?search=${encodeURIComponent(
          localSearchTerm
        )}&page=1&per_page=10`
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form onSubmit={handleSubmit} className={styles["search-bar"]}>
        <Input
          type="text"
          value={localSearchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Buscar productos, marcas y más..."
        />
        <div
          className={styles["search-bar__icon-container"]}
          onClick={handleSearch}
        >
          <Icon
            src={"/assets/ic_Search@2x.png"}
            alt="search_icon"
            width={16}
            height={16}
          />
        </div>
      </form>
    </Suspense>
  );
};

export default SearchBar;
