import { create } from 'zustand';

const useApiStore = create((set) => ({
  popularShoes: [],
  newArrivals: [],
  loading: false,
  error: null,
  setPopularShoes: (shoes) => set({ popularShoes: shoes }),
  setNewArrivals: (arrivals) => set({ newArrivals: arrivals }),
  setLoading: (isLoading) => set({ loading: isLoading }),
  setError: (errorMessage) => set({ error: errorMessage }),
}));

export default useApiStore;

