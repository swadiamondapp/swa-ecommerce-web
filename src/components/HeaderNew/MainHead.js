import React, { useState, useEffect } from "react";
import Classes from "./MainHead.module.css";
import Logo from "../../Assets/desklogo.svg";
import swaMob from "../../Assets/moblogo.png";
import { useHistory, useLocation } from "react-router-dom";
import MobileNavbar from "../Navbar/MobileNavbar";

const MainHead = (props) => {
  const history = useHistory();
  const location = useLocation();

  const landingPageHandler = () => {
    window.location.href = "/";
  };
  const isCartPage = location.pathname === "/cart";

  return (
    <div>
      <MobileNavbar
        setIsHome={props.setIsHome}
        isHome={props.isHome}
        setSelectedCountry={props.setSelectedCountry}
        selectedCountry={props.selectedCountry}
        setShowSuccessModal={props.setShowSuccessModal}
      />
      <header className={Classes.headerNav}>
        <div className={`${"container"} ${Classes.ParentHeader}`}>
          <div
            className={`${Classes.SwaHead} ${
              isCartPage ? Classes.cartPage : ""
            }`}
          >
            <div
              id="brand"
              className={`${Classes.logo} ${Classes.headerElement}`}
              onClick={landingPageHandler}
            >
              <img src={Logo} alt="logo" />
            </div>
            <div
              id="brand"
              className={Classes.swaMob}
              onClick={landingPageHandler}
            >
              <img src={swaMob} alt="logo" />
            </div>
            {/* {isCartPage && (
              <div>
                <div style={{ color: "#fff" }}>Shoping cart</div>
                <div style={{ color: "#fff" }}>Trail Cart </div>
              </div>
            )} */}
            {!isCartPage && props.children}
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHead;
