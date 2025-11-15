"use client";
import React, { useEffect, useState } from "react";
import Features from "@/components/features/features";
import Classes from "./CheckOutPage.module.css";
import CheckOut from "./checkout";
import axios from "axios";
import * as Urls from "@/utils/urls";
import { useCheckout } from "@/providers/checkout-provider";
import { useAddress } from "@/providers/address-provider";
import { useAuth } from "@/providers/auth-provider";
import { useCountry } from "@/providers/country-provider";
import { useRouter } from "next/navigation";

const CheckOutPage = () => {
  const router = useRouter();
  const { token } = useAuth();
  const { countryId } = useCountry();
  const [total, setTotal] = useState("");
  const [amountPay, setPayTotal] = useState("");
  const [addressId, setAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [changeId, setChangeId] = useState("");
  const [cartCount, setCartCount] = useState("");
  const { paymentData } = useAddress();
  const { checkoutData } = useCheckout();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your payment will be cancelled.';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!checkoutData) {
      if (token) {
        router.push("/shoping/cart");
      } else {
        router.push("/");
      }
    }
  }, [checkoutData]);

  useEffect(() => {
    setLoading(true);
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
    axios
      .get(`${Urls.cart}?country=${countryId}`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response1) => {
        if (response1.data.results.message === "cart is empty") {
          setCartCount("");
        } else {
          setCartCount(response1.data.results.count);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [changeId]);

  const adressChangeHanlder = (id) => {
    setChangeId(id);
  };

  const radioChangeHandler = (e) => {
    setAddressId(e.target.value);
  };

  return (
    <div>
      <div className={`pt-2 pb-4`}>
        <CheckOut
          total={paymentData}
          isLoad={loading}
          addressArray={address}
          address={addressId}
          radioChange={radioChangeHandler}
          adresChnge={adressChangeHanlder}
          proDet={checkoutData}
          countCartItems={cartCount}
        />
      </div>
      <Features />
    </div>
  );
};

export default CheckOutPage;
