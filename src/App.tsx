import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmPassword from "./pages/ConfirmPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Breadcrumb from "./components/Breadcrums/Breadcrumb";
import DetailProductAunction from "./pages/DetailProductAunction";
import RuleAunction from "./pages/RuleAunction";
import RuleDeposit from "./pages/RuleDeposit";
import AunctionList from "./pages/AunctionList";
import Aunction from "./pages/Aunction";
import Consign from "./pages/ConsignForm";
import Profile from "./pages/Profile";
import Footer from "./components/Footer/Footer";
import ChangePassword from "./pages/ChangePassword";
import Refunds from "./pages/Refunds";
import Withdraw from "./pages/Withdraw";
import MyConsign from "./pages/Transaction/MyConsign";
import AuctionHistory from "./pages/Transaction/AuctionHistory";
import OrderList from "./pages/OrderList";
import WithdrawHistory from "./pages/Transaction/WithdrawHistory";
import OrderDetail from "./pages/OrderDetail";
import Fund from "./pages/Fund";
import Men from "./pages/MainProduct/Men";
import Women from "./pages/MainProduct/Women";
import ItemDetail from "./components/ItemsDisplay/ItemDetail";
import { CartProvider } from "./pages/CartContext";
import Deposit from "./pages/Deposit";
import ImageUpload from "./pages/Firebase/ImageUpload";
import ItemDisplayHome from "./components/ItemsDisplay/ItemDisplayHome";
import CarouselComponent from "./components/Navbar/CarouselComponent";
import Search from "./pages/MainProduct/Search";
import Branches from "./components/Branches/Branches";
import DepositHistory from "./pages/Transaction/DepositHistory";
import PurchaseHistory from "./pages/Transaction/PurchaseHistory.tsx";
import RechargeHistory from "./pages/Transaction/RechargeHistory.tsx";
import ConsignDetail from "./pages/Transaction/ConsignDetail.tsx";
import RefundHistory from "./pages/Transaction/RefundHistory.tsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <CartProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* <Navbar /> */}
                  <Shop />
                </>
              }
            />
            <Route
              path="/:category/:clothingType/:productId"
              element={
                <>
                  <Navbar />
                  <Breadcrumb />
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
              path="/detailProductAuction/:auctionItemID"
              element={
                <>
                  <Navbar />
                  <DetailProductAunction />
                </>
              }
            />
            <Route
              path="/deposit"
              element={
                <>
                  <Navbar />
                  <Deposit />
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
              path="/auction/:auctionId"
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
              path="/add-fund"
              element={
                <>
                  <Navbar />
                  <Fund />
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
              path="/transaction/deposit-history"
              element={
                <>
                  <Navbar />
                  <DepositHistory />
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
              path="/transaction/purchase-history"
              element={
                <>
                  <Navbar />
                  <PurchaseHistory />
                </>
              }
            />
            <Route
              path="/transaction/recharge-history"
              element={
                <>
                  <Navbar />
                  <RechargeHistory />
                </>
              }
            />
            <Route
              path="transaction/refund-history"
              element={
                <>
                  <Navbar />
                  <RefundHistory />
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
            <Route
              path="/branch"
              element={
                <>
                  <Branches />
                </>
              }
            />
            <Route
              path="/men"
              element={
                <>
                  <Navbar />
                  <Breadcrumb />
                  <Men />
                  <Footer />
                </>
              }
            />
            <Route
              path="/women"
              element={
                <>
                  <Navbar />
                  <Breadcrumb />
                  <Women />
                  <Footer />
                </>
              }
            />
            <Route
              path="/search"
              element={
                <>
                  {" "}
                  <Navbar />
                  <Breadcrumb />
                  <Search />
                  <Footer />
                </>
              }
            />
            <Route
              path="/itemDetail/:itemId"
              element={
                <>
                  <Navbar />
                  <ItemDetail />
                  <Footer />
                </>
              }
            />
            <Route
              path="/ConsignDetail" // Sửa lại đường dẫn
              element={
                <>
                  <Navbar />
                  <ConsignDetail />
                  <Footer />
                </>
              }
            />
            <Route
              path="/upload" // Thêm route cho component upload ảnh
              element={
                <>
                  <Navbar />
                  <ImageUpload />
                </>
              }
            />
          </Routes>
        </CartProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
