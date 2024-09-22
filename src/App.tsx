import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage.tsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmPassword from "./pages/ConfirmPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Breadcrumb from "./components/Breadcrums/Breadcrumb";
import DetailProductAunction from "./pages/DetailProductAunction";
import RuleAunction from "./pages/RuleAunction";
import RuleConsign from "./pages/RuleConsign.tsx";
import AunctionList from "./pages/AunctionList";
import Auction from "./pages/Auction.tsx";
import Consign from "./pages/ConsignForm";
import ProfilePage from "./pages/ProfilePage.tsx";
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
import Search from "./pages/MainProduct/Search";
import Branches from "./components/Branches/Branches";
import DepositHistory from "./pages/Transaction/DepositHistory";
import PurchaseHistory from "./pages/Transaction/PurchaseHistory.tsx";
import RechargeHistory from "./pages/Transaction/RechargeHistory.tsx";
import ConsignDetail from "./pages/Transaction/ConsignDetail.tsx";
import RefundHistory from "./pages/Transaction/RefundHistory.tsx";
import PayoutHistory from "./pages/Transaction/PayoutHistory.tsx";
import BranchItems from "./pages/MainProduct/BranchItems.tsx";
import ChildItems from "./pages/MainProduct/ChildItems.tsx";
import ChildItemShop from "./pages/MainProduct/ChildItemShop.tsx";
import AddressManagementPage from "./pages/AddressManagementPage.tsx";
import EmailVerification from "./components/Auth/EmailVerification.tsx";
import RefundList from "./pages/RefundList.tsx";
import RefundDetail from "./pages/RefundDetail.tsx";
import ProcessPayment from "./components/Payment/ProcessPayment.tsx";
import TransactionHistory from "./pages/Transaction/AllTransaction.tsx";
import AuctionDetail from "./pages/Transaction/AuctionDetail.tsx";
import { AuthProvider } from "./components/Auth/Auth.tsx";
import { PrivateRoute } from "./components/Auth/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div>
                    <CartProvider>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Shop />} />
                            <Route path="/verify-email" element={<><Navbar /><EmailVerification /></>} />
                            <Route path="/login" element={<><Navbar /><Login /></>} />
                            <Route path="/register" element={<><Navbar /><Register /></>} />
                            <Route path="/forgotPassword" element={<><Navbar /><ForgotPassword /></>} />
                            <Route path="/confirmPassword" element={<><Navbar /><ConfirmPassword /></>} />
                            <Route path="/ruleAunction" element={<><Navbar /><RuleAunction /></>} />
                            <Route path="/ruleConsign" element={<><Navbar /><RuleConsign /></>} />
                            <Route path="/men" element={<><Navbar /><Breadcrumb /><Men /><Footer /></>} />
                            <Route path="/women" element={<><Navbar /><Breadcrumb /><Women /><Footer /></>} />
                            <Route path="/search" element={<><Navbar /><Breadcrumb /><Search /><Footer /></>} />
                            <Route path="/branch" element={<><Navbar /><Breadcrumb /><Branches /><Footer /></>} />
                            <Route path="/shopBranch/:shopId" element={<><Navbar /><BranchItems /><Footer /></>} />
                            <Route path="/itemDetail/:itemId" element={<><Navbar /><ItemDetail /><Footer /></>} />
                            <Route path="/listItems/:masterItemCode" element={<><Navbar /><ChildItems /><Footer /></>} />
                            <Route path="/shopBranch/:shopId/listItems/:masterItemId" element={<><Navbar /><ChildItemShop /><Footer /></>} />
                            <Route path="/auction-detail/:auctionId" element={<><Navbar /><AuctionDetail /></>} />
                            <Route path="/consign" element={<><Navbar /><Consign /></>} />
                            <Route path="/aunctionList" element={<><Navbar /><AunctionList /></>} />

                            {/* Private Routes */}
                            <Route element={<PrivateRoute />}>
                                <Route path="/cart" element={<><Navbar /><CartPage /></>} />
                                <Route path="/process-payment" element={<><Navbar /><ProcessPayment /></>} />
                                <Route path="/profile" element={<><Navbar /><ProfilePage /></>} />
                                <Route path="/change-password" element={<><Navbar /><ChangePassword /></>} />
                                <Route path="/refunds" element={<><Navbar /><Refunds /></>} />
                                <Route path="/add-fund" element={<><Navbar /><Fund /></>} />
                                <Route path="/detailProductAuction/:auctionItemID" element={<><Navbar /><DetailProductAunction /></>} />
                                <Route path="/deposit/:auctionId" element={<><Navbar /><Deposit /></>} />
                                <Route path="/auction/:auctionId" element={<><Navbar /><Auction /></>} />
                                <Route path="/transaction/withdraw" element={<><Navbar /><Withdraw /></>} />
                                <Route path="/transaction/deposit-history" element={<><Navbar /><DepositHistory /></>} />
                                <Route path="/transaction/withdraw-history" element={<><Navbar /><WithdrawHistory /></>} />
                                <Route path="/transaction/Auction-history" element={<><Navbar /><AuctionHistory /></>} />
                                <Route path="/transaction/My-consign" element={<><Navbar /><MyConsign /></>} />
                                <Route path="/transaction/purchase-history" element={<><Navbar /><PurchaseHistory /></>} />
                                <Route path="/transaction/recharge-history" element={<><Navbar /><RechargeHistory /></>} />
                                <Route path="transaction/refund-history" element={<><Navbar /><RefundHistory /></>} />
                                <Route path="/order-list" element={<><Navbar /><OrderList /></>} />
                                <Route path="/order-detail/:id" element={<><Navbar /><OrderDetail /></>} />
                                <Route path="/transaction/payout-history" element={<><Navbar /><PayoutHistory /></>} />
                                <Route path="/transaction/My-consign/:consignId" element={<><Navbar /><ConsignDetail /><Footer /></>} />
                                <Route path="/upload" element={<><Navbar /><ImageUpload /></>} />
                                <Route path="/profile/addresses" element={<><Navbar /><AddressManagementPage /></>} />
                                <Route path="/profile/refundList" element={<><Navbar /><RefundList /></>} />
                                <Route path="/refundDetail/:refundId" element={<><Navbar /><RefundDetail /></>} />
                                <Route path="/transactions" element={<><Navbar /><TransactionHistory /></>} />
                            </Route>
                        </Routes>
                    </CartProvider>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
