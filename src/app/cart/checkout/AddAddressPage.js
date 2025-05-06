"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header/header";
import Features from "@/components/Features/Features";
import Footer from "../../components/Footer/Footer";
import Classes from "./CheckOutPage.module.css";
import CheckOut from "../cart/[CheckOut]/page";
import axios from "axios";
import * as Urls from "@/utils/urls";
import AddAddress from "@/app/cart/checkout/AddAddress";
import useCanonicalTag from "@/useCanonicalTag";

const AddAddressPage = (props) => {
  const [total, setTotal] = useState("");
  const [amountPay, setPayTotal] = useState("");
  const [addressId, setAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [changeId, setChangeId] = useState("");
  const [cartCount, setCartCount] = useState("");
  // const token = localStorage.getItem("swaToken");
  useCanonicalTag();
  useEffect(() => {
    setLoading(true);
    fetchAddress();
    // setTotal(props.location.state.data.total);
    // axios
    //   .get(Urls.cart, { headers: { Authorization: "Token " + token } })
    //   .then((response1) => {
    //     if (response1.data.results.message === "cart is empty") {
    //       setCartCount("");
    //     } else {
    //       setCartCount(response1.data.results.count);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [changeId]);
  const adressChangeHanlder = (id) => {
    setChangeId(id);
  };
  const radioChangeHandler = (e) => {
    setAddressId(e.target.value);
  };

  const fetchAddress = () => {
    axios
      .get(Urls.address, { headers: { Authorization: "Token " + token } })
      .then((response1) => {
        setAddress(response1.data.results.data);
        if (response1.data.results.data.length !== 0) {
          setAddressId(
            response1.data.results.data[response1.data.results.data.length - 1]
              .id
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const countryId = localStorage.getItem("id");
  // const flag = localStorage.getItem("flag_image");
  // const Contryname = localStorage.getItem("country_name");
  const [token, setToken] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const [flag, setFlag] = useState(null);
  const [Contryname, setContryname] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("swaToken"));
    setCountryId(localStorage.getItem("id"));
    setFlag(localStorage.getItem("flag_image"));
    setContryname(localStorage.getItem("country_name"));
  }, []);
  const [selectedCountry, setSelectedCountry] = useState({
    id: countryId,
    flag_image: flag,
    country_name: Contryname,
  });

  return (
    <div>
      <div className={Classes.Background}>
        <Header
          countCartItems={cartCount}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <AddAddress
          //   total={props.location.state.data.total}
          //   isLoad={loading}
          addressArray={address}
          fetchAddress={fetchAddress}
          // address={addressId}
          // radioChange={radioChangeHandler}
          // adresChnge={adressChangeHanlder}
          // proDet={props.location.state}
        />

        <div className={Classes.Features}>
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddAddressPage;
