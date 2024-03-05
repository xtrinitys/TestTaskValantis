import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { IProduct } from "./types/types";
import ProductList from "./components/ProductList";
import ProductsService from "./API/ProductsService";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [fetchProducts, isProductsLoading, productsError] = useFetching(
    async (limit: number, offset: number) => {
      const response = await ProductsService.getProducts(limit, offset);
      response ? setProducts(response) : setProducts([]);
    },
  );

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <div className="App">
      {
        isProductsLoading && <Loader/>
      }
      <ProductList products={products} />
    </div>
  );
}

export default App;
