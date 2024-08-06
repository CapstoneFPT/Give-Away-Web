import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";
import { AccountApi } from "../../api";
import { useCart } from "../../pages/CartContext";
import BranchNavbar from "./BranchNavbar";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [balance, setBalance] = useState(0);
  const cart = useCart();

  useEffect(() => {
    const fetchBalance = async () => {
      const userId = JSON.parse(localStorage.getItem("userId") || "null"); 
      try {
        const accountApi = new AccountApi()
        // const response = await axios.get(`${BASE_URL}/accounts/${userId}`); 

        const response = await accountApi.apiAccountsIdGet(userId)
      
        setBalance(response.data?.data?.balance || 0);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [balance]);

  const handleSearch = () => {};
  const formatBalance = (balance:any) => {
    return new Intl.NumberFormat('de-DE').format(balance);
  };

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
                setMenu("aunctionList");
              }}
            >
              <Link to="/aunctionList" className="no-underline">
                Auctions
              </Link>
              {menu === "aunctionList" ? <hr /> : <></>}
            </li>
            <li
              onClick={() => {
                setMenu("branches");
              }}
            >
              <Link to="/consign" className="no-underline">
                Consign/Sale
              </Link>
              {menu === "branches" ? <hr /> : <></>}
            </li>
         
              <BranchNavbar  onBranchSelect={handleSearch} />
            
           
            
          </ul>
        </div>
        <div className="nav-right">
          <Login />
          <Link to="/cart" className="nav-cart">
            <img src={cart_icon} alt="" />
            <div className="nav-cart-count">{cart.state.cartItems.length}</div>
          </Link>
          <div style={{ fontSize: "1.2em",
                color: "#d1d124",
                fontWeight: "bolder",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                padding: "0.2em 0.4em",
                borderRadius: "5px",
                backgroundColor: "rgba(255, 255, 255, 0.573)"}}>{formatBalance(balance)} VND</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
