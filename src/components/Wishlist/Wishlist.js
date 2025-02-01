import React, { useState, useEffect } from "react";
import Classes from "./Wishlist.module.css";
import { useHistory } from "react-router-dom";
const Wishlist = (props) => {
  const history = useHistory();
  const homeHandler = () => {
    history.push("/");
  };
  return (
    <>
      <div className="container" style={{ paddingTop: "20px" }}>
        <div className={Classes.Main}>
          <h1 className={Classes.Title}>Wishlist</h1>
        </div>
        <div className={Classes.SubText}>
          <p className={Classes.Home} onClick={homeHandler}>
            HOME /
          </p>
          <p className={Classes.Wishlist}>WISHLIST</p>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="row mar-10">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
