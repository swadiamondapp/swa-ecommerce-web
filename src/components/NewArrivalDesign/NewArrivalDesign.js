import React, { useEffect } from "react";
import Classes from "./NewArrivalDesign.module.css";
import { IoIosClose } from "react-icons/io";
import { useHistory } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState } from "react";

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
      <div className={Classes.Main}>
        <h1 className={Classes.Title}>{props.head}</h1>
      </div>
      <div className={Classes.SubText}>
        <p
          className={`${Classes.Home} ${Classes.HomeNew}`}
          onClick={homePageHandler}
        >
          HOME /
        </p>
        <p className={Classes.NewArrival}>{props.categoryName || "Products"}</p>
      </div>
      <div className={Classes.Found}>
        {props.count}&nbsp;&nbsp;products found
      </div>

      <div className="row">
        <div className="col-md-9">
          {/* <div className={Classes.Filtered}>
                                <Stack direction="row" spacing={2}>
                                    {props.labArry.map((item,index)=>{
                                        return(
                                        <Chip
                                            key={index}
                                            label={item}
                                            onClick={handleClick}
                                            onDelete={()=>handleDelete(index)}
                                        
                                        />
                                    )
                                    })}
                                    
                                </Stack>
                        </div> */}
        </div>
        <div className="col-md-3">
          <div className={Classes.SortDrop}>
            <p className={Classes.Sort}>Sort by:</p>
            <select className={Classes.SortValue} onChange={props.sortHandler}>
              <option>Choose Price</option>
              <option value="LtoH">Low to high</option>
              <option value="HtoL">High to Low</option>
            </select>
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
