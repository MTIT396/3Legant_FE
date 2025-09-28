import { create } from "zustand";

export const useOpenStore = create((set) => ({
  isOpenSaleOff: true,
  setIsOpenSaleOff: (value) => set({ isOpenSaleOff: value }),
  isOpenSidebar: false,
  setIsOpenSidebar: (value) => set({ isOpenSidebar: value }),
}));
