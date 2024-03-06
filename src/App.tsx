import React, { useEffect, useRef, useState } from "react";
import "./styles/App.css";
import { IProduct } from "./types/types";
import ProductList from "./components/ProductList";
import ProductsService from "./API/ProductsService";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { removeDuplicateObjects } from "./utils/utils";
import { useObserver } from "./hooks/useObserver";

// TODO: EXACTLY 50 ELEMENTS PER PAGE
function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(0);
  const limit = 50;
  const lastElement = useRef<HTMLDivElement>(null);

  const [fetchProducts, isProductsLoading, productsError] = useFetching(
    async (page: number, limit: number) => {
      const offset = page * limit;
      const response = await ProductsService.getProducts(offset, limit);
      if (response) {
        updateProducts(response);
      }
    },
  );

  useObserver(lastElement, isProductsLoading, setNextPage);

  useEffect(() => {
    fetchProducts(page, limit);
  }, [page, limit]);

  function updateProducts(newItems: IProduct[]) {
    setProducts(
      removeDuplicateObjects<IProduct>([...products, ...newItems], "id"),
    );
  }

  function setNextPage() {
    setPage(page + 1);
  }

  return (
    <div className="App">
      <ProductList products={products} />
      <div ref={lastElement} style={{ height: 20 }}></div>
      {isProductsLoading && <Loader />}
    </div>
  );
}

export default App;
