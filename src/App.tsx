import React, {useEffect, useState} from 'react';
import './styles/App.css'
import {IProduct} from "./types/types";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
      setProducts([
        {
          brand: "Jacob & Co",
          id: "18e4e3bd-5e60-4348-8c92-4f61c676be1f",
          price: 52400.0,
          product: "Золотое кольцо с бриллиантом"
        },
        {
          brand: null,
          id: "711837ec-57f6-4145-b17f-c74c2896bafe",
          price: 4500.0,
          product: "Золотое кольцо с бриллиантами"
        },
        {
          brand: null,
          id: "6c972a4a-5b91-4a98-9780-3a19a7f41560",
          price: 55000.0,
          product: "Золотой браслет с бриллиантами и аметистами"
        },
        {
          brand: null,
          id: "a71d4c3a-33cf-4d63-ae29-f5f2f154ba85",
          price: 17280.0,
          product: "Золотое кольцо с бриллиантами и сапфиром"
        },
        {
          brand: null,
          id: "15cf0d0e-047c-4e61-9b26-4566345bdece",
          price: 16800.0,
          product: "Золотое кольцо с дымчатым кварцем"
        },
        {
          brand: "Jacob & Co",
          id: "18e4e3bd-5e60-4348-8c92-4f61c676be1f",
          price: 52400.0,
          product: "Золотое кольцо с бриллиантом"
        },
        {
          brand: null,
          id: "711837ec-57f6-4145-b17f-c74c2896bafe",
          price: 4500.0,
          product: "Золотое кольцо с бриллиантами"
        },
        {
          brand: null,
          id: "6c972a4a-5b91-4a98-9780-3a19a7f41560",
          price: 55000.0,
          product: "Золотой браслет с бриллиантами и аметистами"
        },
        {
          brand: null,
          id: "a71d4c3a-33cf-4d63-ae29-f5f2f154ba85",
          price: 17280.0,
          product: "Золотое кольцо с бриллиантами и сапфиром"
        },
        {
          brand: null,
          id: "15cf0d0e-047c-4e61-9b26-4566345bdece",
          price: 16800.0,
          product: "Золотое кольцо с дымчатым кварцем"
        }
      ]);
  }, []);


  return (
    <div className="App">
      <ProductList products={products}/>
    </div>
  );
}

export default App;
