import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmPassword from "./pages/ConfirmPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Breadcrumb from "./components/Breadcrums/Breadcrumb";
import DetailProductAunction from "./pages/DetailProductAunction";
import RuleAunction from "./pages/RuleAunction";
import PurchasePoints from "./pages/PurchasePoints";

import RuleDeposit from "./pages/RuleDeposit";
import AunctionList from "./pages/AunctionList";
import Aunction from "./pages/Aunction";
import { Footer } from "antd/es/layout/layout";

function App(): JSX.Element {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                
                <Shop />
              </>
            }
          />
          <Route
            path="/men"
            element={
              <>
                <Navbar />
                <Breadcrumb />
                <ShopCategory category="men" />
              </>
            }
          />
          <Route
            path="/women"
            element={
              <>
                <Navbar />
                <Breadcrumb />
                <ShopCategory category="women" />
              </>
            }
          />
          <Route
            path="/:category/:clothingType/:productId"
            element={
              <>
                <Navbar />
                <Breadcrumb />
                <Product />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Navbar />
                <Cart />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
              </>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <>
                <Navbar />
                <ForgotPassword />
              </>
            }
          />
          <Route
            path="/confirmPassword"
            element={
              <>
                <Navbar />
                <ConfirmPassword />
              </>
            }
          />

          <Route
            path="/aunctionList"
            element={
              <>
                <Navbar />
                <AunctionList/>
              </>
            }
          />
          <Route
            path="/detailProductAunction"
            element={
              <>
                <Navbar />
                <DetailProductAunction />
              </>
            }
          />
          <Route
            path="/ruleAunction"
            element={
              <>
                <Navbar />
                <RuleAunction/>
              </>
            }
          />
          <Route
            path="/ruleDeposit"
            element={
              <>
                <Navbar />
                <RuleDeposit/>
              </>
            }
          />
          <Route
            path="/purchasePoints"
            element={
              <>
                <Navbar />
                <PurchasePoints/>
              </>
            }
          />
          <Route
            path="/aunction"
            element={
              <>
                <Navbar />
                <Aunction/>
              </>
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
