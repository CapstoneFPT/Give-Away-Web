import React, { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import { ShopContext } from "../../context/ShopContext";
import SearchBar from "../SearchBar/SearchBar";
import Breadcrumb from "../Breadcrums/Breadcrumb";
const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { cartItems } = useContext(ShopContext);
  const handleSearch = (searchTerm) => {};
  const totalItems = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
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
          <Link to="/cart">
            <img src={cart_icon} alt="" />
          </Link>
          {totalItems > 0 && <div className="nav-cart-count">{totalItems}</div>}
        </div>
      </div>
      <div className="nav-breadcrumb">
        <Breadcrumb />
      </div>
    </div>
  );
};

export default Navbar;
