import React from "react";
import Classes from "../NewArrivalCard/NewArrivalCard.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgHeart } from "react-icons/cg";
import { useHistory, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import axios from "axios";
import * as Urls from "../../../Urls";
import { IoCartOutline } from "react-icons/io5";
import { useEffect } from "react";
import CheckDelivery from "../../CheckDelivery/CheckDelivery";
const NewArrivalCard = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [addToWishList, setAddToWishList] = useState(false);
  const [onadd, setOnAdd] = useState(true);
  const [wishId, setWishId] = useState([]);
  const likes = props.prodet.wishlist_id;
  console.log("likes", likes);

  const Contryname = localStorage.getItem("country_name");

  const countryId = localStorage.getItem("id");
  const flag = localStorage.getItem("flag_image");

  const token = localStorage.getItem("swaToken");
  useEffect(() => {
    if (props.wishAct !== null) {
      setWishId(props.wishAct);
      setAddToWishList(true);
    } else {
      setAddToWishList(false);
      setWishId(""); // Clear wishId if there's no wishlist activity
    }
  }, [props.wishAct]);

  const Added = () => {
    const token = localStorage.getItem("swaToken");
    if (token !== null) {
      const body = {
        product_id: props.prodet.product_id,
        colour_id: props.prodet.colour_id,
      };

      axios
        .post(`${Urls.wishlist}?country=${countryId}`, body, {
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
    if (token !== null && likes) {
      // Ensure wishId is not empty
      axios
        .delete(`${Urls.wishlist}${likes}?country=${countryId}`, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          setAddToWishList(false);
          setWishId(""); // Clear wishId on removal
          props.Suces();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (!likes) {
        console.log("No wishId to remove.");
      } else {
        toast("Please Login!");
      }
    }
  };
  console.log(wishId, "wishId");
  console.log(addToWishList, "addToWishList");
  // const Remove = () => {
  //   if (token !== null) {
  //     if (wishId !== "") {
  //       axios
  //         .delete(`${Urls.wishlist + wishId}?country=${countryId}`, {
  //           headers: {
  //             Authorization: "Token " + token,
  //           },
  //         })
  //         .then((response1) => {
  //           setAddToWishList(false);
  //           props.deltWishList();
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   } else {
  //     toast("Please Login!");
  //   }
  // };
  // const addToCart = () =>{
  //     history.push('/cart')
  // }
  // const ClickAddButton = () => {
  //     setOnAdd(false)
  //     props.cartSddHandler()
  // }
  let cost = props.PriceNew;
  let formattedCost = parseFloat(cost).toLocaleString();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const result = numberWithCommas(formattedCost);

  console.log("props.productId", props.ProductId);
  console.log("props.buttonText", props.buttonText);

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  return (
    <React.Fragment>
      <div
        className={` ${location.pathname === "/new_arrivel"
          ? "col-md-4 col-sm-6 col-lg-4 col-6"
          : "col-md-4 col-sm-6 col-lg-3 col-6"
          } ${Classes.NewArrivals}`}
      >
        <ToastContainer />
        <div className={Classes.NewArrivalCard}>
          <div className={Classes.NewArrivalCardSub}>
            {props.Discount && props.isDiscount ? (
              <div className={Classes.Discount}>
                <p className={Classes.Number}>{props.Discount}</p>
              </div>
            ) : null}
            <img
              onClick={props.clicked}
              src={props.ProductImage}
              className={Classes.ProductImage}
              alt="ProductImage"
            />
            
            {/* <p className={Classes.ProductName}>{props.ProductName}</p> */}
            {/* <p className={Classes.ProductId}>{props.ProductId}</p> */}
            <div className={Classes.HoverContainer}>
              <div className={Classes.HoverButton}>
                <div className={Classes.HButton}>
                  {/* <p className={Classes.CheckDelvyDate}>Check delivery date</p> */}
                  <div
                    className={Classes.ButtonContainer}
                    onClick={props.clicked}
                  >
                    {/* <button className={Classes.tryAtHome}>TRY AT HOME</button> */}
                    <button className={Classes.buyNow}>Buy Now</button>
                  </div>
                </div>
              </div>

              <div>
                <div className={Classes.ParentCardBoxes}>
                  <div className={Classes.Price}>
                    <p className={Classes.PriceNew}>
                      {Contryname === "India" && (
                        <BiRupee className={Classes.Rupee} />
                      )}
                      {Contryname === "United States" && (
                        <CgDollar className={Classes.Rupee} />
                      )}
                      {Contryname === "United Arab Emirates" && (
                        <span style={{ paddingRight: "5px" }}>AED</span>
                      )}
                      {result}
                      {/* {props.PriceNew} */}
                    </p>
                    <p className={Classes.PriceOld}>
                      {props.PriceOld !== null && Contryname === "India" && (
                        <BiRupee color="#B0B0B0" className={Classes.Rupee} />
                      )}
                      {props.PriceOld !== null &&
                        Contryname === "United States" && (
                          <CgDollar color="#B0B0B0" className={Classes.Rupee} />
                        )}
                      {props.PriceOld !== null &&
                        Contryname === "United Arab Emirates" && (
                          <span style={{ paddingRight: "5px" }}>AED</span>
                        )}
                      {props.PriceOld !== null &&
                        numberWithCommas(props.PriceOld)}
                    </p>
                  </div>
                  <div
                    className={Classes.Checkcards}
                    onClick={() => props.onClick(props.ProductId)}
                  >
                    <p className={Classes.CheckdeliveryNewtext}>
                      {props.buttonText}
                    </p>
                  </div>
                  <CheckDelivery
                    show={props.showModal}
                    handleClose={props.onclose}
                    handleShow={() => props.onClick(props.ProductId)}
                  />
                </div>
                <div className={Classes.cardTryatHomeBtn}>
                  <button>TRIAL AT HOME</button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className={onadd ? [Classes.Buttons] : [Classes.None]}>
            <button className={Classes.AddToCart} onClick={props.clicked}>
              try@home
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
          <p className={Classes.HeartSymbol}>
            {addToWishList ? (
              <FaHeart
                style={{ fontSize: "25px", color: "#F91919" }}
                // color="#F91919"
                className={Classes.Heart1}
                onClick={Remove}
              />
            ) : (
              <CgHeart
                style={{ fontSize: "25px", color: "#B1C2D3" }}
                className={Classes.Heart1}
                onClick={Added}
              />
            )}
          </p>
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
