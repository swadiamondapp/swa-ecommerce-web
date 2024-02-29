import React, { useState, useEffect } from "react";
import Classes from "./MainHead.module.css";
import Logo from "../../Assets/swaLogo.png";
import swaMob from "../../Assets/moblogo.png";
import { useHistory } from "react-router-dom";
import MobileNavbar from "../Navbar/MobileNavbar";

const MainHead = (props) => {
  const history = useHistory();

  const landingPageHandler = () => {
    history.push("/");
  };

  return (
    <div>
      <MobileNavbar />
      <header className={Classes.headerNav}>
        <div className={`${"container"} ${Classes.ParentHeader}`}>
          <div className={Classes.SwaHead}>
            <div
              id="brand"
              className={Classes.logo}
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
            {props.children}
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHead;
