import React, {useEffect, useState} from 'react';
import './styles/App.css'
import {IProduct} from "./types/types";
import ProductList from "./components/ProductList";
import ProductsService from "./API/ProductsService";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(  () => {
    const fetchProducts = async () => {
      const responseProducts = await ProductsService.getProducts();
      responseProducts ? setProducts(responseProducts) : setProducts([]);
    };

    fetchProducts().catch(console.error);
  }, [])

  return (
    <div className="App">
      <ProductList products={products}/>
    </div>
  );
}

export default App;
