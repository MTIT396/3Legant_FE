import { axiosClient } from "../utils/axios";

export const orderService = {
  createOrder: async (form) => {
    return await axiosClient.post("/api/orders", form);
  },
  getOrders: async () => {
    return await axiosClient.get("/api/orders");
  },
  getOrder: async (order_id) => {
    return await axiosClient.get(`/api/orders/${order_id}`);
  },
};
