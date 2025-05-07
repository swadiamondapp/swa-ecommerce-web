"use client";

import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useCountries } from "@/hooks/useCountries";
import Cookies from "js-cookie";


export const CountryContext = createContext();

const CountryProvider = ({ children }) => {
  const [countryId, setCountryId] = useState(null);
  const [flag, setFlag] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const { countries } = useCountries();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (countryId) {
      Cookies.set("countryId", countryId, { path: "/", expires: 30 }); 
      return;
    }
    if (countries && countries.length > 0) {
      getLocation();
    }
  }, [countries, countryId]);

  useEffect(() => {
    setCountryId(localStorage.getItem("id"));
    setFlag(localStorage.getItem("flag_image"));
    setCountryName(localStorage.getItem("country_name"));
  }, []);

  const setSelectedCountry = (country) => {
    setCountryId(country.id);
    setFlag(country.flag_image);
    setCountryName(country.country_name);
    localStorage.setItem("id", country.id);
    localStorage.setItem("flag_image", country.flag_image);
    localStorage.setItem("country_name", country.country_name);

    Cookies.set("countryId", country.id, { path: "/", expires: 30 }); 
  };
 
  const getLocation = async () => {
    setIsLoading(true);
    try {
      const ipInfoResponse = await axios.get(
        "https://ipinfo.io/json?token=6485fceda43031"
      );
      // const userCountryName = ipInfoResponse.data.country; 
      const userCountryName = 'AE'
      let selectedCountryData;

      if (userCountryName === "AE") {
        // Force UAE flag for France users
        selectedCountryData = countries.find(
          (country) => country.country_name === "United Arab Emirates"
        );
      } else if (userCountryName === "IN") {
        selectedCountryData = countries.find(
          (country) => country.country_name === "India"
        );
      } else if (userCountryName === "IN" || userCountryName === "AE") {
        selectedCountryData = countries.find(
          (country) => country.country_code === userCountryName
        );
      } else {
        selectedCountryData = countries.find(
          (country) => country.country_code === "US"
        );
      }

      if (selectedCountryData) {
        setSelectedCountry(selectedCountryData);
      } else {
        const countryIndia = countries.find(
          (country) => country.country_name === "India"
        );
        if (countryIndia) {
          setCountryId(countryIndia.id);
          setFlag(countryIndia.flag_image);
          setCountryName(countryIndia.country_name);
          localStorage.setItem("id", countryIndia.id);
          localStorage.setItem("flag_image", countryIndia.flag_image);
          localStorage.setItem("country_name", countryIndia.country_name);
          Cookies.set("countryId", countryIndia.id, { path: "/", expires: 30 });
        }
      }
    } catch (error) {
      console.error("Error fetching country:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CountryContext.Provider value={{ countryId, flag, countryName, isLoading }}>
      {children}
    </CountryContext.Provider>
  );
};

export default CountryProvider;

export const useCountry = () => useContext(CountryContext);
