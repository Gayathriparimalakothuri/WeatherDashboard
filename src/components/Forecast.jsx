import React, { useState } from 'react'

const Forecast = ({ groupedData,units }) => {
    console.log('groupeddata from tabs', groupedData)

    const dates = groupedData && Object.keys(groupedData);
    const [activeTab, setActiveTab] = useState(dates[0]);

    const formatDate = (dateStr) => {
        const options = { weekday: "short", month: "short", day: "numeric" };
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, options);
    }
    return (
        <div className='forecast' style={{minWidth:'800px'}}>
            {/* Tab Headers */}
            <div style={{ display: "flex",  gap: "8px", marginBottom: "16px" }}>
                {dates.map((date) => (
                    <button
                        key={date}
                        onClick={() => setActiveTab(date)}
                        style={{
                            padding: "8px 16px",
                            margin:"0px 20px",
                            cursor: "pointer",
                            color: activeTab === date ? " #1976d2" : "gray",
                            borderBottom: activeTab === date ? "3px solid #1976d2" : "3px solid transparent",
                            background: "none",
                            border: "none",
                            fontWeight: activeTab === date ? "bold" : "normal",
                        }}
                    >
                        {formatDate(date)}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className='my-5'>
                <div className="row">
                    <span className='col'> Time</span>
                    <span className='col'>
                        <p>🌡 Temp ({units === "metric" ? "°C" : "°F"})</p></span>
                    <span className='col'>
                        <p>🔥 Feels like ({units === "metric" ? "°C" : "°F"})</p></span>
                    <span className='col'>
                        <p> ⏲Pressure (hPa)</p></span>
                    <span className='col'>
                        <p>💧 Humdity (%)</p></span>
                    <span className='col'>
                        <p>👁 Visibility (m)</p></span>
                    <span className='col'>
                        <p>💨 Wind Speed {units === "metric" ? "m/s" : "miles/hr"}</p></span>
                    <span className='col'><p> 🎚 Sea Level (hPa)</p></span>
                </div>
                {groupedData[activeTab].map((forecast, i) => (
                    <>

                        <div className='row '
                            key={i}
                            style={{
                                padding: "12px",
                                borderBottom: "1px solid #c5bfbf",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span className='col'>
                                <div style={{ fontWeight: "bold" }}>{new Date(forecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                <div>{forecast.weather[0].description}</div>
                            </span>
                            <span className='col' >
                                <div>{forecast.main.temp}</div>
                            </span>
                            <span className='col'>
                                <div>{forecast.main.feels_like}</div>
                            </span>
                            <span className='col'>
                                <div>{forecast.main.pressure}</div>
                            </span>
                            <span className='col'>
                                <div>{forecast.main.humidity}</div>
                            </span>
                            <span className='col'>
                                <div>{forecast.visibility}</div>
                            </span>
                            <span className='col'>
                                <div>{forecast.wind.speed}</div>
                            </span>
                            <span className='col'>
                                <div>{forecast.main.sea_level}</div>
                            </span>

                        </div>
                    </>



                ))}
            </div>
        </div>
    );
}

export default Forecast;