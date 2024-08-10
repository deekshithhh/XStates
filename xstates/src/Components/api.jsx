import React, { useState, useEffect } from 'react';

export default function LocationSelector() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    // Fetch countries on component mount
    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        const response = await fetch('https://crio-location-selector.onrender.com/countries');
        const data = await response.json();
        setCountries(data);
    };

    const fetchStates = async (countryName) => {
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
        const data = await response.json();
        setStates(data);
    };

    const fetchCities = async (countryName, stateName) => {
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
        const data = await response.json();
        setCities(data);
    };

    const handleCountryChange = (e) => {
        const countryName = e.target.value;
        setSelectedCountry(countryName);
        setSelectedState('');
        setSelectedCity('');
        setStates([]);
        setCities([]);
        fetchStates(countryName);
    };

    const handleStateChange = (e) => {
        const stateName = e.target.value;
        setSelectedState(stateName);
        setSelectedCity('');
        setCities([]);
        fetchCities(selectedCountry, stateName);
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    return (
        <div>
            <div>
                <label htmlFor="country">Select Country: </label>
                <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="" disabled>Select Country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="state">Select State: </label>
                <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
                    <option value="" disabled>Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="city">Select City: </label>
                <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
                    <option value="" disabled>Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            {selectedCity ? <div>You Selected {selectedCity}, {selectedState}, {selectedCountry}</div> : <div></div>}
        </div>
    );
};


