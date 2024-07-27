import React from "react";
import Hero from "../components/Hero/Hero";
import Offers from "../components/Offers/Offers";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import Footer from "../components/Footer/Footer";
import ItemDisplayHome from "../components/ItemsDisplay/ItemDisplayHome";
import Navbar from "../components/Navbar/Navbar";
import CarouselComponent from "../components/Navbar/CarouselComponent";
import Branches from "../components/Branches/Branches";

const Shop = () => {
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <Navbar />
        {/* Define other routes and components here */}
      </div>
      <Hero />
      {/* <Offers /> */}
      <CarouselComponent/>
      <ItemDisplayHome/>
      <Branches/>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Shop;
