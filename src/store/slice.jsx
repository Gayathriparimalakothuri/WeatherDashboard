import { createSlice } from "@reduxjs/toolkit";
import { fetchClimateData } from "../services/APIService";

// Getting  data from local storage 
const getInitialWeatherData = () => {
  const storedData = localStorage.getItem("climateData");
  if (storedData && storedData !== "undefined" && storedData !== "") {
    try {
      return JSON.parse(storedData);
    } catch {
      return null;
    }
  }
  return null;
};

// initial state
const initialState = {
  data: getInitialWeatherData(),
  status: null,
  error: null
};

//Slice
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.status = null;
      state.error = null;
      localStorage.removeItem("climateData");
    }
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
        state.error = action.payload || action.error.message || "Failed to fetch weather data";
        state.data = null;  // clear the previous data
        localStorage.removeItem("climateData");
      });
  }
});


export const { setWeather, clearWeather, loadFromLocalStorage } = weatherSlice.actions;
export default weatherSlice.reducer;