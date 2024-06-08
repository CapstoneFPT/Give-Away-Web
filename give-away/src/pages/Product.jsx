import React from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Footer from "../components/Footer/Footer";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  console.log(product?.category);
  return (
    <div>
      <Breadcrumb product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      {product && <RelatedProducts category={product.category} />}
      <Footer />
    </div>
  );
};

export default Product;
