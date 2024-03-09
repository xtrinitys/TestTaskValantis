import React from "react";
import HomeBtn from "../HomeBtn/HomeBtn";
import ProductFilter, {ProductFilterOptions} from "../../ProductFilter";
import cl from "./Header.module.css";
import {SearchQuery} from "../../../types/types";

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
    </header>
  );
};

export default Header;
