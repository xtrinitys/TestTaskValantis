import React, { FC } from "react";
import { IProduct } from "../../types/types";
import ProductCard from "./ProductCard";
import Loader from "../UI/Loader/Loader";

interface ProductListProps {
  products: IProduct[];
  isProductsLoading: boolean;
}

const ProductList: FC<ProductListProps> = ({
  products,
  isProductsLoading,
}) => {
  return (
    <div className="product-list">
      {products.map((product, index) => {
        return <ProductCard key={product.id} product={product} />;
      })}
      {isProductsLoading && <Loader />}
      {!isProductsLoading && products.length <= 0 && (
        <div className="product-list__not-found">
          <span>Products not found</span> <i className="ri-emotion-sad-line"></i>
        </div>
      )}
    </div>
  );
};

export default ProductList;
