const { axiosClient } = require("../utils/axios");

export const cartService = {
  addToCart: async (product_id, quantity = 1, label, color) => {
    return axiosClient.post("/api/cart", {
      product_id: product_id,
      quantity: quantity,
      label: label,
      color: color,
    });
  },
  getCart: async () => {
    return axiosClient.get("/api/cart");
  },
  updateCartItem: async (product_id, new_quantity, label, color) => {
    return axiosClient.put(`/api/cart/${product_id}`, {
      quantity: new_quantity,
      label: label,
      color: color,
    });
  },
  clearCart: async () => {
    return axiosClient.delete("/api/cart");
  },
  removeFromCart: async (product_id, label, color) => {
    return axiosClient.delete(`/api/cart/${product_id}`, {
      data: {
        label: label,
        color: color,
      },
    });
  },
};
