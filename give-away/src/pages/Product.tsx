import React from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";

import Footer from "../components/Footer/Footer";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";

const Product = () => {
  const shopContext = useContext(ShopContext);
  const { productId, category } = useParams();
  const product = shopContext?.all_product.find(
    (e) => e.category === category && e.name === productId
  );

  return (
    <div>
      <ProductDisplay product={product} />
      <DescriptionBox />
      <Footer />
    </div>
  );
};

export default Product;
