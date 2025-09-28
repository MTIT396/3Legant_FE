import { axiosClient } from "../utils/axios";

export const reviewServices = {
  addToReviews: async (product_id, rating, comment, items) => {
    return await axiosClient.post("/api/reviews", {
      product_id: product_id,
      rating: rating,
      comment: comment,
      items: items,
    });
  },
};
