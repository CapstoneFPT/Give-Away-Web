import React from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";

import Footer from "../components/Footer/Footer";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productName, category } = useParams();
  const product = all_product.find(
    (e) => e.category === category && e.name === productName
  );

  return (
    <div>
      <ProductDisplay product={product} />
      <DescriptionBox />
      {product && <RelatedProducts category={product.category} />}
      <Footer />
    </div>
  );
};

export default Product;
