import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function CountrySelector() {
    const [initiallist, setInitiallist] = useState([])
    const [country, setCountry] = useState('');
    const [states, setStates] = useState('');
    const [statelist, setStatelist] = useState([])
    const [city, setCity] = useState('');
    const [citylist, setCitylist] = useState([]);
    const [show, setShow] = useState(0)

    const handlecountry = (e) => {
        console.log(e.target.value)
        setCountry(e.target.value);
        fetchstates(e.target.value)
    }

    const handlestate = (e) => {
        setStates(e.target.value)
        fetchcities(country, e.target.value)
    }
    const handlecity = (e) => {
        setCity(e.target.value)
        setShow(1)
    }

    const fetchstates = async (country) => {
        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`);
            console.log(response, "States")
            setStatelist(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchcities = async (country, states) => {
        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${states}/cities`);
            console.log(response, "States")
            setCitylist(response.data);
        } catch (e) {
            console.error(e);
        }

    }

    useEffect(() => {
        const countries = async () => {
            try {
                const response = await axios.get('https://crio-location-selector.onrender.com/countries');
                console.log(country);
                setInitiallist(response.data);
                setCity([]);
                setStates([])
            } catch (e) {
                console.error(e);
            }
        };
        countries();
    }, []);





    return (
        <div>
            <h1>Select Location</h1>
            <div>
                <label htmlFor="country">Select Country: </label>
                <select id="country" value={country} onChange={handlecountry}>
                    <option value="" disabled>Select Country</option>
                    {initiallist.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="state">Select State: </label>
                <select id="state" value={states} onChange={handlestate}>
                    <option value="" disabled>Select State</option>
                    {statelist.map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="city">Select City: </label>
                <select id="city" value={city} onChange={handlecity}>
                    <option value="" disabled>Select City</option>
                    {citylist.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                {show ? <div>You Selected {city}, {states}, {country}</div> : <div></div>}
            </div>

        </div>
    )
}