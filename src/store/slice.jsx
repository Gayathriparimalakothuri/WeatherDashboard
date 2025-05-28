import { createSlice } from "@reduxjs/toolkit";
import {fetchClimateData} from "../services/APIService";

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: JSON.parse(localStorage.getItem("climateData")) || null,
        status: null,
        error: null
    },
    reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClimateData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchClimateData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        localStorage.setItem("climateData", JSON.stringify(action.payload));
      })
      .addCase(fetchClimateData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch weather data";
      });
  },
})

export const { setWeather, clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;