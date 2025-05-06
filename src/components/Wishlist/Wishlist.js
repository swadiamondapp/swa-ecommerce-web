"use client";

import Classes from "./Wishlist.module.css";
import Link from "next/link";

const Wishlist = (props) => {

  return (
    <>
      <div className="container" style={{ paddingTop: "20px" }}>
        <div className={Classes.Main}>
          <h1 className={Classes.Title}>Wishlist</h1>
        </div>
        <div className={Classes.SubText}>
          <Link href="/" className={Classes.Home} >
            HOME /
          </Link>
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
