import React from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import Breadcrum from "../components/Breadcrums/Breadcrum";
import Footer from "../components/Footer/Footer";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <Footer />
    </div>
  );
};

export default Product;
