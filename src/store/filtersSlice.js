// src/store/filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    form: "",
    equipment: [],
  },

  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setForm(state, action) {
      state.form = action.payload;
    },
    toggleEquipment(state, action) {
      const value = action.payload;
      if (state.equipment.includes(value)) {
        state.equipment = state.equipment.filter((x) => x !== value);
      } else {
        state.equipment.push(value);
      }
    },
    resetFilters(state) {
      state.location = "";
      state.form = "";
      state.equipment = [];
    },
  },
});

export const { setLocation, setForm, toggleEquipment, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
