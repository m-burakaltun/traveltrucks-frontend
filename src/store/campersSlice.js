// src/store/campersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCampersApi, fetchCamperByIdApi } from "../api/api";

// Liste (filtre + sayfalama)
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters, thunkAPI) => {
    try {
      return await fetchCampersApi(filters || {});
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch campers");
    }
  }
);

// Detay
export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, thunkAPI) => {
    try {
      return await fetchCamperByIdApi(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch camper");
    }
  }
);

const initialState = {
  items: [],
  total: 0,
  page: 1,
  selectedCamper: null,
  loading: false,
  error: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    clearCampers(state) {
      state.items = [];
      state.total = 0;
      state.page = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;

        const payload = action.payload || {};
        const newItems = Array.isArray(payload.items) ? payload.items : [];

        // Sayfalama: eskilere ekle
        state.items = [...state.items, ...newItems];
        state.total =
          typeof payload.total === "number"
            ? payload.total
            : state.items.length;
        state.page = payload.page || 1;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch campers";
      })

      // DETAIL
      .addCase(fetchCamperById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedCamper = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCamper = action.payload || null;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch camper";
      });
  },
});

export const { clearCampers } = campersSlice.actions;
export default campersSlice.reducer;
