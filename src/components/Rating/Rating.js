import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Classes from "./Rating.module.css";
import New1 from "../../Assets/new1.png";
import { IoIosStar } from "react-icons/io";
import ReactStarRating from "react-star-ratings-component";
import { HiBadgeCheck } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import * as urls from "../../Urls";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FaRegImage } from "react-icons/fa6";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Rating(props) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [starRate, setStarRate] = useState(0);
  const [review, setReview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const token = localStorage.getItem("swaToken");

  useEffect(() => {
    getSingleReview(props.productDetails.product_id);
  }, [props && props.productDetails && props.productDetails.product_id]);

  const getSingleReview = async (id) => {
    try {
      const response = await axios.get(urls.singleReview + id, {
        headers: { Authorization: "Token " + token },
      });
      if (response.data.results.status === 200) {
        setReview(response.data.results.data[0].review);
        setStarRate(response.data.results.data[0].rating);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = () => {
    const formData = new FormData();
    formData.append("product_id", props.productDetails.product_id);
    formData.append("rating", starRate);
    formData.append("review", review);
    formData.append("review_title", "Good");
    imageFile && formData.append("review_image", imageFile);
    if (review !== "") {
      setError("");
      axios
        .post(urls.review, formData, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          setShow(true);
          setTimeout(() => {
            setShow(false);
            history.push("/my_orders");
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
    setStarRate(value);
  };
  const reviewChangeHandler = (e) => {
    setReview(e.target.value);
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setFileUploaded(true);
    console.log(e.target.files[0]);
  };

  return (
    <div className={`container ${Classes.MobReview1}`}>
      <div className={Classes.HeadMainMob2}>
        <div className={Classes.Main}>
          <h1 className={Classes.Title}>Rate & review</h1>
        </div>
        <div className={Classes.SubText}>
          <p className={Classes.Home}> HOME / MY ORDER / </p>
          <p className={Classes.Wishlist}> RATE & REVIEW</p>
        </div>
      </div>

      <div className={Classes.ParentCardImageText}>
        <div className={Classes.ReviewProduct}>
          <img
            className={Classes.ProductImage}
            src={
              props &&
              props.productDetails &&
              props.productDetails.product_image
            }
            alt=""
          />
        </div>
        <div>
          <p className={Classes.ProductName}>
            {props && props.productDetails && props.productDetails.product_name}
          </p>
          <p style={{ color: "#757C81" }}>18 KT yellow gold 12.460 GM</p>
          <p style={{ color: "#757C81" }}>Diamond 0.680 Carat SIIJ</p>
          <p style={{ color: "#757C81" }}>SKU 1245</p>
        </div>
      </div>
      <div className={Classes.ReviewPart}>
        <div className={Classes.ReviewB1}>
          <p className={Classes.ReviewText}>Rate this products</p>
          <div>
            <ReactStarRating
              numberOfStar={5}
              numberOfSelectedStar={starRate}
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
          <p className={Classes.ReviewText1}>Review this products</p>

          <textarea
            className={Classes.Input}
            placeholder="Share your experience "
            onChange={reviewChangeHandler}
            value={review}
          />
          <div className="errrMsg">{error}</div>
          {/* file upload */}
          <div>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<FaRegImage />}
            >
              {fileUploaded ? "File Uploaded" : "Add Photo"}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </div>
          {/* file upload */}

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
