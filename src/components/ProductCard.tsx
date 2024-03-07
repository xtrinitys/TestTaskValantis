import React, { FC } from "react";
import { IProduct } from "../types/types";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={"product-list__card"}>
      <div className="product-list__card-id">{product.id}</div>
      <div className="product-list__card-item">
        <span>{product.product}</span>
        <span>{product.brand}</span>
      </div>
      <div className="product-list__card-footer">
        <div className="product-list__card-price">{product.price} ₽</div>
        <button className="product-list__card-button">
          <i className="ri-shopping-cart-line"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
