import React, { FC } from "react";
import { IProduct } from "../types/types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: IProduct[];
}

// TODO: if not products
const ProductList: FC<ProductListProps> = ({ products }) => {
  const renderProducts = (products: IProduct[]) => {
    let column = -1;

    return products.map((product, index) => {
      if (index === products.length - 1) {
        column = 4;
      } else {
        if (column === 7) {
          column = -1;
        }
        column += 2;
      }

      return <ProductCard key={product.id} product={product} column={column} />;
    });
  };

  return <div className="product-list">{renderProducts(products)}</div>;
};

export default ProductList;
