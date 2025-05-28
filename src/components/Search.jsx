import React, { useEffect, useState } from 'react';
import { fetchClimateData, fetchGeologicalData } from '../services/APIService';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const Search = ({ apikey }) => {

    const [searchInput, setSearchInput] = useState("hyderabad");
    const dispatch = useDispatch();

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    const getData = async (e) => {
        e?.preventDefault();
        if (searchInput.trim() === "") {
            toast.warn("Please enter a city name.");
            setSearchInput("hyderabad")
        }
        let params = {
            city: searchInput,
            apiKey: apikey
        }
        dispatch(fetchClimateData(params));
    }


    useEffect(() => {
        getData(); // initial fetch
        const interval = setInterval(getData, 30000); // poll every 30 sec

        return () => clearInterval(interval); // clean up when component unmounts
    }, []);
    return (
        <div className='container mt-3'>
             <ToastContainer />
            <h1 className='title-header m-3'> <span style={{ fontSize: '34px' }}> ⛅</span> Weather Dashboard</h1>
            <form className='d-flex justify-content-center align-items-center m-3' >
                <input type="text" placeholder="Search for a city..." onChange={handleSearchInput} className='rounded bc-blue text-primary' />
                <button className='ms-3 rounded text-primary bc-blue' type="submit" onClick={getData} >Search</button>
            </form>

        </div>
    )
}

export default Search;