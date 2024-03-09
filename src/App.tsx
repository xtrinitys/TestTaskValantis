import React, { useEffect, useRef, useState } from "react";
import "./styles/App.css";
import { IProduct, SearchQuery } from "./types/types";
import ProductList from "./components/ProductList";
import ProductsService from "./API/ProductsService";
import { useFetching } from "./hooks/useFetching";
import { removeDuplicateObjects } from "./utils/utils";
import { ProductFilterOptions } from "./components/ProductFilter";
import { useObserver } from "./hooks/useObserver";
import Header from "./components/UI/Header/Header";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [offset, setOffset] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);
  const limit = 50;
  const lastProductRef = useRef<HTMLDivElement>(null);

  const setUniqueProducts = (products: IProduct[]) =>
    setProducts(removeDuplicateObjects(products, "id"));

  const [fetchProducts, isProductsLoading, productsError] = useFetching(
    async (
      offset: number,
      limit: number,
      search?: SearchQuery<ProductFilterOptions>,
    ) => {
      if (search?.query === "") {
        return;
      }

      const fetchData = async () => {
        let response;

        if (search) {
          response = await ProductsService.getFilteredProducts(
            search.filter,
            search.query,
          );
        } else {
          response = await ProductsService.getProducts(offset, limit);
        }

        return response;
      };

      const response = await fetchData();

      if (response) {
        if (search) {
          setIsFiltered(true);
          setUniqueProducts(response);
          setOffset(0);
        } else {
          setIsFiltered(false);
          offset === 0
            ? setUniqueProducts(response)
            : setUniqueProducts([...products, ...response]);
          updateOffset();
        }
      }
    },
  );

  const refreshProducts = () => {
    setOffset(0);
    fetchProducts(0, limit);
  };

  useEffect(() => {
    fetchProducts(offset, limit);
  }, []);

  useObserver(
    lastProductRef,
    isProductsLoading,
    () => fetchProducts(offset, limit),
    !isFiltered,
  );

  const onFilter = (search: SearchQuery<ProductFilterOptions>) => {
    fetchProducts(offset, limit, search);
  };

  function updateOffset() {
    setOffset(offset + limit);
  }

  return (
    <div className="App">
      <Header handleHomeButton={refreshProducts} handleFilter={onFilter} />
      <ProductList
        products={products}
        lastElementRef={lastProductRef}
        isProductsLoading={isProductsLoading}
      />
    </div>
  );
}

export default App;
