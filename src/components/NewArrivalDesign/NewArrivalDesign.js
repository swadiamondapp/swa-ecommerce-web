"use client";
import { useEffect, useState } from "react";

import Classes from "./NewArrivalDesign.module.css";
import Image from "next/image";
import Link from "next/link";

const NewArrivalPage = (props) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCategory = sessionStorage.getItem("categoryName");
      if (storedCategory) {
        setCategoryName(storedCategory);
        sessionStorage.removeItem("categoryName"); // optional: clear after using
      }
    }
  }, []);
  console.log("1113", props);
  console.log("11131", categoryName);
  return (
    <div>
      <div className={Classes.ParentMain}>
        <div className={Classes.child1Main}>
          <div className={Classes.Main}>
            <h1 className={Classes.Title}>
              {/* {props.categoryName?.toUpperCase() || "NEW ARRIVALS"} */}
              {categoryName
                ? categoryName.toUpperCase()
                : props.categoryName?.toUpperCase() || "NEW ARRIVALS"}
            </h1>
            <div className={Classes.Found}>
              {props.count}&nbsp;&nbsp;products found
            </div>
          </div>
          <div className={Classes.SubText}>
            <Link
              href="/"
              className={`${Classes.Home} ${Classes.HomeNew} text-decoration-none`}
            >
              HOME
            </Link>
            <p style={{ color: "#00464D", fontWeight: "900" }}>/</p>
            <p className={Classes.NewArrival}>
              {/* {props.categoryName || "NEW ARRIVALS"} */}
              {categoryName
                ? categoryName.toUpperCase()
                : props.categoryName?.toUpperCase() || "NEW ARRIVALS"}
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
                <Image
                  src={"/Assets/arrow.png"}
                  alt="Down Arrow"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="container newarrivalcardmob">
          <div className="row">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalPage;
