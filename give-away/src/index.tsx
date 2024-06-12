import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ShopContextProvider from "./context/ShopContext";
import { UserProvider } from "./context/UserContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <UserProvider>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
