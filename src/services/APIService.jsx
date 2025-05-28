import axios from 'axios';
import {  createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGeologicalData = async(params) =>{
    try{
        const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${params.city}&limit=1&appid=${params.apiKey}`);
        return response.data
    }catch(error){
        console.log(error)
    }
}
export const fetchClimateData = createAsyncThunk('weather/fetchWeather', async(params) =>{
    try{    
        const sanitizedCity = params.city.trim();
        if(sanitizedCity){
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${params.apiKey}&units=${params.units}`);
            return response.data;
        }
       
    }catch(error){
        console.log("Error fetching climate data: ", error);
    }
})

