import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import axios from 'axios';
import styles from './homepage.css'

export default function Homepage() {
  const [initiallist, setInitiallist] = useState([])
  const [country, setCountry] = useState('');
  const [states, setStates] = useState('');
  const [statelist, setStatelist] = useState([])
  const [city, setCity] = useState('');
  const [citylist, setCitylist] = useState([])

  const handlecountry = (e) => {
    console.log(e.target.value)
    setCountry(e.target.value)
  }

  const handlestate = (e) => {
    setStates(e.target.value)
  }
  const handlecity = (e) => {
    setCity(e.target.value)
  }


  useEffect(() => {
    const countries = async () => {
      // console.log(API_URL, country);
      try {
        const response = await axios.get('https://crio-location-selector.onrender.com/countries');

        // console.log(country);
        setInitiallist(response.data);
        setCity([]);
        setStates([])
      } catch (e) {
        console.error(e);
      }
    };
    countries();
  }, []);

  useEffect(() => {
    const searchstates = async () => {
      // console.log(API_URL, country);
      try {
        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`);
        console.log(response, "States")
        setStatelist(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    searchstates();
  }, [country]);
  useEffect(() => {
    const searchcity = async () => {
      // console.log(API_URL, country);
      try {
        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${states}/cities`);
        console.log(response, "States")
        setCitylist(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    searchcity();
  }, [states]);



  return (
    <div>
      <h1>Select Location</h1>
      <form className={styles.formstyle}>
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          labelId="country-label"
          id="country-label"
          label="Country"
          onChange={handlecountry}
        >
          {
            initiallist.map((elem) => (
              <MenuItem value={elem} key={elem} >{elem}</MenuItem>
            ))
          }


        </Select>
        <InputLabel id="state-label">State</InputLabel>
        <Select
          labelId="state-label"
          id="state-label"

          label="State"
          onChange={handlestate}
        >

          {
            statelist.map((elem) => (
              <MenuItem value={elem} key={elem} >{elem}</MenuItem>
            ))
          }

        </Select>
        <InputLabel id="city-label">City</InputLabel>
        <Select
          labelId="city-label"
          id="city-label"

          label="City"
          onChange={handlecity}
        >

          {
            citylist.map((elem) => (
              <MenuItem value={elem} key={elem} >{elem}</MenuItem>
            ))
          }
        </Select>
      </form>
      {city ? <div>You Selected {city}, {states}, {country}</div> : <div></div>}
    </div>
  );
}
