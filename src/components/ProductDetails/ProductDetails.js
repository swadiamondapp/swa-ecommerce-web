import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Ring from "../../Assets/new4.png";
import Videoimg from "../../Assets/vedioimg.png";
import RingFlip from "../../Assets/Ringflip.png";
import RingRotate from "../../Assets/RingRotate.png";
import { useHistory } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
import Classes from "./ProductDetails.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiRupee } from "react-icons/bi";
import { IoIosStar, IoLogoWhatsapp } from "react-icons/io";
import BIS from "../../Assets/BIS.png";
import IGI from "../../Assets/IGI.png";
import GIA from "../../Assets/GIA.png";
import PD1 from "../../Assets/PD1.png";
import PD2 from "../../Assets/PD2.png";
import PD3 from "../../Assets/PD3.png";
import PD4 from "../../Assets/PD4.svg";
import PH1 from "../../Assets/hearts.png";
import PS1 from "../../Assets/sharebtn.png";
import Call from "../../Assets/video.png";
import Stroke from "../../Assets/Stroke.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CgHeart } from "react-icons/cg";
import Carousel from "react-bootstrap/Carousel";
import abc from "../../Assets/shop2.png";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import * as Urls from "../../Urls";
import Profiles from "../../Assets/profileicon.png";
import ProductImages from "./ProductImages";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { RWebShare } from "react-web-share";
import { Modal } from "@mui/material";
import closeimg from "../../Assets/closeModal.png";
import time from "../../Assets/time.png";
import d1 from "../../Assets/d1.png";
import d2 from "../../Assets/d2.png";
import locationsimg from "../../Assets/locations.png";
// import { Carousel } from "primereact/carousel";
import Slider from "react-slick";
import { BsFillPlayFill } from "react-icons/bs";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const ProductDetails = (props) => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [addToWishList, setAddToWishList] = useState(false);
  const [wishId, setWishId] = useState("");
  const [pinCode, setPinCode] = useState(localStorage.getItem("pincode") || "");
  const [pinCodeError, setPinCodeError] = useState("");
  const [active, setActive] = useState(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("swaToken");
  const [reviewImages, setReviewImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const ratingRef = useRef(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [videoSection, setVideoSection] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [showRestrictionModal, setShowRestrictionModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const countryId = localStorage.getItem("id");
  // State to track the current slide index
  const [currentSlideIndex, setCurrentSlideIndex] = useState(6);

  const largeSliderRef = useRef(null);

  console.log("index2", currentSlideIndex);

  const handleImageClick = (index) => {
    largeSliderRef.current.slickGoTo(index);
  };
  const handleImageClicked = () => {
    if (ratingRef.current) {
      ratingRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  console.log("IsRestricted...?", props.IsRestricted);

  useEffect(() => {
    if (token !== null) {
      axios
        .get(`${Urls.productDet + props.id}?country=${countryId}`, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((response1) => {
          setProductDetails(response1.data.results.data);
          setWishId(response1.data.results.data.wishlist_id);
          if (response1.data.results.data.wishlist_id !== null) {
            setAddToWishList(true);
            setWishId(response1.data.results.data.wishlist_id);
          } else {
            setAddToWishList(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    customerPhotos();
  }, []);

  const customerPhotos = async () => {
    const response = await axios.get(
      "https://swaprdnecomnew.zinfog.in/ecom/products/" + props.id + "/reviews/"
    );
    if (response && response.data && response.data.results) {
      setReviews(response.data.results);
    }
    if (
      response &&
      response.data &&
      response.data.results &&
      response.data.results.status === 200
    ) {
      setReviewImages(response.data.results.data);
    }
  };

  // const addToCartHandler = () => {
  //   props.cartAdd();
  // };

  const homeHandler = () => {
    history.push("/");
  };
  const [purity, setPurity] = useState(false);
  const clickPurity = () => {
    setPurity(!purity);
  };
  const colorSelectHandler = (color) => {
    props.colorSelct(color);
    setSelectedColor(color);
    console.log("color--->", color);
  };

  const bagImgHandler = (imgUrl, item, index) => {
    item === "false" ? setVideoSection(false) : setVideoSection(true);
    props.bagImgSelect(imgUrl);
    setCurrentSlideIndex(index);
    console.log("index", index);
  };
  const pinCodeChangeHandler = (e) => {
    setPinCode(e.target.value);
  };
  const availbilityCheck = () => {
    if (pinCode !== "") {
      axios
        .get(Urls.pincodeCheck + pinCode)
        .then((response1) => {
          setActive(response1.data.IsSuccess);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setPinCodeError("Enter pin code");
    }
  };
  const seAllHandler = () => {
    setShow(!show);
  };
  const Added = () => {
    if (token !== null) {
      const body = {
        product_id: props.id,
      };
      axios
        .post(Urls.wishlist, body, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((response1) => {
          setAddToWishList(true);
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
      if (wishId !== "") {
        axios
          .delete(Urls.wishlist + wishId, {
            headers: {
              Authorization: "Token " + token,
            },
          })
          .then((response1) => {
            setAddToWishList(false);
            props.deltWishList();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      toast("Please Login!");
    }
  };
  // const sizeChangeHandler = (e) => {
  //   props.sizeChange(e.target.value);
  // };

  const [showAllReviews, setShowAllReviews] = useState(false);

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const renderedReviews = showAllReviews
    ? reviewImages
    : reviewImages.slice(0, 3);

  console.log("renderedReviews", renderedReviews);
  // const addToCartHandler = () => {
  //   console.log("....abc", selectedSize);
  //   // if (!props.Size) {
  //   if (props.sizeChart.length > 0) {
  //     if (!props.Size && !selectedSize) {
  //       setShowErrorModal(true);
  //       setTimeout(() => {
  //         setShowErrorModal(false);
  //       }, 78000);
  //     } else {
  //       props.cartAdd();
  //     }
  //     // Hide modal after 5 seconds
  //   } else {
  //     // Proceed with adding to cart logic
  //     props.cartAdd();
  //   }
  // };
  const addToCartHandler = () => {
    console.log("IsRestricted...?", props.IsRestricted);

    if (props.IsRestricted === true) {
      // Show restriction modal for 5 seconds
      // setShowRestrictionModal(true);
      // setTimeout(() => {
      //   setShowRestrictionModal(false);
      // }, 5000);
    } else {
      // Handle other conditions and proceed with adding to cart
      if (props.sizeChart.length > 0) {
        if (!props.Size && !selectedSize) {
          setShowErrorModal(true);
          setTimeout(() => {
            setShowErrorModal(false);
          }, 78000);
        } else {
          props.cartAdd();
        }
      } else {
        // Proceed with adding to cart logic
        props.cartAdd();
      }
    }
  };
  const sizeChangeHandler = (e) => {
    props.sizeChange(e.target.value);
    const selectedId = e.target.value;
    setSelectedSize(selectedId);
    console.log("selectedId0===>", selectedId);

    // Find the corresponding checkbox and check it
    const radioButton = document.querySelector(
      `input[type="radio"][value="${selectedId}"]`
    );
    if (radioButton) {
      radioButton.checked = true;
    }
  };
  console.log("selectedSize--->", selectedSize);
  const handleCheckboxChange = (event) => {
    console.log("event.target.value--->", event.target.value);
    const selectedId = event.target.value;
    props.selectedSize(selectedId);
    setSelectedSize(selectedId);
    console.log("selectedId", selectedId);

    // Find the corresponding option in the select box and select it
    const selectBox = document.querySelector("select");
    if (selectBox) {
      selectBox.value = selectedId;
    }
  };

  // const handleDoneClick = () => {
  //   const checkedCheckbox = document.querySelector(
  //     'input[type="checkbox"]:checked'
  //   );
  //   if (checkedCheckbox) {
  //     const selectedSizeId = checkedCheckbox.value;
  //     // setSelectedSize(selectedSizeId);
  //     props.selectedSize(selectedSizeId);
  //     setShowErrorModal(false); // Close the modal after selecting the size
  //   } else {
  //     // Handle case when no checkbox is checked
  //     console.log("Please select a size before clicking Done");
  //   }
  // };

  const handleDoneClick = () => {
    // Perform any action you want when the "Done" button is clicked
    setShowErrorModal(false);
  };
  // Handle image load event
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  console.log("props.thumbImg,", props.thumbImg);
  let cost = props.offerPrice;
  let formattedCost = parseFloat(cost).toLocaleString();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  console.log(cost, "clg===>");
  console.log(formattedCost, "frc====clg===>");
  const result = numberWithCommas(formattedCost);
  console.log(result, "res===>");

  const handleThumbnailClick = (index) => {
    setCurrentSlideIndex(index);
  };

  // List of image and video file extensions
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff"];
  const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".flv", ".wmv"];

  // Arrays to hold image and video URLs
  const imageUrls = [];
  const videoUrls = [];

  // Iterate over the array of URLs
  props.bagImg.forEach((url) => {
    // Get the file extension, accounting for possible query parameters
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    const extension = fileName
      .split(".")
      .pop()
      .toLowerCase(); // get file extension and convert to lowercase

    // Check if the extension is in the image or video list
    if (imageExtensions.includes(`.${extension}`)) {
      imageUrls.push(url);
    } else if (videoExtensions.includes(`.${extension}`)) {
      videoUrls.push(url);
    }
  });

  console.log("videoUrls", videoUrls);
  console.log("imageUrls", imageUrls);

  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,

    // dotsClass: "slick-dots slick-thumb",
    // appendDots: (dots) => (
    //   <div>
    //     <ul
    //       style={{
    //         margin: "0px",
    //         padding: "0px",
    //         width: "700px",
    //       }}
    //     >
    //       {" "}
    //       {dots}{" "}
    //     </ul>
    //   </div>
    // ),
    // customPaging: (i) => (
    //   <div className={Classes.SmallImages}>
    //     {console.log("imageUrls[i]", imageUrls[i])}
    //     {imageUrls[i] === undefined ? (
    //       <img
    //         style={{ width: "60px", height: "60px" }}
    //         src={Videoimg}
    //         alt=""
    //       />
    //     ) : (
    //       <img className={Classes.ImageSmall} src={imageUrls[i]} alt="" />
    //     )}

    //   </div>
    // ),
    autoplay: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  var settingsSlide = {
    dots: false,
    arrows: true,
    infinite: false,
    autoplaySpeed: 2500,
    slidesToShow: 5,
    slidesToScroll: 1,

    // autoplay: true,
    centerMode: false,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          centerMode: false,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode: false,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "20px",
        },
      },
    ],
  };

  console.log("imageUrls--->0", props.bagImg);
  console.log("imageUrls--->1", props.bagImg[1]);
  console.log("imageUrls--->2", props.bagImg[2]);
  console.log("imageUrls--->3", props.bagImg[3]);

  // slider
  // slider
  const getLocation = async () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      let _url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      try {
        const response = await axios.get(_url);
        setPinCode(response.data.address.postcode);
        localStorage.setItem("pincode", response.data.address.postcode);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "40px" }}>
        <ToastContainer />
        <div className="row">
          <div className="col-md-6">
            <div className={`${Classes.Display} ${Classes.StickyDisplay}`}>
              <div className="container">
                <div className="row">
                  <div className={`col-md-10 ${Classes.MobProductDetails2}`}>
                    {!videoSection && (
                      <>
                        <div className={Classes.ImageWishList}>
                          {/* Conditionally render loading skeleton */}
                          {imageLoading && !props.thumbImg && (
                            <div className="card">
                              <div className="card-image">
                                <div
                                  id="image"
                                  className="skeleton-loader"
                                ></div>
                              </div>
                            </div>
                          )}

                          {/* <img
                            className={Classes.LargeImage}
                            src={props.thumbImg}
                            alt=""
                          /> */}
                          <div className="ParentSlide">
                            <Slider {...settings} ref={largeSliderRef}>
                              {imageUrls.map((item, index) => {
                                return (
                                  <div>
                                    <img
                                      style={{
                                        maxWidth: "100%",
                                      }}
                                      src={item}
                                      alt={`Slide ${index}`}
                                    />
                                  </div>
                                );
                              })}
                              {videoUrls.map((item) => (
                                <div
                                  style={{
                                    width: "429px",
                                    position: "relative",
                                    overflow: "hidden",
                                    height: "389px",
                                  }}
                                >
                                  <video
                                    // className="Vediosec"
                                    style={{
                                      maxWidth: "100%",
                                      // position: "absolute",
                                      // top: "0%",
                                      // width: "429px",
                                    }}
                                    src={item}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                  />
                                </div>
                              ))}
                            </Slider>
                          </div>

                          <div
                            style={{
                              cursor: "pointer",
                            }}
                            className={Classes.rateStar8}
                            onClick={handleImageClicked}
                          >
                            {/* {props.avgR} */}
                            {parseFloat(props.avgR).toFixed(0)}
                            <MdOutlineStarPurple500
                              className={Classes.starrate8}
                            />{" "}
                            {props.count}
                          </div>
                        </div>
                      </>
                    )}

                    {/* video play */}
                    {videoSection && (
                      <div className={Classes.ImageWishList1}>
                        <video
                          className="Vediosec"
                          src={props.thumbImg}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      </div>
                    )}
                    {/* new inner slider */}
                    {/* inner slide */}
                    <div className="Innerslide">
                      <Slider {...settingsSlide}>
                        {/* {props.bagImg.map((item, index) => {
                          return (
                            <div onClick={() => handleImageClick(index)}>
                              <img
                                style={{
                                  maxWidth: "100%",
                                }}
                                src={item}
                                alt={`Slide ${index}`}
                              />
                            </div>
                          );
                        })} */}
                        {/* <video
                          onClick={() => handleImageClick(imageUrls.length)}
                          src={props.bagImg[2]}
                        ></video> */}
                        {props.bagImg.map((url, index) => {
                          if (
                            url.endsWith(".jpg") ||
                            url.endsWith(".jpeg") ||
                            url.endsWith(".png")
                          ) {
                            return (
                              <img
                                onClick={() => handleImageClick(index)}
                                style={{ width: "69px", height: "69px" }}
                                key={index}
                                src={url}
                                alt={`Media ${index}`}
                              />
                            );
                          } else if (url.endsWith(".mp4")) {
                            return (
                              <>
                                <div style={{ position: "relative" }}>
                                  <video
                                    className={Classes.smallVideos}
                                    key={index}
                                    playsInline
                                    muted
                                    onClick={() =>
                                      handleImageClick(imageUrls.length)
                                    }
                                    // controls
                                    // className="media-item"
                                  >
                                    <source src={url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>

                                  <BsFillPlayFill className={Classes.playbtn} />
                                </div>
                              </>
                            );
                          } else {
                            return <p key={index}>Unknown media type</p>;
                          }
                        })}
                        {/* {videoUrls.length > 0 && (
                          <div
                            key="video-placeholder"
                            onClick={() => handleImageClick(imageUrls.length)}
                          >
                            {console.log("vediosanas", videoUrls)}{" "}
                            <img
                              style={{ width: "69px", height: "69px" }}
                              src={Videoimg}
                              alt="Video Placeholder"
                            />
                          </div>
                        )} */}
                      </Slider>
                    </div>
                    {/* inner slide */}

                    {/* new inner slider */}
                  </div>
                </div>
              </div>

              {/* inner images */}
              {/* <div className="container">
                <div>
                  <div className={Classes.MobProductDetails}>
                    {props.bagImg.map((item, index) => {
                      return (
                        <div className={Classes.SmallImages} key={index}>
                          <img
                            className={Classes.ImageSmall}
                            src={item}
                            alt=""
                            onClick={() => {
                              bagImgHandler(item, "false", index);
                              handleThumbnailClick(index);
                            }}
                          />
                        </div>
                      );
                    })}
                    {props.Video.map((item, index) => {
                      return (
                        <div
                          onClick={() => bagImgHandler(item, "true")}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <img
                            style={{
                              border: "0.5px solid #80808026",
                              borderRadius: "4px",
                              maxWidth: "78px",
                              maxHeight: "79px",
                            }}
                            className={Classes.ImageSmall}
                            src={Videoimg}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div> */}

              {/* inner images */}
            </div>
            <div className={Classes.Slider}>
              <Carousel>
                {props.bagImg.map((item, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img
                        className={Classes.SlideImage}
                        src={item}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div className="col-md-6" style={{ padding: "0px" }}>
            <div className="container">
              <div className={Classes.ParentHeadingD1}>
                <p className={Classes.NewArrivals}>{props.name}</p>
                <p
                  className={Classes.SubText}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  {/* <img
                    onClick={Added}
                    src={PH1}
                    className={Classes.ImgHeartShare}
                  /> */}
                  <p>
                    {addToWishList ? (
                      <FaHeart
                        style={{
                          fontSize: "25px",
                          color: "#F91919",
                          cursor: "pointer",
                        }}
                        // color="#F91919"
                        className={Classes.Heart1}
                        onClick={Remove}
                      />
                    ) : (
                      <CgHeart
                        style={{
                          fontSize: "25px",
                          color: "#B1C2D3",
                          cursor: "pointer",
                        }}
                        className={Classes.Heart1}
                        onClick={Added}
                      />
                    )}
                  </p>
                  <RWebShare
                    data={{
                      text: "Swa Diamonds",
                      // url: "https://swaecomnew.zinfog.in" + location.pathname,
                      url: "http://localhost:3000/" + location.pathname,
                      title: "Swa Diamonds",
                    }}
                    onClick={() => console.log("shared successfully!")}
                  >
                    <img src={PS1} className={Classes.ImgHeartShare} />
                  </RWebShare>
                </p>
              </div>
              <p className={Classes.SubText}>
                {props.name} In Gold ({props.gw} gram)
                {props.diamondWeight > 0
                  ? ` with Diamonds ( ${props.diamondWeight} Carat)`
                  : null}
                {/* {props.diamondWeight}gram) */}
              </p>
              <p className={Classes.Code}>{props.sku}</p>
              <div className={`${Classes.Flex} ${Classes.MobDownAR}`}>
                {/* <BiRupee size={25} /> */}

                <p className={Classes.NewPrice}>
                  {/* &#x20B9; {parseFloat(formattedCost).toFixed(0)} */}
                  &#x20B9; {result && result}
                </p>
                {props.actualPrice !== null ? (
                  <BiRupee size={25} color="#B0B0B0" />
                ) : null}
                <p className={Classes.OldPrice}>{props.actualPrice}</p>
              </div>
              {props.discount ? (
                <p className={Classes.HurrayText}>
                  Hurray! You have saved <BiRupee size={15} />
                  {props.discountVal.toFixed(2)}
                </p>
              ) : null}
              <p className={Classes.AvailableColours}>Customize this product</p>
              <div className={Classes.Flex}>
                {props.colors.map((item, index) => {
                  let clrClas;
                  if (item.colour_name === "rose") {
                    clrClas = Classes.C1;
                  } else if (item.colour_name === "white") {
                    clrClas = Classes.C4;
                  } else if (item.colour_name === "yellow") {
                    clrClas = Classes.C2;
                  } else if (item.colour_name === "pt") {
                    clrClas = Classes.C3;
                  }
                  const isSelected = !selectedColor.id
                    ? index === 0
                    : item.id === selectedColor.id;
                  return (
                    <div
                      className={`${Classes.Options}  ${
                        isSelected ? Classes.selectedOptionColor : ""
                      }`}
                      key={index}
                      onClick={() => colorSelectHandler(item)}
                    >
                      <div className={clrClas}></div>
                      <p>{item.colour_name}</p>
                    </div>
                  );
                })}
              </div>
              {/* ADD TO CART */}

              {/* <input
              type="submit"
              className={Classes.AddtoCart}
              value="Add to Cart"
              onClick={addToCartHandler}
            /> */}
              {/* ADD TO CART */}
              {/* <input
              type="submit"
              className={Classes.BuyNow}
              value="Buy Now"
              onClick={props.clickedBuy}
            /> */}
              <div className={Classes.MobileFixedBtn}>
                <div className={Classes.MobBtnView}>
                  <button
                    className={Classes.BuyNow}
                    // onClick={props.clickedBuy}
                    onClick={addToCartHandler}
                    type="submit"
                  >
                    Buy Now
                  </button>
                  {/* <button type="submit" onClick={addToCartHandler}>
                    add to cart
                  </button> */}
                </div>
                {/* {showErrorModal && (
                  <div className={Classes.ErrorModal}>
                    <p>Select size is required</p>
                  </div>
                )} */}

                <div className={Classes.FindStoreParent}>
                  <button className={Classes.TryHome}>Find at store</button>
                  <button className={Classes.VideoCall}>
                    <img
                      src={Call}
                      style={{
                        maxWidth: "44px",
                      }}
                    />
                  </button>
                  <button className={Classes.FindStores}>Try at Home</button>
                </div>
              </div>
              <Modal
                open={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <div className={Classes.Modalsection}>
                  <div className={Classes.ModalHeading}>
                    <h2
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      Please select your size
                    </h2>
                    <img
                      style={{
                        cursor: "pointer",
                      }}
                      src={closeimg}
                      onClick={() => setShowErrorModal(false)} // Close modal when close button is clicked
                      alt="Close"
                    />
                  </div>
                  <div className={Classes.SizeListParent}>
                    {props.sizeChart.map((item, index) => {
                      return (
                        <div className={Classes.SizeRangesList} key={index}>
                          <input
                            type="radio"
                            name="sizeRadioGroup"
                            value={item.id}
                            onChange={() => {
                              setSelectedSize(item.id);
                              props.selectedSize(item.id);
                            }}
                            checked={selectedSize === item.id}
                          />
                          <p> {item.size_name}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className={Classes.DoneSizeList}>
                    <button onClick={handleDoneClick}>Done</button>{" "}
                  </div>
                </div>
              </Modal>
              {/* Modal for restricted product */}
              <Modal
                open={showRestrictionModal}
                onClose={() => setShowRestrictionModal(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <div className={Classes.Modalsection}>
                  <div className={Classes.ModalHeading}>
                    <h2
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      You cannot buy this Product
                    </h2>
                    <img
                      style={{
                        cursor: "pointer",
                      }}
                      src={closeimg}
                      onClick={() => setShowRestrictionModal(false)}
                      alt="Close"
                    />
                  </div>
                </div>
              </Modal>
              {props.sizeChart.length > 0 && (
                <div className={Classes.BorderBottom}>
                  <p className={Classes.AvailableColours}>Select Size</p>
                  <select
                    className={Classes.SizeSelect}
                    onChange={sizeChangeHandler}
                    value={selectedSize}
                  >
                    <option value="">{}Select Size</option>
                    {props.sizeChart.map((item, index) => {
                      return (
                        <option value={item.id} key={index}>
                          {item.size_name}
                        </option>
                      );
                    })}
                  </select>
                  <div
                    style={{
                      paddingTop: "0px",
                    }}
                    className="errrMsg"
                  >
                    {props.error}
                  </div>
                </div>
              )}
            </div>
            <div className={Classes.BackgroundBgs}></div>
            {/* <div className={Classes.BorderBottom}>
              <p className={Classes.AvailableColours}>Choose gold purity</p>
              <div className={Classes.Flex}>
                <div className={Classes.MarginLeft} onClick={clickPurity}>
                  <p className={purity ? [Classes.Purity1] : [Classes.Purity2]}>
                    18KT
                  </p>
                  <p className={Classes.Grams}>2.480GM</p>
                </div>
                <div onClick={clickPurity}>
                  <p className={purity ? [Classes.Purity2] : [Classes.Purity1]}>
                    24KT
                  </p>
                  <p className={Classes.Grams}>3.280GM</p>
                </div>
              </div>
            </div> */}
            <div className={Classes.BorderBottom}>
              <div className="container">
                <div className={Classes.detaillocator}>
                  <p className={Classes.AvailableColours}>
                    Delivery availability
                  </p>
                  {isLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress
                        size={20}
                        sx={{ color: "#000", ml: 1 }}
                      />
                    </Box>
                  ) : (
                    <p className={Classes.locatortexts} onClick={getLocation}>
                      {" "}
                      <img src={locationsimg} /> Locate me
                    </p>
                  )}
                </div>
                <div className={Classes.DeliveryFields}>
                  <input
                    className={Classes.PinCode}
                    type="number"
                    value={pinCode}
                    onChange={pinCodeChangeHandler}
                  />
                  <button
                    className={Classes.CheckButton}
                    onClick={availbilityCheck}
                  >
                    CHECK
                  </button>
                  {/* <input
                  className={Classes.CheckButton}
                  type="submit"
                  onClick={availbilityCheck}
                /> */}
                </div>
                <div>
                  {pinCode && (
                    <p
                      style={{
                        paddingTop: "12px",
                        color: "#006e7f",
                        fontWeight: "600",
                      }}
                    >
                      Delivery by 12th March
                    </p>
                  )}{" "}
                </div>

                <div className="errrMsg">{pinCodeError}</div>
                {/* <div className={Classes.Flex}>
                <img className={Classes.Stroke} src={Stroke} alt="" />
                <p className={Classes.StrokeText}>Standard delivery between </p>
                <p className={Classes.DeliveryDate}>24 Oct & 28 oct 2022</p>
              </div> */}

                {active === true ? (
                  <>
                    <div className={Classes.DeliveryBtns}>
                      <button>
                        <img src={time} />
                        24hr Delivery
                      </button>
                    </div>
                    {/* <div
                      className={Classes.Flex}
                      style={{
                        marginLeft: "0px",
                      }}
                    >
                      <img className={Classes.Stroke} src={Stroke} alt="" />
                      <p className={Classes.StrokeText}>
                        Standard delivery available
                      </p>
                    </div> */}
                    <div className={Classes.ParentDeliverySec}>
                      <div className={Classes.DeliveryMessages}>
                        <div>
                          <img src={d1} />
                        </div>
                        <div>
                          <p className={Classes.DHeadText}>
                            Free Delivery by 12th March
                          </p>
                          <p className={Classes.Dheadtext1}>
                            Order in next 4 HRS 23 mins
                          </p>
                        </div>
                      </div>
                      <div className={Classes.DeliveryMessages}>
                        <div>
                          <img src={d1} />
                        </div>
                        <div>
                          <p className={Classes.DHeadText}>
                            available at hilite mall (1km)
                          </p>
                          <p className={Classes.Dheadtext1}>
                            Also 3 other store Show more
                          </p>
                        </div>
                      </div>
                      <div className={Classes.DeliveryMessages}>
                        <div>
                          <img src={d2} />
                        </div>
                        <div>
                          <p className={Classes.DHeadText}>
                            Free try at home not available
                          </p>
                          <p className={Classes.Dheadtext1}>
                            Try swa video call option
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {active === false ? (
                  <p
                    style={{
                      paddingTop: "0px",
                    }}
                    className="errrMsg"
                  >
                    Standard delivery not available
                  </p>
                ) : null}
              </div>
            </div>
            <div className={Classes.BackgroundBgs}></div>
            {/* product details mobile view only */}
            <div className={Classes.ParentMobileProductDetails}>
              <div className={Classes.ProductMobileHead}>
                <p className={Classes.PheadB1}>Product details</p>
                <div className={Classes.ProductCodeMob}>
                  <p
                    style={{
                      color: "#7A8288",
                      fontFamily: "Lato",
                    }}
                  >
                    Product code :
                  </p>
                  <p>{props.sku}</p>
                </div>
              </div>
              <div className={Classes.ProductDetailsMobCard}>
                <div className={Classes.LeftMobCard1}>
                  <img src={PD1} />
                  <p className={Classes.PdH1}>18kt Rose gold</p>
                  <p
                    style={{
                      color: "#7A8288",
                    }}
                  >
                    Net weight
                  </p>
                  <p
                    style={{
                      color: "#00464d",
                    }}
                  >
                    1.300 GM
                  </p>
                </div>
                <div className={Classes.ArrowlineMob}></div>
                <div className={Classes.RightMobCard1}>
                  <img src={PD2} />
                  <p className={Classes.PdH1}>15 SIJJ Diamond</p>
                  <p
                    style={{
                      color: "#7A8288",
                    }}
                  >
                    Diamond weight
                  </p>
                  <p
                    style={{
                      color: "#00464d",
                    }}
                  >
                    0.456 ct
                  </p>
                </div>
              </div>
              <div className={Classes.ProductDetailsMobCard2}>
                <div className={Classes.MobCard2Head}>
                  <img src={PD3} />
                  <p className={Classes.PdM2}>Product details</p>
                </div>
                <div className={Classes.ProductMob3Rows}>
                  <div className={Classes.MobFirstCard}>
                    <p
                      style={{
                        color: "#7A8288",
                        fontSize: "15px",
                      }}
                    >
                      Product height
                    </p>
                    <p>{productDetails.height} mm</p>
                  </div>
                  <div className={Classes.DummyLineArrow}></div>
                  <div className={Classes.MobFirstCard}>
                    <p
                      style={{
                        color: "#7A8288",
                        fontSize: "15px",
                      }}
                    >
                      Product length
                    </p>
                    <p>{productDetails.length} mm</p>
                  </div>
                  <div className={Classes.DummyLineArrow}></div>
                  <div className={Classes.MobFirstCard}>
                    <p
                      style={{
                        color: "#7A8288",
                        fontSize: "15px",
                      }}
                    >
                      Product width
                    </p>
                    <p>{productDetails.width} mm</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={Classes.ParentOtherStoneMob}>
              <div className={Classes.OtherstoneHeadMob}>
                <img src={PD4} />
                <p className={Classes.PdM2}>Other stone details</p>
              </div>
              <div className={Classes.Otherstone3Cards}>
                <div className={Classes.FirststoneMob}>
                  <p
                    style={{
                      color: "#7A8288",
                      fontSize: "15px",
                      lineHeight: "20px",
                    }}
                  >
                    Other stone name
                  </p>
                  <p
                    style={{
                      color: "#00464D",
                    }}
                  >
                    Ruby
                  </p>
                </div>
                <div className={Classes.DummyLineArrow2}></div>
                <div className={Classes.FirststoneMob}>
                  <p
                    style={{
                      color: "#7A8288",
                      fontSize: "15px",
                      lineHeight: "20px",
                    }}
                  >
                    Other Stone Weight
                  </p>
                  <p
                    style={{
                      color: "#00464D",
                    }}
                  >
                    0
                  </p>
                </div>
                <div className={Classes.DummyLineArrow2}></div>
                <div className={Classes.FirststoneMob}>
                  <p
                    style={{
                      color: "#7A8288",
                      fontSize: "15px",
                      lineHeight: "20px",
                    }}
                  >
                    Other Stone count
                  </p>
                  <p
                    style={{
                      color: "#00464D",
                    }}
                  >
                    0
                  </p>
                </div>
              </div>
            </div>
            {/* product details mobile view only */}
            <div
              className={Classes.BackgroundBgs}
              style={{ borderTop: "0px" }}
            ></div>
            <div className={Classes.BorderBottom}>
              <div className="container">
                <p className={Classes.AvailableColours}>Certification</p>
                <div className={Classes.ParentCertificate}>
                  <div className={Classes.BIS}>
                    <img src={BIS} alt="" />
                    <p className={Classes.CertificateHead}>Bis Hallmark</p>
                    <p className={Classes.CertificateDesc}>For Gold</p>
                  </div>
                  <div className={Classes.BIS}>
                    <img src={IGI} alt="" />
                    <p className={Classes.CertificateHead}>IGI Certification</p>
                    <p className={Classes.CertificateDesc}>For Diamonds</p>
                  </div>
                  <div className={Classes.IGI}>
                    <img src={GIA} alt="" />
                    <p className={Classes.CertificateHead}>GIA Certification</p>
                    <p className={Classes.CertificateDesc}>For solitaire</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={Classes.BackgroundBgs}></div>
            <div className={`${Classes.BorderBottom2} ${Classes.MobHideField}`}>
              <div className="container">
                <p className={Classes.ProductDetailsHead}>Product details</p>
                <div className="row">
                  <div className="col-md-4 col-6">
                    <p className={Classes.Left}>Product ID</p>
                    {/* <p className={Classes.Left}>Size</p> */}
                    {props.gw > 0 ? (
                      <p className={Classes.Left}>Gross Weight</p>
                    ) : null}

                    {props.diamondTypw !== null && (
                      <p className={Classes.Left}>Diamond Type</p>
                    )}
                    {props.diamondWeight > 0 ? (
                      <p className={Classes.Left}>Diamond Weight</p>
                    ) : null}

                    {props.diamondCount > 0 ? (
                      <p className={Classes.Left}>Diamond Count</p>
                    ) : null}
                    {props.otherStoneW > 0 ? (
                      <p className={Classes.Left}>Other stone weight</p>
                    ) : null}

                    {props.otherStoneC > 0 ? (
                      <p className={Classes.Left}>Other Stone Count</p>
                    ) : null}

                    <p className={Classes.Left}>Product Length</p>
                    <p className={Classes.Left}>Product Width</p>
                    <p className={Classes.Left}>Product Height</p>
                  </div>
                  <div className="col-md-8 col-6">
                    <p className={Classes.Right}>{props.sku}</p>
                    {/* <p className={Classes.Right}>{props.size}</p> */}
                    {props.gw > 0 ? (
                      <p className={Classes.Right}>{props.gw + " GM"}</p>
                    ) : null}

                    {props.diamondTypw !== null && (
                      <p className={Classes.Right}>{props.diamondTypw}</p>
                    )}
                    {props.diamondWeight > 0 ? (
                      <p className={Classes.Right}>
                        {props.diamondWeight + " Carat"}
                      </p>
                    ) : null}

                    {/* <p className={Classes.Right}>{props.diamondCount}</p> */}

                    {props.diamondCount > 0 ? (
                      <p className={Classes.Right}>{props.diamondCount}</p>
                    ) : null}
                    {props.otherStoneW > 0 ? (
                      <p className={Classes.Right}>{props.otherStoneW}</p>
                    ) : null}

                    {props.otherStoneC > 0 ? (
                      <p className={Classes.Right}>{props.otherStoneC}</p>
                    ) : null}

                    <p className={Classes.Right}>{props.length + " mm"}</p>
                    <p className={Classes.Right}>{props.width + " mm"}</p>
                    <p className={Classes.Right}>{props.height + " mm"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-md-12 ${Classes.MobHideField}`}>
              <div className="container">
                <div className={Classes.BorderBottom}>
                  <p className={Classes.AvailableColours}>
                    Product description
                  </p>
                  <div className={Classes.ProductDiscription}>
                    {props.description}
                  </div>
                </div>
              </div>
            </div>
            <div className={Classes.BorderBottom} ref={ratingRef}>
              <div className="container">
                <div className={`row ${Classes.SellerInfo}`}>
                  <div className="" style={{ padding: "0px" }}>
                    <div className={Classes.Left}>
                      <div className={Classes.manufacture}>
                        <div>Manufacturer</div>
                        <div>:</div>
                        <div className={Classes.manpara}>
                          Swa Diamonds MIDC MAROL ANDHERI EAST, MUMBAI, 400093
                        </div>
                      </div>
                      <div className={Classes.manufacture}>
                        <div>Country of origin</div>
                        <div>:</div>
                        <div className={Classes.manpara}>India</div>
                      </div>
                      <div className={Classes.manufacture}>
                        <div>Call us (Toll Free)</div>
                        <div>:</div>
                        <div className={Classes.manpara}>1800 257 8600</div>
                      </div>
                      <div className={Classes.manufacture}>
                        <div>Chat with us</div>
                        <div>:</div>
                        <div className={Classes.manpara}>
                          {" "}
                          <IoLogoWhatsapp color="#22AD2C" size={20} />
                          +91 95677 77722
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={Classes.BackgroundBgs}></div>
            <div className={Classes.BorderBottom2}>
              <div className="container">
                <div className={Classes.RatingFlex}>
                  <p
                    className={`${Classes.ProductDetailsHead} ${Classes.ProductDetailsHead2}`}
                  >
                    Rating & Review
                  </p>
                  <div className={Classes.StarFlex}>
                    <p className={Classes.Rating}>
                      {parseFloat(props.avgR).toFixed(0)}
                      {/* {props.avgR} */}
                    </p>
                    <IoIosStar
                      size={25}
                      color="#F7C514"
                      className={Classes.star}
                    />
                  </div>
                </div>
                <p className={Classes.RatingNum}>{props.count} </p>
              </div>
            </div>

            {/* {props.review.map((item, index) => {
              return (
                <div className={Classes.Reviews} key={index}>
                  <div className={Classes.StarRating}>
                    <p>{item.rating}</p>
                    <IoIosStar
                      className={Classes.Star}
                      size={10}
                      color="#ffffff"
                    />
                  </div>
                  <div className={Classes.Comments}>
                    <p className={Classes.Comment}>{item.review_title}</p>
                    <p className={Classes.Name}>{item.review}</p>
                  </div>
                </div>
              );
            })} */}
            <div className={Classes.BorderBottom2}>
              <div className="container">
                <div className={Classes.CustomersHeadReview}>
                  <p className={Classes.ProductDetailsHead}>
                    Customer photos ({reviews.review_image_count})
                  </p>
                  {/* carousel */}
                  <ProductImages reviewImages={reviewImages} />
                  {/* carousel */}
                </div>
                {/* <div className={Classes.ReviewImageTexts}>
                  <div className={Classes.Icon_Stars}>
                    <img src={Profiles} />
                    <div className={Classes.StarIcons1}>
                      <p style={{ color: "#fff" }}>5</p>
                      <IoIosStar
                        style={{ marginTop: "0px" }}
                        className={Classes.Star}
                        size={16}
                        color="#ffffff"
                      />
                    </div>
                  </div>
                  <div className={Classes.RightHeadDesc}>
                    <p>Jameel Muhammed</p>
                    <p className={Classes.dateReview}>12 Oct 2024</p>
                    <div className={Classes.ReviewsDescription}>
                      <p>
                        nice collections swa diamonds, irealy loved it and thank
                        you soo much for your quick delivery
                      </p>
                    </div>
                  </div>
                </div> */}
                {/* second dummy */}
                {/* {reviewImages.map((item, index) => {
                  const formattedDate = moment(item.updated_at).format(
                    "DD MMM YYYY"
                  );
                  return (
                    <div
                      className={Classes.ReviewImageTexts}
                      style={{ borderBottom: "0px" }}
                    >
                      <div className={Classes.Icon_Stars}>
                        <img src={Profiles} />
                        <div className={Classes.StarIcons1}>
                          <p style={{ color: "#fff" }}>{item.rating}</p>
                          <IoIosStar
                            style={{ marginTop: "0px" }}
                            className={Classes.Star}
                            size={16}
                            color="#ffffff"
                          />
                        </div>
                      </div>
                      <div className={Classes.RightHeadDesc}>
                        <p>{item.user.name}</p>
                        <p className={Classes.dateReview}>
                          {formattedDate && formattedDate}
                        </p>
                        <div className={Classes.ReviewsDescription}>
                          <p>{item.review}</p>
                        </div>
                      </div>
                    </div>
                  );
                })} */}
                <div>
                  {renderedReviews.map((item, index) => {
                    const formattedDate = moment(item.updated_at).format(
                      "DD MMM YYYY"
                    );
                    return (
                      <div
                        className={Classes.ReviewImageTexts}
                        style={{
                          borderBottom: "0px",
                        }}
                        key={index}
                      >
                        <div className={Classes.Icon_Stars}>
                          <img src={Profiles} alt="Profile" />
                          <div className={Classes.StarIcons1}>
                            <p
                              style={{
                                color: "#fff",
                              }}
                            >
                              {item.rating}
                            </p>
                            <IoIosStar
                              style={{
                                marginTop: "0px",
                              }}
                              className={Classes.Star}
                              size={16}
                              color="#ffffff"
                            />
                          </div>
                        </div>
                        <div className={Classes.RightHeadDesc}>
                          <p>
                            {item.user === null
                              ? item.user_name
                              : item && item.user && item.user.name}
                          </p>
                          <p className={Classes.dateReview}>{formattedDate}</p>
                          <div className={Classes.ReviewsDescription}>
                            <p>{item.review}</p>
                          </div>
                          <div style={{ marginTop: "8px" }}>
                            <img
                              style={{ maxWidth: "60px", borderRadius: "5px" }}
                              src={item.review_image}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {reviews.count > 3 && (
              <div
                className={Classes.CommentFlex}
                onClick={toggleShowAllReviews}
              >
                <div
                  className="container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "20px 0px",
                  }}
                >
                  <p className={Classes.AvailableColours3}>
                    {showAllReviews ? "See less" : "See all " + props.count}
                  </p>
                  <MdOutlineKeyboardArrowRight
                    size={30}
                    className={Classes.ArrowIcon1}
                  />
                </div>
              </div>
            )}
            {/* {show &&
              props.all.map((item, index) => {
                return (
                  <div className={Classes.Reviews} key={index}>
                    <div className={Classes.StarRating}>
                      <p>{item.rating}</p>
                      <IoIosStar
                        className={Classes.Star}
                        size={10}
                        color="#ffffff"
                      />
                    </div>
                    <div className={Classes.Comments}>
                      <p className={Classes.Comment}>{item.review_title}</p>
                      <p className={Classes.Name}>{item.review}</p>
                    </div>
                  </div>
                );
              })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
