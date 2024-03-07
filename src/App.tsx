import React, { useEffect, useRef, useState } from "react";
import "./styles/App.css";
import { IProduct } from "./types/types";
import ProductList from "./components/ProductList";
import ProductsService from "./API/ProductsService";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { removeDuplicateObjects } from "./utils/utils";
import { useObserver } from "./hooks/useObserver";
import ScrollToTopBtn from "./components/UI/ScrollToTopBtn/ScrollToTopBtn";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 50;
  const lastElement = useRef<HTMLDivElement>(null);

  const [fetchProducts, isProductsLoading, productsError] = useFetching(
    async () => {
      const response = await ProductsService.getProducts(offset, limit);
      if (response) {
        appendProducts(response);
        updateOffset();
      }
    },
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  useObserver(lastElement, isProductsLoading, fetchProducts);

  function updateOffset() {
    setOffset(offset + limit);
  }

  function appendProducts(newItems: IProduct[]) {
    setProducts(
      removeDuplicateObjects<IProduct>([...products, ...newItems], "id"),
    );
  }

  return (
    <div className="App">
      <ScrollToTopBtn />
      <ProductList products={products} />
      <div ref={lastElement} style={{ height: 20 }}></div>
      {isProductsLoading && <Loader />}
    </div>
  );
}

export default App;
