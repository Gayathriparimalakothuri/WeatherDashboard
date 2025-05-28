import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = ({units}) => {
    const { data, status, error } = useSelector((state) => state.weather);
    const weatherData =data;
    console.log('messgae from dash',units)
    return (
        <div className='container'>
            {status === 'loading' && <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>}
            {
               weatherData && (
                    <div className='d-flex justify-content-center'>
                        <div className="card  text-start p-4 m-3" style={{ width: '70%' }}>
                            <p className='text-center fw-bold fs-4'>{weatherData.name}</p>
                            <div className="row lh-lg">
                                <div className="col">
                                    🌤<strong className='mx-3'>Temperature: </strong>{weatherData.main.temp} {units === "metric" ? "°C" : "°F"}
                                </div>
                                <div className="col">
                                    💧 <strong className='mx-3'> Humidity: </strong>{weatherData.main.humidity} %
                                </div>
                            </div>
                            <div className="row lh-lg">
                                <div className="col">
                                    ⏲<strong className='mx-3'>Pressure: </strong>  {weatherData.main.pressure} hPa
                                </div>
                                <div className="col">
                                    🌡<strong className='mx-3'>Feels Like: </strong>  {weatherData.main.feels_like} {units === "metric" ? "°C" : "°F"}
                                </div>
                            </div>
                            <div className="row lh-lg">
                                <div className="col">
                                    👁<strong className='mx-3'>Visibility: </strong>  {weatherData.visibility} m
                                </div>
                                <div className="col">
                                    💨<strong className='mx-3'>Wind Speed: </strong>  {weatherData.wind.speed} {units === "metric" ? "m/s" : "miles/hr"}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Dashboard;