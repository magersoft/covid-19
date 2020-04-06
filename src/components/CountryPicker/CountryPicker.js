import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import style from './CountryPicker.module.scss';
import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };

    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <FormControl className={style.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="global">Global</option>
        { fetchedCountries.map((country, idx) => <option value={country} key={idx}>{ country }</option>) }
      </NativeSelect>
    </FormControl>
  )
};

export default CountryPicker;
