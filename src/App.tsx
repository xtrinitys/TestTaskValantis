import React, { useEffect, useRef, useState } from "react";
import "./styles/App.css";
import { IProduct, SearchQuery } from "./types/types";
import ProductList from "./components/Product/ProductList";
import ProductsService from "./API/ProductsService";
import { useFetching } from "./hooks/useFetching";
import { removeDuplicateObjects } from "./utils/utils";
import { ProductFilterOptions } from "./components/Product/ProductFilter";
import { useObserver } from "./hooks/useObserver";
import Header from "./components/UI/Header/Header";
import Pagination from "./components/UI/Pagination/Pagination";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const limit = 50;
  const lastProductRef = useRef<HTMLDivElement>(null);

  const [fetchProducts, isProductsLoading] = useFetching(
    async (
      page: number,
      limit: number,
      search?: SearchQuery<ProductFilterOptions>,
    ) => {
      if (search?.query === "") {
        return;
      }

      const offset = page * limit;

      const fetchData = async (): Promise<IProduct[] | null> => {
        if (search) {
          return await ProductsService.getFilteredProducts(
            search.filter,
            search.query,
          );
        }
        return await ProductsService.getProducts(offset, limit);
      };

      const handleData = (response: IProduct[] | null) => {
        if (response) {
          if (search) {
            const uniqueProducts = removeDuplicateObjects(response, "id");
            setIsFiltered(true);
            setPage(0);
            setTotalPages(Math.ceil(uniqueProducts.length / 50));
            setFilteredProducts(uniqueProducts);
          } else {
            setIsFiltered(false);
            page === 0
              ? setUniqueProducts(response)
              : setUniqueProducts([...products, ...response]);
            nextPage();
          }
        }
      };

      const response = await fetchData();
      handleData(response);
    },
  );

  const refreshProducts = () => {
    setPage(0);
    fetchProducts(0, limit);
  };

  useEffect(() => {
    fetchProducts(page, limit);
  }, []);

  useEffect(() => {
    if (isFiltered) {
      const offset = page * limit;
      setProducts(filteredProducts.slice(offset, offset + limit));
      window.scrollTo({ top: 0 });
    }
  }, [filteredProducts, page, limit, isFiltered]);

  useObserver(
    lastProductRef,
    isProductsLoading,
    () => fetchProducts(page, limit),
    !isFiltered,
  );

  const onFilter = (search: SearchQuery<ProductFilterOptions>) => {
    fetchProducts(page, limit, search);
  };

  function setUniqueProducts(products: IProduct[]) {
    setProducts(removeDuplicateObjects(products, "id"));
  }

  function nextPage() {
    setPage(page + 1);
  }

  return (
    <div className="App">
      <Header handleHomeButton={refreshProducts} handleFilter={onFilter} />
      <ProductList products={products} isProductsLoading={isProductsLoading} />
      <div ref={lastProductRef} style={{ height: 20 }}></div>
      {isFiltered && products.length > 0 && (
        <Pagination
          currentPage={page}
          onPageChange={(p: number) => setPage(p)}
          pagesCount={totalPages}
        />
      )}
    </div>
  );
}

export default App;
