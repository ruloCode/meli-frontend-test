import Logo from "@/components/atoms/logo/Logo";
import SearchBar from "@/components/molecules/searchBar/SearchBar";
import React from "react";
import styles from "./Header.module.scss";
import MaxMarginTemplate from "@/components/templates/maxMarginTemplate/MaxMArginTemplate";

const Header = () => {
  return (
   <div className={styles.headerContianer}>
     <MaxMarginTemplate >
       <div className={styles.header}>
         <Logo />
         <SearchBar />
       </div>
     </MaxMarginTemplate>
   </div>
  );
};

export default Header;
