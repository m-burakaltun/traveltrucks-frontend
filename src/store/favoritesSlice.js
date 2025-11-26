import { createSlice } from '@reduxjs/toolkit';

const LOCAL_KEY = 'traveltrucks_favorites_v1';
const initial = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: initial },
  reducers: {
    addFavorite(state, action) {
      if (!state.items.find(x => x.id === action.payload.id)) state.items.push(action.payload);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.items));
    },
    removeFavorite(state, action) {
      state.items = state.items.filter(x => x.id !== action.payload);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.items));
    }
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
