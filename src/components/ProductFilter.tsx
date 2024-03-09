import React, { useRef, useState } from "react";
import classNames from "classnames";
import { SearchQuery } from "../types/types";
import RadioInput from "./UI/RadioInput/RadioInput";

export enum ProductFilterOptions {
  PRODUCT = "product",
  BRAND = "brand",
  PRICE = "price",
}

interface ProductFilterProps {
  onFilter: (search: SearchQuery<ProductFilterOptions>) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilter }) => {
  const [isActive, setIsActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [search, setSearch] = useState<SearchQuery<ProductFilterOptions>>({
    query: "",
    filter: ProductFilterOptions.PRODUCT,
  });

  const parentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnFilter = () => {
    onFilter(search);
  };

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

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFilter = e.currentTarget.value as ProductFilterOptions;
    setSearch({
      ...search,
      filter: selectedFilter,
    });
  };

  const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, query: e.target.value });
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
          value={ProductFilterOptions.PRODUCT}
          checkedPredicate={ProductFilterOptions.PRODUCT === search.filter}
          onChange={changeFilter}
        />
        <RadioInput
          name="filter"
          value={ProductFilterOptions.BRAND}
          checkedPredicate={ProductFilterOptions.BRAND === search.filter}
          onChange={changeFilter}
        />
        <RadioInput
          name="filter"
          value={ProductFilterOptions.PRICE}
          checkedPredicate={ProductFilterOptions.PRICE === search.filter}
          onChange={changeFilter}
        />
      </div>
      <button
        className={classNames("product-filter__btn-search", {
          active: isActive,
        })}
        onClick={handleOnFilter}
      >
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
