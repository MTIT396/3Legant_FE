const { axiosClient } = require("../utils/axios");

export const wishlistService = {
  getWishList: async () => {
    return await axiosClient.get("/api/wishlists");
  },
  addToWishlist: async (product_id, label, color) => {
    return await axiosClient.post("/api/wishlists", {
      product_id: product_id,
      label: label,
      color: color,
    });
  },
  removeFromWishlist: async (product_id, label, color) => {
    return await axiosClient.delete("/api/wishlists", {
      data: { product_id: product_id, label: label, color: color },
    });
  },
};
