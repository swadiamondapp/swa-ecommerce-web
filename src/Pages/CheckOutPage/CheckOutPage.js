import React, { useEffect, useState } from "react";
import Header from "../../components/HeaderNew/Header";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import Classes from "./CheckOutPage.module.css";
import CheckOut from "../../components/CheckOut/CheckOut";
import OtpModal from "../../components/Navbar/OtpModal";
import axios from "axios";
import * as Urls from "../../Urls";

const CheckOutPage = (props) => {
  const token = localStorage.getItem("swaToken");
  const [total, setTotal] = useState("");
  const [amountPay, setPayTotal] = useState("");
  const [addressId, setAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [changeId, setChangeId] = useState("");
  const [cartCount, setCartCount] = useState("");

  useEffect(() => {
    // console.log(props.location.state.data);
    setLoading(true);
    // setTotal(props.location.state.data.total);
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
      .get(Urls.cart, { headers: { Authorization: "Token " + token } })
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
      <div className={Classes.Background}>
        <Header countCartItems={cartCount} />
        <CheckOut
          // total={props.location.state.data.total}
          isLoad={loading}
          addressArray={address}
          address={addressId}
          radioChange={radioChangeHandler}
          adresChnge={adressChangeHanlder}
          proDet={props.location.state}
        />

        <div className={Classes.Features}>
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CheckOutPage;
