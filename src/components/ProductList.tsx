import React, { FC } from "react";
import { IProduct } from "../types/types";
import ProductCard from "./ProductCard";
import Loader from "./UI/Loader/Loader";

interface ProductListProps {
  products: IProduct[];
  lastElementRef: React.RefObject<HTMLDivElement>;
  isProductsLoading: boolean;
}

const ProductList: FC<ProductListProps> = ({
  products,
  lastElementRef,
  isProductsLoading,
}) => {
  return (
    <div className="product-list">
      {products.map((product, index) => {
        return <ProductCard key={product.id} product={product} />;
      })}
      <div ref={lastElementRef} style={{ height: 20 }}></div>
      {isProductsLoading && <Loader />}
      {!isProductsLoading && products.length <= 0 && (
        <div className="product-list__not-found">Products not found :(</div>
      )}
    </div>
  );
};

export default ProductList;
