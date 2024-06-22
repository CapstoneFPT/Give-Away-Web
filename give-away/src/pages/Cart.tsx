import { Card } from "antd";
import { ShopContext } from "../../src/context/ShopContext";
import "./CSS/Cart.css";
import React, { useContext } from "react";
import Button from "antd/lib/button/button";
const Cart = () => {
  const shopContext = useContext(ShopContext);

  if (!shopContext) {
    return null; // or handle the case when ShopContext is null
  }

  const { all_product, cartItems, removeFromCart, updateCartItems } =
    shopContext;

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
              {all_product
                .filter((e: any) => cartItems[e.id] > 0)
                .map((e: any) => (
                  <div className="cartItem" key={e.id}>
                    <div className="product">
                      <img className="product-img" src={e.image} alt={e.name} />
                      <div className="product-content">
                        <p>
                          <h1>{e.name}</h1>
                          <button
                            className="remove-button"
                            onClick={() => removeFromCart(e.id)}
                          >
                            x
                          </button>
                        </p>
                        <h2>${e.new_price}</h2>
                        <h3> Size: M</h3>
                      </div>
                    </div>
                    <div className="interactive-button">
                      <button
                        onClick={() =>
                          updateCartItems(e.id, cartItems[e.id] - 1)
                        }
                      >
                        -
                      </button>
                      <span>{cartItems[e.id]}</span>
                      <button
                        onClick={() =>
                          updateCartItems(e.id, cartItems[e.id] + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <hr />
                  </div>
                ))}
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
