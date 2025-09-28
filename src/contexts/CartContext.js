/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { cartService } from "../services/cartService";
import { useUser } from "./UserContext";
export const CartContext = createContext();
const CartProvider = ({ children }) => {
  // Fetch Cart
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { user } = useUser();
  const fetchCart = async () => {
    if (!user) return;
    try {
      const res = await cartService.getCart();
      setCart(res.data.cart);
      setTotalPrice(res.data.total_price);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Open Close Cart
  const [isOpenCart, setIsOpenCart] = useState(false);
  const handleCloseCart = () => {
    setIsOpenCart(false);
  };
  const handleOpenCart = () => {
    setIsOpenCart(true);
  };

  return (
    <CartContext.Provider
      value={{
        handleCloseCart,
        isOpenCart,
        handleOpenCart,
        // Fetch Cart
        cart,
        setCart,
        totalPrice,
        setTotalPrice,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
