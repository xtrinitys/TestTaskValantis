import React, { FC } from "react";
import { IProduct } from "../types/types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: IProduct[];
}

// TODO: if not products
const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product, index) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
