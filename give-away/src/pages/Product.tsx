import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product as Prod, ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";

import Footer from "../components/Footer/Footer";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";

const Product = () => {
  const shopContext = useContext(ShopContext);
  const [all_product, setAllProduct] = useState<Prod[]>([]);
  const { productId, category } = useParams();
  const product = all_product.find(

    (e) => e.category === category && e.name === productId

  );
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await shopContext?.getAllProduct('Male');
      if (products) {
        setAllProduct(products);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductDisplay product={product} />
      <DescriptionBox />
      <Footer />
    </div>
  );
};

export default Product;
