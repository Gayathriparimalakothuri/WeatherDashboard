import { createSlice } from "@reduxjs/toolkit";
import { fetchClimateData } from "../services/APIService";

// const weatherSlice = createSlice({
//     name: 'weather',
//     initialState: {
//         data:  null,
//         status: null,
//         error: null
//     },
//     reducers: {
//     clearWeather: (state) => {
//       state.data = null;
//       state.status = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchClimateData.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchClimateData.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = action.payload;
//       localStorage.setItem("climateData", JSON.stringify(action.payload));
//       })
//       .addCase(fetchClimateData.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to fetch weather data";
//       });
//   },
//    loadFromLocalStorage: (state, action) => {
//       const city = action.payload;
//       const storedData = localStorage.getItem("climateData");

//       if (storedData && storedData !== "undefined" && storedData !== "") {
//         try {
//           const parsed = JSON.parse(storedData);
//           if (parsed.city.toLowerCase() === city.toLowerCase()) {
//             state.data = parsed;
//             state.status = "succeeded";
//             state.error = null;
//           }
//         } catch {
//           state.data = null;
//         }
//       }
//     },
// })

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

const initialState = {
  data: getInitialWeatherData(),
  status: null,
  error: null
};

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