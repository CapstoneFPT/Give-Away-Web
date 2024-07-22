import React from "react";
import Hero from "../components/Hero/Hero";
import Offers from "../components/Offers/Offers";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import Footer from "../components/Footer/Footer";
import DisplayItem from "../components/ItemsDisplay/ItemsDisplay";

const Shop = () => {
  return (
    <div>
      <Hero />
      
      <Offers />

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Shop;
