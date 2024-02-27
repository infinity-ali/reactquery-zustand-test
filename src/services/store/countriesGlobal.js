import { create } from "zustand";

export const useStore = create((set) => ({
    countries: [],
    selectedCountries: [],
    // addCountry: (newCountries) => {
    //     console.log("new countries to add:", newCountries);
    //     set((state) => ({ selectedCountries: [...state.selectedCountries, ...newCountries] }))
    // },
    addCountry: (countries) => set((state) => ({ selectedCountries: countries })),
    removeCountry: (id) => set((state) => ({ selectedCountries: state.selectedCountries.filter(country => country.id !== id) })),
}))
