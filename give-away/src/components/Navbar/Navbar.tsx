import React, { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import { ShopContext } from "../../context/ShopContext";
import SearchBar from "../SearchBar/SearchBar";
const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const shopContext = useContext(ShopContext) ?? {};
  const cartItems = shopContext;
  const handleSearch = () => {};
  const totalItems = Object.values<number>(cartItems ?? {}).reduce(
    (total: number, quantity: number) => total + quantity,
    0
  );

  return (
    <div className="container">
      <div className="navbar">
        <div className="nav-left">
          <Link to="/" className="no-underline" onClick={() => setMenu("")}>
            <div className="nav-logo">
              <img src={logo} alt="" />
              <p>Give Away</p>
            </div>
          </Link>
        </div>
        <div className="nav-mid">
          <SearchBar onSearch={handleSearch} />
          <ul className="nav-menu">
            <li
              onClick={() => {
                setMenu("men");
              }}
            >
              <Link to="/men" className="no-underline">
                Men
              </Link>
              {menu === "men" ? <hr /> : <></>}
            </li>
            <li
              onClick={() => {
                setMenu("women");
              }}
            >
              <Link to="/women" className="no-underline">
                Women
              </Link>
              {menu === "women" ? <hr /> : <></>}
            </li>
            <li
              onClick={() => {
                setMenu("aunctions");
              }}
            >
              <Link to="/aunctions" className="no-underline">
                Aunctions
              </Link>
              {menu === "aunctions" ? <hr /> : <></>}
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <Login />
          <Link to="/cart" className="nav-cart">
            <img src={cart_icon} alt="" />
            {totalItems > 0 && (
              <div className="nav-cart-count">{totalItems}</div>
            )}
          </Link>

          <div className="wallet">225$</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
