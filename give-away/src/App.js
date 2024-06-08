import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Aunction from "./pages/Aunction";
import ConfirmPassword from "./pages/ConfirmPassword";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
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

                <ShopCategory category="men" />
              </>
            }
          />
          <Route
            path="/women"
            element={
              <>
                <Navbar />

                <ShopCategory category="women" />
              </>
            }
          />
          <Route
            path="/:category/:clothingType/:productName"
            element={
              <>
                <Navbar />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
