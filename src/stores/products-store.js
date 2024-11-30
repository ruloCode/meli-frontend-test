import { create } from "zustand";

export const useProductsStore = create((set) => ({
  products: [],
  totalItems: 0,
  totalPages: 0,
  searchTerm: "", // Inicializar como una cadena vacía
  offset: 0,
  setProducts: (products) => set({ products }),
  setTotalItems: (totalItems) => set({ totalItems }),
  setTotalPages: (totalPages) => set({ totalPages }),
  setSearchTerm: (searchTerm) => set({ searchTerm }), // Función para actualizar searchTerm
  setOffset: (offset) => set({ offset }),
}));
