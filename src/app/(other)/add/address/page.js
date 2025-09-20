"use client";
import React, { useEffect, useState } from "react";
import Classes from "@/app/(other)/cart/checkout/CheckOutPage.module.css";
import axios from "axios";
import * as Urls from "@/utils/urls";
import AddAddress from "@/components/checkout/AddAddress";
import { useAuth } from "@/providers/auth-provider";
import Features from "@/components/features/features";
import SliderFeature from "@/components/product-details/SliderFeature";

const AddAddressPage = (props) => {
  const [address, setAddress] = useState([]);
  const [changeId, setChangeId] = useState("");
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [addressId, setAddressId] = useState(null);
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
  }, [changeId, token]);

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

  return (
    <>
      <div className={`${Classes.Background} py-8 bg-zinc-100`}>
        <AddAddress
          //   total={props.location.state.data.total}
          //   isLoad={loading}
          addressArray={address}
          fetchAddress={fetchAddress}
          address={addressId}
          // radioChange={radioChangeHandler}
          // adresChnge={adressChangeHanlder}
          // proDet={props.location.state}
        />
      </div>
      <Features />
      <SliderFeature />
    </>
  );
};

export default AddAddressPage;
