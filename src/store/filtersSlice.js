import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    location: '',
    vehicleType: '',
    features: [],
  },
  reducers: {
    setLocation(state, action) { state.location = action.payload; },
    setVehicleType(state, action) { state.vehicleType = action.payload; },
    toggleFeature(state, action) {
      const f = action.payload;
      if (state.features.includes(f)) state.features = state.features.filter(x => x !== f);
      else state.features.push(f);
    },
    clearFilters(state) {
      state.location = '';
      state.vehicleType = '';
      state.features = [];
    }
  }
});

export const { setLocation, setVehicleType, toggleFeature, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
