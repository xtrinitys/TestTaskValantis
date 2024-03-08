import React, { useRef, useState } from "react";
import classNames from "classnames";
import { SearchQuery } from "../types/types";
import RadioInput from "./UI/RadioInput/RadioInput";

export enum ProductFilterOptions {
  TITLE = "title",
  BRAND = "brand",
  PRICE = "price",
  EMPTY = "",
}

interface ProductFilterProps {
  setSearch: (search: SearchQuery<ProductFilterOptions>) => void;
  search: SearchQuery<ProductFilterOptions>;
}

const ProductFilter = ({ setSearch, search }: ProductFilterProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnFocus = () => {
    setIsActive(true);
  };

  const handleOnBlur = (e: React.FocusEvent) => {
    if (parentRef.current && !parentRef.current.contains(e.relatedTarget)) {
      setIsActive(false);
      setIsDropdownActive(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const changeFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    const selectedFilter = e.currentTarget.value as ProductFilterOptions;
    setSearch({
      ...search,
      filter:
        search.filter === selectedFilter
          ? ProductFilterOptions.EMPTY
          : selectedFilter,
    });
  };

  const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch({ ...search, query });
  };

  return (
    <div
      className={classNames("product-filter", { active: isActive })}
      ref={parentRef}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    >
      <div
        className={classNames("product-filter__dropdown", {
          active: isDropdownActive,
        })}
        tabIndex={0}
      >
        <RadioInput
          name="filter"
          value={ProductFilterOptions.TITLE}
          checkedPredicate={ProductFilterOptions.TITLE === search.filter}
          onClick={changeFilter}
        />
        <RadioInput
          name="filter"
          value={ProductFilterOptions.BRAND}
          checkedPredicate={ProductFilterOptions.BRAND === search.filter}
          onClick={changeFilter}
        />
        <RadioInput
          name="filter"
          value={ProductFilterOptions.PRICE}
          checkedPredicate={ProductFilterOptions.PRICE === search.filter}
          onClick={changeFilter}
        />
      </div>
      <button className="product-filter__btn-search">
        <i className="ri-search-line"></i>
      </button>
      <div className="product-filter__input-box">
        <button className="product-filter__btn-filter" onClick={toggleDropdown}>
          <i className="ri-equalizer-line"></i>
        </button>
        <input
          className="product-filter__input"
          type="text"
          ref={inputRef}
          value={search.query}
          onChange={changeQuery}
          placeholder="Filter products"
        />
      </div>
    </div>
  );
};

export default ProductFilter;
