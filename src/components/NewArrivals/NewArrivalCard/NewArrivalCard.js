import React from "react";
import Classes from "../NewArrivalCard/NewArrivalCard.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgHeart } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { BiRupee } from "react-icons/bi";
import axios from "axios";
import * as Urls from "../../../Urls";
import { useEffect } from "react";
const NewArrivalCard = (props) => {
  const history = useHistory();
  const [addToWishList, setAddToWishList] = useState(false);
  const [onadd, setOnAdd] = useState(true);
  const [wishId, setWishId] = useState("");
  const token = localStorage.getItem("swaToken");
  useEffect(() => {
    if (props.wishAct !== null) {
      setWishId(props.wishAct);
      setAddToWishList(true);
    }
  }, [props.wishAct]);
  const Added = () => {
    if (token !== null) {
      const body = {
        product_id: props.prodet.product_id,
        colour_id: props.prodet.colour_id,
      };

      axios
        .post(Urls.wishlist, body, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          setAddToWishList(true);

          props.Suces();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast("Please Login!");
    }
  };
  const Remove = () => {
    if (token !== null) {
      axios
        .delete(Urls.wishlist + wishId, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          setAddToWishList(false);
          props.Suces();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast("Please Login!");
    }
  };
  // const addToCart = () =>{
  //     history.push('/cart')
  // }
  // const ClickAddButton = () => {
  //     setOnAdd(false)
  //     props.cartSddHandler()
  // }

  return (
    <React.Fragment>
      <div
        className={`${"col-md-4"} ${"col-sm-6"} ${"col-lg-3"} ${"col-6"} ${
          Classes.NewArrivals
        }`}
      >
        <ToastContainer />
        <div className={Classes.NewArrivalCard}>
          <div onClick={props.clicked} className={Classes.NewArrivalPics}>
            {props.Discount !== null ? (
              <div className={Classes.Discount}>
                <p className={Classes.Number}>{props.Discount}</p>
              </div>
            ) : null}

            <img
              src={props.ProductImage}
              className={Classes.ProductImage}
              alt=""
            />

            {/* <p className={Classes.ProductName}>{props.ProductName}</p> */}
            {/* <p className={Classes.ProductId}>{props.ProductId}</p> */}
            <div className={Classes.Price}>
              <p className={Classes.PriceNew}>
                <BiRupee className={Classes.Rupee} />
                {props.PriceNew}
              </p>
              <p className={Classes.PriceOld}>
                {props.PriceOld !== null && (
                  <BiRupee color="#B0B0B0" className={Classes.Rupee} />
                )}
                {props.PriceOld !== null && props.PriceOld}
              </p>
            </div>
          </div>

          {/* heart */}
          <div className={Classes.parentHeart}>
            {addToWishList ? (
              <FaHeart className={Classes.Heart} onClick={Remove} />
            ) : (
              <CgHeart className={Classes.Heart} onClick={Added} />
            )}
          </div>
          {/* heart */}

          {/* discover and heart */}
          {/* <div className={onadd ? [Classes.Buttons] : [Classes.None]}>
            <button className={Classes.AddToCart} onClick={props.clicked}>
              Discover
            </button>
            {addToWishList ? (
              <FaHeart
                color="#ffffff"
                className={Classes.Heart}
                onClick={Remove}
              />
            ) : (
              <CgHeart
                color="#ffffff"
                className={Classes.Heart}
                onClick={Added}
              />
            )}
          </div> */}
          {/* discover and heart */}

          {/* <div className={onadd ?[Classes.None] :[Classes.Buttons]}>
                        <button className={Classes.AddToCart} onClick={addToCart}>GO TO CART</button>
                        {addToWishList ? <FaHeart color='#ffffff' className={Classes.Heart} onClick={Remove} /> : <CgHeart color='#ffffff' className={Classes.Heart} onClick={Added}/>}
                    </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewArrivalCard;
