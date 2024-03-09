import React from "react";
import HomeBtn from "../HomeBtn/HomeBtn";
import ProductFilter, {ProductFilterOptions} from "../../ProductFilter";
import cl from "./Header.module.css";
import {SearchQuery} from "../../../types/types";
import ScrollToTopBtn from "../ScrollToTopBtn/ScrollToTopBtn";

interface HeaderProps {
  handleHomeButton: () => void;
  handleFilter: (search: SearchQuery<ProductFilterOptions>) => void;
}

const Header: React.FC<HeaderProps> = ({ handleHomeButton, handleFilter }) => {
  return (
    <header className={cl.header}>
      <HomeBtn onClick={handleHomeButton}>
        <i className="ri-home-4-line"></i>
      </HomeBtn>
      <ProductFilter onFilter={handleFilter} />
      <ScrollToTopBtn />
    </header>
  );
};

export default Header;
