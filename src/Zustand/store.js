import { create } from 'zustand';

const useApiStore = create((set) => ({
  popularShoes: [],
  newArrivals: [],
  seeAll:[],
  loading: false,
  error: null,
  setPopularShoes: (shoes) => set({ popularShoes: shoes }),
  setNewArrivals: (arrivals) => set({ newArrivals: arrivals }),
  setSeeAll: (all) => set({ seeAll:all}),
  setLoading: (isLoading) => set({ loading: isLoading }),
  setError: (errorMessage) => set({ error: errorMessage }),
}));

export default useApiStore;

