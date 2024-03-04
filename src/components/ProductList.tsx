import React, {FC} from 'react';
import {IProduct} from "../types/types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: IProduct[];
}

const ProductList: FC<ProductListProps> = ({products}) => {
  return (
    <div className='product-list'>
      {products.map(product => <ProductCard product={product}/>)}
    </div>
  );
};

export default ProductList;