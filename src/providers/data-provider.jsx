"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { home } from "@/utils/urls";
import { CountryContext } from "@/providers/country-provider";
import { useContext } from "react";
import { useAuth } from "./auth-provider";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchList, setSearchList] = useState(null);
  const [banner, setBanner] = useState(null);
  const [newArrivel, setNewArrivel] = useState(null);
  const [budjet, setBudjet] = useState([]);
  const [add, setAdd] = useState(null);
  const [counts, setCounts] = useState(null);
  const [topDemand, setTopDemand] = useState(null);
  const [categories, setCategories] = useState(null);
  const [tags, setTags] = useState(null);
  const [video, setVideo] = useState(null);
  const { token } = useAuth();
  const { countryId } = useContext(CountryContext);

  useEffect(() => {
    fetchHomedata();
  }, [countryId]);

  const fetchHomedata = () => {
    const headers = token ? { Authorization: `Token ${token}` } : {}; // Include token if available

    axios
      .get(`${home}?country=${countryId ?? ""}`, { headers }) // Pass headers here
      .then((response) => {
        setLoading(false);
        setSearchList(response.data.results.data.recent_search);
        let bannerArray = [];
        for (let i = 0; i < response.data.results.data.corosals.length; i++) {
          if (response.data.results.data.corosals[i].for_mobile === false) {
            bannerArray.push({
              corousal_image:
                response.data.results.data.corosals[i].corousal_image,
              corousal_name:
                response.data.results.data.corosals[i].corousal_name,
              type_id: response.data.results.data.corosals[i].type_id,
              is_category: response.data.results.data.corosals[i].is_category,
            });
          }
        }
        setCategories(response.data.results.data.categories);
        setTags(response.data.results.data.tags);
        setBanner(bannerArray);
        setNewArrivel(response.data.results.data.new_arrival.slice(0, 8));
        setBudjet(response.data.results.data.product_budget);
        setAdd(response.data.results.data.banners);
        setCounts(response.data.results.data);
        setTopDemand(response.data.results.data.top_demand.slice(0, 8));
        setVideo(
          response.data.results.data.Video
            ? response.data.results.data.Video + "?feature=oembed"
            : null
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        searchList,
        banner,
        newArrivel,
        budjet,
        add,
        counts,
        topDemand,
        categories,
        tags,
        video,
        fetchHomedata,
        token,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useData = () => {
  return useContext(DataContext);
};
