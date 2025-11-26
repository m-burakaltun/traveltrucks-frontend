import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/api';

// fetch campers (supports backend-side filtering via params)
export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async ({ page = 1, limit = 6, filters = {} }, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (filters.location) params.location = filters.location;
      if (filters.vehicleType) params.vehicleType = filters.vehicleType;
      if (filters.features && filters.features.length) {
        // map features to hasX keys expected by backend
        filters.features.forEach((f) => {
          const key = `has${f.charAt(0).toUpperCase() + f.slice(1)}`;
          params[key] = true;
        });
      }
      const res = await API.get('/campers', { params });
      return { data: res.data, page };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  'campers/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/campers/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    page: 1,
    limit: 6,
    status: 'idle',
    error: null,
    hasMore: true,
    currentDetail: null,
  },
  reducers: {
    clearCampers(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.page === 1) state.items = action.payload.data;
        else state.items = state.items.concat(action.payload.data);
        state.page = action.payload.page;
        state.hasMore = action.payload.data.length >= state.limit;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.status = 'loading';
        state.currentDetail = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentDetail = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCampers } = campersSlice.actions;
export default campersSlice.reducer;
