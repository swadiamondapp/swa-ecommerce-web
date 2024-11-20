import React, { useState, useEffect } from "react";
import Classes from "./MainHead.module.css";
import Logo from "../../Assets/desklogo.svg";
import swaMob from "../../Assets/moblogo.png";
import { useHistory, useLocation } from "react-router-dom";
import MobileNavbar from "../Navbar/MobileNavbar";

const MainHead = (props) => {
  const history = useHistory();
  const location = useLocation();
  console.log("sssssssssss", props.activeCart);
  const landingPageHandler = () => {
    window.location.href = "/";
  };
  const isCartPage = location.pathname === "/cart";

  const toggleCart = (cartType) => {
    props.setActiveCart(cartType);
    console.log("cart,,,,.", props.setActiveCart(cartType));
  };

  return (
    <div>
      <MobileNavbar
        setIsHome={props.setIsHome}
        isHome={props.isHome}
        setSelectedCountry={props.setSelectedCountry}
        selectedCountry={props.selectedCountry}
        setShowSuccessModal={props.setShowSuccessModal}
        activeCart={props.activeCart}
        setActiveCart={props.setActiveCart}
        setText={props.setText}
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
            {isCartPage && (
              <div>
                <div className={Classes.Parentcartitems}>
                  <div
                    className={
                      props.activeCart === "shopping"
                        ? Classes.ActiveCarthead
                        : ""
                    }
                    onClick={() => toggleCart("shopping")}
                  >
                    Shopping Cart
                  </div>
                  <div
                    className={
                      props.activeCart === "trial" ? Classes.ActiveCarthead : ""
                    }
                    onClick={() => toggleCart("trial")}
                  >
                    Trial Cart
                  </div>
                </div>
                {/* <div className={Classes.CartContent}>
                  {activeCart === "shopping" ? (
                    <div>Shopping Cart Content</div>
                  ) : (
                    <div>Trial Cart Content</div>
                  )}
                </div> */}
              </div>
            )}
            {!isCartPage && props.children}
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHead;
