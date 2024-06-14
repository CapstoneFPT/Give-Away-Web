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
import Aunction from "./pages/AunctionList";
import Consign from "./pages/ConsignForm";
import Fund from "./pages/Fund";

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
            path="/aunctions"
            element={
              <>
                <Navbar />
                <Aunction />
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
                <RuleAunction />
              </>
            }
          />
          <Route
            path="/add-fund"
            element={
              <>
                <Navbar />
                <Fund />
              </>
            }
          />
          <Route
            path="/consign"
            element={
              <>
                <Navbar />
                <Consign />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
