import React from "react";
import Classes from "./PaymentPage.module.css";
import Header from "../../components/HeaderNew/Header";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import Payment from "../../components/Payment/Payment";

const PaymentPage = (props) => {
  return (
    <div>
      <div className={Classes.Background}>
        <Header />
        <Payment />
        <div className={Classes.Features}>
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PaymentPage;
