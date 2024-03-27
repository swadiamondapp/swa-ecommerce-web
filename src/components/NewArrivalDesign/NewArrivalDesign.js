import React, { useEffect } from "react";
import Classes from "./NewArrivalDesign.module.css";
import { IoIosClose } from "react-icons/io";
import { useHistory } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import imgarrow from "../../Assets/arrow.png";

const NewArrivalPage = (props) => {
  const history = useHistory();
  const homePageHandler = () => {
    history.push("/");
  };
  const handleClick = () => {};

  const handleDelete = (index) => {
    props.deltLabel(index);
  };
  const lawtohigh = () => {};
  return (
    <div>
      <div className={Classes.ParentMain}>
        <div className={Classes.child1Main}>
          <div className={Classes.Main}>
            <h1 className={Classes.Title}>{props.head}</h1>
            <div className={Classes.Found}>
              {props.count}&nbsp;&nbsp;products found
            </div>
          </div>
          <div className={Classes.SubText}>
            <p
              className={`${Classes.Home} ${Classes.HomeNew}`}
              onClick={homePageHandler}
            >
              HOME /
            </p>
            <p className={Classes.NewArrival}>
              {props.categoryName || "NEW ARRAIVALS"}
            </p>
          </div>
        </div>

        <div className={Classes.child2Main}>
          <div className={Classes.SortDrop}>
            <p className={Classes.Sort}>Sort by :</p>
            <div className={Classes.CustomSelect}>
              <select
                className={Classes.SortValue}
                onChange={props.sortHandler}
                style={{ outline: "none" }}
              >
                <option>Choose Price</option>
                <option value="LtoH">Low to high</option>
                <option value="HtoL">High to Low</option>
                <option value="new">New arrivals</option>
                <option value="top">Most popular</option>
                <option value="discounted">Discounted</option>
              </select>
              <div className={Classes.CustomSelectArrow}>
                {/* Add your custom down arrow image here */}
                <img src={imgarrow} alt="Down Arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="container pad-10">
          <div className="row">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalPage;
