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
// import PurchasePoints from "./pages/PurchasePoints";

import RuleDeposit from "./pages/RuleDeposit";
import AunctionList from "./pages/AunctionList";
import Aunction from "./pages/Aunction";

import Consign from "./pages/ConsignForm";
import Profile from "./pages/Profile";

import ChangePassword from "./pages/ChangePassword";
import Refunds from "./pages/Refunds";
import Withdraw from "./pages/Withdraw";

import MyConsign from "./pages/Transaction/MyConsign";
import AuctionHistory from "./pages/Transaction/AuctionHistory";
import OrderList from "./pages/OrderList";
import WithdrawHistory from "./pages/Transaction/WithdrawHistory";
import OrderDetail from "./pages/OrderDetail";

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
                <AunctionList />
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
            path="/ruleDeposit"
            element={
              <>
                <Navbar />
                <RuleDeposit />
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
            path="/aunction"
            element={
              <>
                <Navbar />
                <Aunction />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <Profile />
              </>
            }
          />
          <Route
            path="/change-password"
            element={
              <>
                <Navbar />
                <ChangePassword />
              </>
            }
          />
          <Route
            path="/refunds"
            element={
              <>
                <Navbar />
                <Refunds />
              </>
            }
          />
          <Route
            path="/transaction/withdraw"
            element={
              <>
                <Navbar />
                <Withdraw />
              </>
            }
          />
          <Route
            path="/transaction/withdraw-history"
            element={
              <>
                <Navbar />
                <WithdrawHistory />
              </>
            }
          />
          <Route
            path="/transaction/Auction-history"
            element={
              <>
                <Navbar />
                <AuctionHistory />
              </>
            }
          />
          <Route
            path="/transaction/My-consign"
            element={
              <>
                <Navbar />
                <MyConsign />
              </>
            }
          />
          <Route
            path="/order-list"
            element={
              <>
                <Navbar />
                <OrderList />
              </>
            }
          />
          <Route
            path="/order-detail/:id"
            element={
              <>
                <Navbar />
                <OrderDetail />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;