import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGeologicalData = async (params) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${params.city}&limit=1&appid=${params.apiKey}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchClimateData = createAsyncThunk(
    "weather/fetchWeather",
    async (params, { rejectWithValue }) => {
        try {
            const sanitizedCity = params.city.trim();
            if (sanitizedCity) {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${sanitizedCity}&appid=${params.apiKey}&units=${params.units}`
                );
                // const response = await axios.get(
                //   `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=${params.apiKey}&units=${params.units}`
                // );
                return response.data;
            } else {
                return rejectWithValue("City name is required.");
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Network Error");
        }
    }
);

export const fetchForeCastData = async (params,) => {
    try {
        const sanitizedCity = params.city.trim();
        if (sanitizedCity) {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=${params.apiKey}&units=${params.units}`
            );
            return response.data;
        } 
    } catch (error) {
        console.log("Error fetching climate data:", error);
    }
}