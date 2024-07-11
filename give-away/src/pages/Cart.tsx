import { Card } from "antd";

import "./CSS/Cart.css";
import React, { useContext, useEffect, useState } from "react";
import Button from "antd/lib/button/button";
const Cart = () => {
  return (
    <Card>
      <div className="cartContainer">
        <Card
          style={{
            marginLeft: "250px",
            borderRadius: "10px",
          }}
        >
          <div className="first-half">
            <div className="page-header justify-content-between align-items-center d-sm-block">
              <h2>
                <span className="your-bag">SHOPPING BAG</span>
              </h2>
            </div>
            <div className="nav-cart">
              <span className="nav-items">
                <span>Shopping Bag (2)</span>
              </span>
            </div>
            <div className="cartItemsDisplay">
              <hr />
              {/* add product item here */}
              <div className="cartItem">
                <div className="product">
                  <img className="product-img" />
                  <div className="product-content">
                    <p>
                      <h1>name</h1>
                      <button className="remove-button">x</button>
                    </p>
                    <h2>$price</h2>
                    <h3> Size: M</h3>
                  </div>
                </div>

                <hr />
              </div>
            </div>
            <p>
              <a href="/">Back to shop</a>
            </p>
          </div>
        </Card>

        <div className="second-half">
          <div className="order-summary-rows">
            <div className="col-12">Order Summary</div>
            <div className="col-8">
              <p>Total:</p>
              <p>Estimated Delivery & Handling</p>
            </div>
            <div className="col-4">
              <p className="text-right sub-total"> 921712982 VND </p>
              <p className="text-right sub-total">Free</p>
            </div>
            <Button
              style={{
                marginTop: "20px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "10px",
                height: "50px",
              }}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Cart;
