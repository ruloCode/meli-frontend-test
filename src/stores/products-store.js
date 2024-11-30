import { create } from "zustand";

export const useProductsStore = create((set) => ({
  products: [],  // Productos actuales que se están mostrando en la página
  productsCache: {},  // Caché de productos (por offset)
  totalItems: 0,
  totalPages: 0,
  searchTerm: "",
  offset: 0,
  setProducts: (products) => set({ products }),
  setTotalItems: (totalItems) => set({ totalItems }),
  setTotalPages: (totalPages) => set({ totalPages }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setOffset: (offset) => set({ offset }),
  setProductsCache: (offset, products) => set((state) => {
    const updatedCache = { ...state.productsCache, [offset]: products };
    return { productsCache: updatedCache };
  }),
}));
