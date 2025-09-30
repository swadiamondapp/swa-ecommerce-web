"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import * as Urls from "@/utils/urls"; // Adjust the path based on where your Urls file is

const Newcollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [countryId, setCountryId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("swaToken");
    const storedCountryId = localStorage.getItem("id");
    setToken(storedToken);
    setCountryId(storedCountryId);
  }, []);

  useEffect(() => {
    if (countryId) {
      fetchNewArrivals();
    }
  }, [countryId, token]);

  const fetchNewArrivals = () => {
    setLoading(true);
    
    const config = token 
      ? { headers: { Authorization: "Token " + token } }
      : {};

    axios
      .get(
        `${Urls.home}?country=${countryId}`,
        config
      )
      .then((response) => {
        setLoading(false);
        if (response.data?.results?.data?.new_arrival) {
          setProducts(response.data.results.data.new_arrival.slice(0, 4));
        }
      })
      .catch((error) => {
        console.error('Error fetching new arrivals:', error);
        setLoading(false);
      });
  };

  const colors = [
    { id: "rose-gold", name: "Rose Gold", color: "#E8B4A0" },
    { id: "green", name: "Green", color: "#4A5D23" },
  ];

  return (
    <div className="w-full lg:h-[1080px] h-[640px] bg-white">
      <div className="max-w-container mx-auto h-full bg-white flex flex-row items-center relative">
        <Image
          src="/try/girlnewcollection.svg"
          className="hidden lg:block"
          width={512}
          height={790.28}
          alt="model"
        />

        <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start w-full h-full mt-0">
          <div className="h-fit mt-2 lg:mt-[12rem] lg:ml-9 ml-0 text-center lg:text-left">
            <p className="text-[#918676] text-[20px] font-[400] leading-[24px] tracking-[0.08em]">
              FIND YOUR NEW COLLECTION
            </p>
            <p className="md:text-[56px] text-[40px] font-[500] font-playfair">
              New Arrival
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64 w-full">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="max-sm:overflow-x-auto max-sm:overflow-y-visible lg:w-full flex max-sm:w-full max-sm:h-fit">
              <div className="lg:ml-9 lg:mr-3 h-fit w-full flex flex-row justify-between md:ml-0 md:mr-0 sm:ml-0 sm:mr-0 ml-2 mr-2 lg:mt-[4rem] mt-[2rem] lg:mb-0 mb-[2rem] z-20 max-md:justify-start max-md:gap-4 max-sm:w-fit sm:max-md:gap-2 gap-2">
                {products.length > 0 ? (
                  products.map((product) => (
                    <Link
                      key={product.product_id}
                      href={`/jewellery/${product.alias}`}
                      className="lg:mx-2 max-md:w-[188px] max-md:h-[340px] max-md:flex-shrink-0 max-sm:flex-shrink-0 max-sm:w-[180px] px-1 lg:flex-1 lg:min-w-0 sm:max-md:w-[140px] sm:max-md:px-0.5"
                    >
                      <div className="lg:w-full lg:aspect-[4/5] max-md:w-[180px] max-md:h-[220px] max-sm:w-[160px] max-sm:h-[200px] sm:max-md:w-[130px] sm:max-md:h-[160px] bg-[#FAF6F2] z-10 flex justify-center items-center relative">
                        <img
                          src={product.thumbnail_image || "/try/newArrivaltry.png"}
                          alt={product.product_name}
                          className="object-cover w-full h-full"
                        />
                        <button 
                          className="top-2 right-2 absolute sm:max-md:top-1 sm:max-md:right-1 sm:max-md:w-4 sm:max-md:h-4"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img src="/try/like.svg" alt="wishlist" />
                        </button>
                      </div>
                      <p className="font-inter font-semibold text-[16px] leading-[100%] tracking-[4%] align-middle uppercase pt-2 pb-1 sm:max-md:text-[12px] sm:max-md:pt-1 sm:max-md:pb-0.5">
                        {product.product_name}
                      </p>
                      <p className="font-inter text-[#918676] font-normal text-[14px] leading-[100%] tracking-[4%] align-middle uppercase pt-1 pb-1 sm:max-md:text-[10px] sm:max-md:pt-0.5 sm:max-md:pb-0.5">
                        SKU: {product.sku}
                      </p>
                      <div className="flex gap-2 mb-4 pt-2 pb-1 sm:max-md:gap-1 sm:max-md:mb-2 sm:max-md:pt-1 sm:max-md:pb-0.5">
                        {colors.map((color) => (
                          <div
                            key={color.id}
                            className="w-6 h-6 rounded-full border-2 border-gray-200 sm:max-md:w-4 sm:max-md:h-4 sm:max-md:border"
                            style={{ backgroundColor: color.color }}
                            title={color.name}
                          />
                        ))}
                      </div>
                      <p className="text-lg font-semibold text-gray-900 sm:max-md:text-sm">
                        ₹{" "}
                        {product.is_on_discount
                          ? product.country_discount_price
                          : product.country_total_price}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="w-full text-center py-8">
                    <p className="text-gray-500">No products available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="lg:ml-9 ml-0 mt-[4rem] flex justify-center lg:justify-start w-full lg:w-auto">
            <Link
              href="/new-arrivals"
              className="flex flex-row items-center gap-2 w-[168px] h-[30px] text-[#000000] text-[18px] leading-[24px] tracking-[0.06em] hover:text-[#2c2c2c] transition underline underline-offset-4"
            >
              VIEW MORE
              <Image
                src="/try/rightarrowblack.svg"
                width={24}
                height={24}
                alt="arrow"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newcollection;