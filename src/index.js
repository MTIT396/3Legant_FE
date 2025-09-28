import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ProductProvider from "./contexts/ProductContext";
import CartProvider from "./contexts/CartContext";
import UserProvider from "./contexts/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <ProductProvider>
      <CartProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CartProvider>
    </ProductProvider>
  </UserProvider>
);
