// src/store/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initial = JSON.parse(localStorage.getItem("favorites") || "[]");

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: initial,
  },
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((x) => x !== id);
      } else {
        state.items.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
