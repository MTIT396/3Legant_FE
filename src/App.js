import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Cart from "./pages/ShoppingCart/Cart";
import Checkout from "./pages/ShoppingCart/Checkout";
import Order from "./pages/ShoppingCart/Order";
import MyAccount from "./pages/MyAccount/MyAccount";
import Address from "./pages/MyAccount/Address";
import Wishlist from "./pages/MyAccount/Wishlist";
import Orders from "./pages/MyAccount/Orders";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Product from "./pages/Product";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ScrollToTop from "./components/ScrollToTop";
import ContactUs from "./pages/ContactUs";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="font-primary">
        {/* Toast Container */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          {/* Product */}
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/contactus" element={<ContactUs />}></Route>
          {/* Cart */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/cart/checkout" element={<Checkout />}></Route>
            <Route path="/cart/order" element={<Order />}></Route>
            {/* Account */}
            <Route path="/account" element={<MyAccount />}></Route>
            <Route path="/account/address" element={<Address />}></Route>
            <Route path="/account/orders" element={<Orders />}></Route>
            <Route path="/account/wishlist" element={<Wishlist />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
