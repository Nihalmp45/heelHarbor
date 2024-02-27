import { create } from 'zustand';

const useApiStore = create((set) => ({
  popularShoes: [],
  newArrivals: [],
  seeAll:[],
  searchProducts:[],
  likedProducts: [],
  loading: false,
  error: null,
  setPopularShoes: (shoes) => set({ popularShoes: shoes }),
  setNewArrivals: (arrivals) => set({ newArrivals: arrivals }),
  setSeeAll: (all) => set({ seeAll:all}),
  setSearchProducts:(products) => set({ searchProducts:products}),
  setLikedProducts: (likedProducts) => set({ likedProducts }),
  setLoading: (isLoading) => set({ loading: isLoading }),
  setError: (errorMessage) => set({ error: errorMessage }),
}));

export default useApiStore;

