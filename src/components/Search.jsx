import React, { useCallback, useEffect, useState } from 'react';
import { fetchClimateData, fetchGeologicalData } from '../services/APIService';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import loadFromLocalStorage from '../store/slice';

const Search = ({ apikey, setUnits, setCity }) => {

    const [searchInput, setSearchInput] = useState("hyderabad");
    const [measurement, setMeasurement] = useState("metric")
    const dispatch = useDispatch();

    const debounce = (func, delay) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this,args)
            }, delay)
        }
    }
    const debouncedSetCity = useCallback(
        debounce((value) => {
            setCity(value)
        }, 500), []
    )
    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }
    const getData = async (e) => {
        e?.preventDefault();
        debouncedSetCity(searchInput);
        if (searchInput.trim() === "") {
            toast.warn("Please enter a city name.");
            // setSearchInput("hyderabad")
        }

        let params = {
            city: searchInput,
            apiKey: apikey,
            units: measurement
        }
        try {
            await dispatch(fetchClimateData(params)).unwrap();
        } catch (error) {
            console.error("Failed to fetch weather:", error);
            if (searchInput) {
                toast.error("City not found or API error.");
            }

        }
    }

    const handleChange = (e) => {
        setMeasurement(e.target.value)
    }
    // useEffect(() => {
    //     getData(); // initial fetch
    //     const interval = setInterval(getData, 30000); // poll every 30 sec
    //     return () => clearInterval(interval); // clean up when component unmounts
    // }, []);

    useEffect(() => {
        getData();
        setUnits(measurement);
    }, [measurement]);

    return (
        <div className='container mt-3'>
            <ToastContainer />
            <div className="d-flex justify-content-end">
                <div class="form-check">
                    <input type="radio" name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="metric"
                        checked={measurement === 'metric'}
                        onChange={handleChange} />
                    <label class=" text-primary" for="flexRadioDefault1" >
                        °C
                    </label>
                </div>
                <div class="form-check">
                    <input type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                        value="imperial"
                        checked={measurement === 'imperial'}
                        onChange={handleChange} />
                    <label class="text-primary" for="flexRadioDefault2">
                        °F
                    </label>
                </div>
            </div>

            <h1 className='title-header m-3'> <span style={{ fontSize: '34px' }}> ⛅</span> Weather Dashboard</h1>
            <form className='d-flex justify-content-center align-items-center m-3' >
                <input type="text" placeholder="Search for a city..." onChange={handleSearchInput} className='rounded bc-blue text-primary' />
                <button className='ms-3 rounded text-primary bc-blue' type="submit" onClick={getData} >Search</button>
            </form>

        </div>
    )
}

export default Search;