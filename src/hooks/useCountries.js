import { useState, useEffect } from 'react';
import { getCountryFlags } from '@/utils/urls';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(getCountryFlags);
      const data = await response.json();
      setCountries(data.results.data);
    };
    fetchCountries();
  }, []);

  return { countries };
};