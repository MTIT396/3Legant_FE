import React, { createContext, useEffect, useState } from "react";
import { wishlistService } from "../services/wishlistService";
import { axiosClient } from "../utils/axios";
import { useUser } from "./UserContext";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { user } = useUser();
  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get("api/products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch Wishlist
  const fetchWishlist = async () => {
    try {
      const res = await wishlistService.getWishList();
      setWishlist(res.data.data || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
    fetchProducts();
  }, [user]);
  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProducts,
        wishlist,
        fetchWishlist,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
