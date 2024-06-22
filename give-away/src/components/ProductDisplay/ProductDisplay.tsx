import React from "react";
import "./ProductDisplay.css";

import { ShopContext } from "../../context/ShopContext";
import { useContext } from "react";
const ProductDisplay = (props: any) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext) || {};
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-price">
          <div className="productdisplay-right-price-new">
            {product.new_price} VND
          </div>
        </div>
        <div className="productdisplay-right-description">
          A light weight and comfortable
        </div>
        <div className="productdisplay-right-size">
          <h1>Select size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
          </div>
        </div>
        <button
          onClick={() => {
            if (addToCart) {
              addToCart(product.id);
            }
          }}
        >
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span>Category:</span> Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Category:</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
