import React, { useState } from "react";
import Classes from "./Rating.module.css";
import New1 from "../../Assets/new1.png";
import { IoIosStar } from "react-icons/io";
import ReactStarRating from "react-star-ratings-component";
import { HiBadgeCheck } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import * as urls from "../../Urls";

function Rating(props) {
  const [show, setShow] = useState(false);
  const [rate, setRate] = useState(2);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("swaToken");
  const handleShow = () => {
    const body = {
      product_id: props.proid,
      rating: rate,
      review: review,
      review_title: "pwoli sadhanam",
    };
    if (review !== "") {
      setError("");
      axios
        .post(urls.review, body, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("This field is required");
    }
  };
  const rateChangeHandler = (value) => {
    setRate(value);
  };
  const reviewChangeHandler = (e) => {
    setReview(e.target.value);
  };
  return (
    <div className="container">
      <div className={Classes.Main}>
        <h1 className={Classes.Title}>Rate & review</h1>
      </div>
      <div className={Classes.SubText}>
        <p className={Classes.Home}>HOME /</p>
        <p className={Classes.Wishlist}>ORDER HISTORY / RATE & REVIEW</p>
      </div>

      <div className={Classes.ReviewProduct}>
        <img className={Classes.ProductImage} src={New1} alt="" />
        <p className={Classes.ProductName}>Diamond Ring</p>
      </div>
      <div className={Classes.ReviewPart}>
        <div className="d-flex">
          <p className={Classes.ReviewText} style={{ marginTop: "20px" }}>
            Rate this products
          </p>
          <div style={{ marginTop: "7px" }}>
            <ReactStarRating
              numberOfStar={5}
              numberOfSelectedStar={rate}
              colorFilledStar="#F6C514"
              colorEmptyStar="#D1D3D5"
              starSize="30px"
              spaceBetweenStar="10px"
              disableOnSelect={false}
              onSelectStar={rateChangeHandler}
            />
          </div>
        </div>

        <div className={Classes.Review}>
          <p className={Classes.ReviewText}>Review this products</p>

          <textarea
            className={Classes.Input}
            placeholder="Share your experience "
            onChange={reviewChangeHandler}
            value={review}
          />
          <div className="errrMsg">{error}</div>
          <div className={Classes.Submit}>
            <input
              onClick={handleShow}
              type="submit"
              className={Classes.Button}
            />
          </div>
        </div>
      </div>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>
            <HiBadgeCheck
              className={Classes.Check}
              size={200}
              color="#30933A"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={Classes.Thanks}>
          Thank you very much your review has been saved
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Rating;
