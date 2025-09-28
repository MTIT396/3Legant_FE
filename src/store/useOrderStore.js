import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrderStore = create(
  persist(
    (set) => ({
      orderStore: null,
      setOrderStore: (order) => set({ orderStore: order }),
      clearOrderStore: () => set({ orderStore: null }),
    }),
    { name: "order-storage" } // lưu vào localStorage
  )
);
