import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    airports: [],
    companies: [],
    expeditions: [],
  },
  reducers: {
    addAirplane: (state, action) => {
      if (
        state.airports.find(
          (item) =>
            item.name.toLowerCase() === action.payload.name.toLowerCase() ||
            item.code.toLowerCase() === action.payload.code.toLowerCase()
        )
      ) {
        toast.error("Lütfen mevcut olmayan bir havalimanı ekleyiniz");
      } else {
        state.airports.push(action.payload);
        toast.success("Havalimanı Eklendi");
      }
    },
    addCompany: (state, action) => {
      if (
        state.companies.find(
          (item) =>
            item.name.toLowerCase() === action.payload.name.toLowerCase()
        )
      ) {
        toast.error("Lütfen mevcut olmayan bir firma ekleyiniz");
      } else {
        state.companies.push(action.payload);
        toast.success("Firma Eklendi");
      }
    },
    addFlight: (state, action) => {
      const item = state.companies.find(
        (item) => item.name === action.payload.company
      );

      item.airCrafts.push({
        id: action.payload.id,
        name: action.payload.name,
        capacity: action.payload.capacity,
      });
      toast.success("Uçak Eklendi");
    },
    addExpedition: (state, action) => {
      console.log(action.payload);
      state.expeditions.push(action.payload);
      toast.success("Sefer Eklendi");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAirplane, addCompany, addFlight, addExpedition } =
  flightsSlice.actions;

export default flightsSlice.reducer;
