import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchForeCastData, fetchGeologicalData } from '../services/APIService';
import Forecast from './Forecast';

const Dashboard = ({ units, apiKey, city }) => {
    const { data, status, error } = useSelector((state) => state.weather);
    const weatherData = data;
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [forecastGroupedData, setForecastGroupedData] = useState(null);

    const loadGeologicalData = async () => {
        let geoparams = {
            city: city,
            apiKey: apiKey
        }
        if (city) {
            const response = await fetchGeologicalData(geoparams);
            console.log('resp geo', response)
            setLatitude(response?.[0]?.lat);
            setLongitude(response?.[0]?.lon);
        }
    }

    const loadForeCastData = async () => {
        let foreCastParams = {
            city: city,
            apiKey: apiKey,
            lat: latitude,
            lon: longitude,
            units: units
        }
        if (city && latitude&& longitude) {
            const response = await fetchForeCastData(foreCastParams);
            console.log('forecast data', response);
            groupForeCastData(response?.list)
        }
    }

    const groupForeCastData = async(list) =>{
        return list.reduce((groups,item) =>{
            let date = item.dt_txt.split(' ')[0]
            if(!groups[date]){
                groups[date] = []
            };
            groups[date].push(item);
            console.log('groups',groups)
            setForecastGroupedData(groups)
            return groups;
        },{})
    };

    useEffect(() => {
        loadGeologicalData();
    }, [city]);

    useEffect(() => {
        loadForeCastData();
    }, [city, units])

    return (
        <div className='container'>
            {status === 'loading' && <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>}
            {
                weatherData && (
                    <div className='d-flex justify-content-center'>
                        <div className="card  text-start p-4 m-3" style={{ width: '70%' }}>
                            <p className='text-center fw-bold fs-4'>{weatherData?.name}</p>
                            <div className="row lh-lg">
                                <div className="col">
                                    🌤<strong className='mx-3'>Temperature: </strong>{weatherData?.main?.temp} {units === "metric" ? "°C" : "°F"}
                                </div>
                                <div className="col">
                                    💧 <strong className='mx-3'> Humidity: </strong>{weatherData?.main?.humidity} %
                                </div>
                            </div>
                            <div className="row lh-lg">
                                <div className="col">
                                    ⏲<strong className='mx-3'>Pressure: </strong>  {weatherData?.main?.pressure} hPa
                                </div>
                                <div className="col">
                                    🌡<strong className='mx-3'>Feels Like: </strong>  {weatherData?.main?.feels_like} {units === "metric" ? "°C" : "°F"}
                                </div>
                            </div>
                            <div className="row lh-lg">
                                <div className="col">
                                    👁<strong className='mx-3'>Visibility: </strong>  {weatherData?.visibility} m
                                </div>
                                <div className="col">
                                    💨<strong className='mx-3'>Wind Speed: </strong>  {weatherData?.wind?.speed} {units === "metric" ? "m/s" : "miles/hr"}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
              weatherData &&  forecastGroupedData && (
                    <div className='my-4'>
                        <Forecast  groupedData={forecastGroupedData} units={units}/>
                    </div>
                )
            }
        </div>
    )
}

export default Dashboard;