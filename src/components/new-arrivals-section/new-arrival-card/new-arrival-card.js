"use client";

import Classes from "./new-arrival-card.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgHeart } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { useContext, useState } from "react";
import axios from "axios";
import * as Urls from "@/utils/urls";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CheckDelivery from "@/components/check-delivery/check-delivery";
import { useAuth } from "@/providers/auth-provider";
import { useCountry } from "@/providers/country-provider";
import CurrencySymbol from "@/components/common/CurrencySymbol";
import { numberWithCommas } from "@/utils/utils";
import { DataContext } from "@/providers/data-provider";

const NewArrivalCard = (props) => {
  const [addToWishList, setAddToWishList] = useState(false);
  const [wishId, setWishId] = useState([]);
  const [wishlistIds, setWishlistIds] = useState();
  const { token } = useAuth();
  const { fetchHomedata } = useContext(DataContext);
  const { countryId, countryName } = useCountry();
  const [buttonText, setButtonText] = useState();
  const [pincode, setPincode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { pathname } = usePathname();
  const isDynamicRoute = /^\/[^/]+$/.test(pathname);
  const containerClass =
    location.pathname === "/" || location.pathname.startsWith("/wish-list")
      ? "col-md-4 col-sm-6 col-lg-3 col-6"
      : location.pathname.startsWith("/jewellery/budget") ||
        location.pathname.startsWith("/new-arrivals") ||
        isDynamicRoute
      ? "col-md-4 col-sm-6 col-lg-4 col-6"
      : "col-md-4 col-sm-6 col-lg-4 col-6";

  useEffect(() => {
    const pincode = localStorage.getItem("pincode");
    setPincode(pincode);
  }, []);

  console.log("countryNameanas", countryName);

  useEffect(() => {
    if (props.wishAct !== null) {
      setWishId(props.wishAct);
      setAddToWishList(true);
    } else {
      setAddToWishList(false);
      setWishId(""); // Clear wishId if there's no wishlist activity
    }
  }, [props.wishAct]);

  useEffect(() => {
    if (props.prodet.wishlist_id) {
      setWishId(props.prodet.wishlist_id);
      setAddToWishList(true);
    } else {
      setAddToWishList(false);
      setWishId(""); // Reset wishId
    }
  }, [props.prodet.wishlist_id]);

  const likes =
    (props.prodet.wishlist_id && props.prodet.wishlist_id) ||
    (props.wishId && props.wishId);

  const Added = () => {
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
          setWishlistIds(response1.data.results?.data?.id);
          fetchHomedata(); // Refresh the data
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to add to wishlist.");
        });
    } else {
      toast("Please Login!");
    }
  };

  const Remove = () => {
    if (token !== null) {
      const idToUse = likes || wishlistIds;
      if (idToUse) {
        axios
          .delete(`${Urls.wishlist + idToUse}/?country=${countryId}`, {
            headers: { Authorization: "Token " + token },
          })
          .then((response1) => {
            setAddToWishList(false);
            setWishId(""); // Clear wishId on removal
            fetchHomedata(); // Refresh the data
            // toast.success("Removed from wishlist!");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Failed to remove from wishlist.");
          });
      }
    } else {
      toast("Please Login!");
    }
  };

  let cost = props.PriceNew;
  let formattedCost = parseFloat(cost).toLocaleString();
  const result = numberWithCommas(formattedCost);

  const handleShowModal = (productId) => {
    if (pincode) {
      const body = {
        product_id: productId,
        color_id: "",
        size_id: "",
        pincode: pincode,
      };

      axios
        .post(Urls.checkdeliveryDate, body, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          setButtonText(response1.data.results.message);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={`${containerClass} ${Classes.NewArrivals}`}>
        <ToastContainer />
        <div className={Classes.NewArrivalCard} style={{ userSelect: "none" }}>
          <div className={Classes.NewArrivalCardSub}>
            {props.Discount && props.isDiscount ? (
              <div className={Classes.Discount}>
                <p className={Classes.Number}>{props.Discount}</p>
              </div>
            ) : null}
            <Image
              onClick={props.clicked}
              src={props.ProductImage}
              className={Classes.ProductImage}
              alt="ProductImage"
              width={200}
              height={200}
            />
            <div className={Classes.HoverContainer}>
              <div>
                <div className={Classes.ParentCardBoxes}>
                  {countryName !== "United Arab Emirates" && (
                    <div className={Classes.Price}>
                      <p className={Classes.PriceNew}>
                        <CurrencySymbol
                          country={countryName}
                          className={Classes.Rupee}
                        />
                        {result}
                      </p>
                      <p className={Classes.PriceOld}>
                        {props.PriceOld !== null && (
                          <CurrencySymbol
                            country={countryName}
                            className={Classes.Rupee}
                            color="#B0B0B0"
                          />
                        )}
                        {props.PriceOld !== null &&
                          numberWithCommas(props.PriceOld)}
                      </p>
                    </div>
                  )}
                  <div
                    className={Classes.Checkcards}
                    onClick={() => handleShowModal(props.prodet.product_id)}
                  >
                    <p className={Classes.CheckdeliveryNewtext}>
                      {buttonText || "Check delivery date"}
                    </p>
                  </div>
                  <CheckDelivery
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleShow={() => handleShowModal(props.prodet.product_id)}
                  />
                </div>
                <div className={Classes.cardTryatHomeBtn}>
                  <button onClick={props.clicked}>BUY NOW</button>
                </div>
              </div>

              <div className={Classes.HoverButton}>
                <div className={Classes.HButton}>
                  <div
                    className={Classes.ButtonContainer}
                    onClick={props.clicked}
                  >
                    <button className={Classes.buyNow}>Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className={Classes.HeartSymbol}>
            {(props.prodet.wishlist_id || addToWishList) && token ? (
              <FaHeart
                style={{ fontSize: "25px", color: "#F91919" }}
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
        </div>
      </div>
    </>
  );
};

export default NewArrivalCard;
