"use client";
import React, { useEffect, useState, useRef } from "react";
import { RWebShare } from "react-web-share";
import Classes from "./productDetails.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiRupee } from "react-icons/bi";
import { IoIosStar, IoLogoWhatsapp } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CgHeart } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import * as Urls from "@/utils/urls";
import moment from "moment";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import VideocallForm from "./videocallform";
import { CgDollar } from "react-icons/cg";

const shippingTag = "/Assets/shiptime.png";
const shippingTag1 = "/Assets/shiptruck.png";
const shippingtag2 = "Assets/shiptimetwo.png";

import ProductReviewImages from "./product-review-images";

import { useRouter } from "next/navigation";

import LoginSuccessModal from "../loginSuccessModal/loginsuccessmodal";
import LoginModal from "../login-modal/loginModal";
import Image from "next/image";
import { Modal } from "@mui/material";
import { useAuth } from "@/providers/auth-provider";
import ProductImages from "./product-images";
import { useCountry } from "@/providers/country-provider";
import ScrollToTop from "@/components/scroll-to-top";
import { useCheckout } from "@/providers/checkout-provider";

const ProductDetails = (props) => {
  const router = useRouter();
  const { token } = useAuth();
  const [show, setShow] = useState(false);
  const [addToWishList, setAddToWishList] = useState(false);
  const [wishlistIds, setWishlistIds] = useState();
  const [wishId, setWishId] = useState("");
  const [pincode, setPincode] = useState();
  const [pinCodeError, setPinCodeError] = useState("");
  const [active, setActive] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const ratingRef = useRef(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [videoSection, setVideoSection] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showRestrictionModal, setShowRestrictionModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(6);
  const { countryName, countryId } = useCountry();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [modalshow, setModalShow] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [text, setText] = useState("");
  const [thumbImg, setThumbImg] = useState(
    props.image[Object.keys(props.image)[0]].thumbnail
  );
  const [newThumpSet, setNewThumpSet] = useState(props.image);
  const [imgSet, setImgSet] = useState(
    props.image[Object.keys(props.image)[0]].multiple_images
  );
  const [clrId, setClrId] = useState("");
  const [colorError, setColorError] = useState("");
  const [picodeError, setPicodeError] = useState("");
  const [deliveryDate, setDeliveryDate] = useState();
  const [deliveryShopList, setDeliveryShopsList] = useState([]);
  const [sizeChart, setSizeChart] = useState(props.size_names || []);
  const [colorChart, setColorChart] = useState(props.colors || []);
  const [video, setVideo] = useState(props.video || []);
  const [allRev, setAllRev] = useState([]);
  const [count, setCount] = useState(0);
  const [fetchedName, setFetchedName] = useState(null);
  const [cartCount, setCartCount] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [size, setSize] = useState("");

  const { setCheckoutData } = useCheckout();

  const closeHanlder = () => {
    setModalShow(false);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const cartHandler = () => {
    let productDetails = props.productDetails;
    let total;
    if (productDetails.is_on_discount) {
      total = productDetails.discount_price;
    } else {
      total = productDetails.country_total_price;
    }
    const body = {
      product_id: productDetails.id,
      color_id: clrId,
      size_id: selectedSize,
      quantity: 1,
    };

    const selProd = {
      product_id: productDetails.id,
      color: clrId,
      size: selectedSize,
      total: total,
    };

    if (token !== null) {
      axios
        .post(`${Urls.cart}?country=${countryId}`, body, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          if (response1.data.results.status_code === 200) {
            let count = cartCount;
            count = count + 1;
            setCartCount(count);
            router.push("/shoping/cart");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const checkoutData = {
        data: selProd, // Selected products
        name: "buybody",
      };
      setCheckoutData(checkoutData);
      router.push(`/cart/checkout`);
    }
  };

  useEffect(() => {
    const pincode = localStorage.getItem("pincode");
    setPincode(pincode);
  }, []);

  useEffect(() => {
    colorChart.map((item, index) => {
      if (index === 0) {
        setClrId(item.id);
        setSelectedColor(item);
      }
    });

    // setPincode(localStorage.getItem("pincode"));
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
      "https://swaecommain.swa.co/ecom/products/" + props.id + "/reviews/"
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
      const reviewImages = response.data.results.data.filter(
        (item) => item.review_image_url !== null
      );
      setReviewImages(reviewImages);
    }
  };

  const colorSelectHandler = (color) => {
    setSelectedColor(color);
    colorHandler(color);
  };

  const colorHandler = (imgItem) => {
    let clr = imgItem && imgItem.colour_name;

    if (imgItem && imgItem.colour_name === "rose") {
      clr = "rose";
      setThumbImg(newThumpSet.rose.thumbnail);
      setImgSet(newThumpSet.rose.multiple_images);
      setClrId(newThumpSet.rose.thumbnail_color_id);
    } else if (imgItem && imgItem.colour_name === "white") {
      clr = "white";
      setThumbImg(newThumpSet.white.thumbnail);
      setImgSet(newThumpSet.white.multiple_images);
      setClrId(newThumpSet.white.thumbnail_color_id);
    } else if (imgItem && imgItem.colour_name === "yellow") {
      clr = "yellow";

      setThumbImg(newThumpSet.yellow.thumbnail);
      setImgSet(newThumpSet.yellow.multiple_images);
      setClrId(newThumpSet.yellow.thumbnail_color_id);
    } else if (imgItem && imgItem.colour_name === "pt") {
      clr = "pt";
      setThumbImg(newThumpSet.pt.thumbnail);
      setImgSet(newThumpSet.pt.multiple_images);
      setClrId(newThumpSet.pt.thumbnail_color_id);
    }
  };

  const pinCodeChangeHandler = (e) => {
    setPincode(e.target.value);
  };

  const Added = () => {
    if (token !== null) {
      const body = {
        product_id: props.id,
      };
      axios
        .post(`${Urls.wishlist}?country=${countryId}`, body, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((response1) => {
          setAddToWishList(true);
          setWishlistIds(response1.data.results.data.id);
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
      const idToUse = wishId || wishlistIds;
      if (idToUse) {
        axios
          .delete(`${Urls.wishlist + idToUse}/?country=${countryId}`, {
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
    ? (reviews.data ?? [])
    : (reviews.data ?? []).slice(0, 3);

  const addToCartHandler = () => {
    if (props.IsRestricted === true) {
      // Show restriction modal for 5 seconds
      // setShowRestrictionModal(true);
      // setTimeout(() => {
      //   setShowRestrictionModal(false);
      // }, 5000);
    } else {
      if (props.sizeChart.length > 0) {
        if (!props.Size && !selectedSize) {
          setShowErrorModal(true);
          setTimeout(() => {
            setShowErrorModal(false);
          }, 78000);
        } else {
          cartHandler();
        }
      } else {
        cartHandler();
      }
    }
  };

  const sizeChangeHandler = (e) => {
    // props.sizeChange(e.target.value);
    const selectedId = e.target.value;
    setSelectedSize(selectedId);
   

    // Find the corresponding checkbox and check it
    const radioButton = document.querySelector(
      `input[type="radio"][value="${selectedId}"]`
    );
    if (radioButton) {
      radioButton.checked = true;
    }
  };

  const handleCheckboxChange = (event) => {
  
    const selectedId = event.target.value;
    props.selectedSize(selectedId);
    setSelectedSize(selectedId);


    // Find the corresponding option in the select box and select it
    const selectBox = document.querySelector("select");
    if (selectBox) {
      selectBox.value = selectedId;
    }
  };

  const Tryhome = () => {
    if (token) {
      tryhomeHandler();
    } else {
      setLoginModalVisible(true);
      setModalShow(true);
    }
  };

  const tryhomeHandler = () => {
    const body = {
      product_id: props.id,
      colour_id: clrId,
      size_id: selectedSize,
    };
 

    if (token !== null) {
      axios
        .post(`${Urls.tryathome}?country=${countryId}`, body, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response1) => {
          if (response1.data.results.status_code === 200) {
            router.push("/trial/athome");
          } else if (
            response1.data.results.message === "Item already in try list"
          ) {
            router.push("/trial/athome");
          } else if (response1.data.results.message === "size  required") {
            setErrormsgtrycart("size  required");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const checkDelivery = () => {
    let hasError = false;

    if (!clrId) {
      setColorError("Color ID is required");
      hasError = true;
    } else {
      setColorError("");
    }
    if (!pincode) {
      setPicodeError("Pincode is required");
    } else {
      setPicodeError("");
    }

    // if (!size) {
    //   setSizeError("Size is required");
    //   hasError = true;
    // } else {
    //   setSizeError("");
    // }
    if (sizeChart.length > 0) {
      if (!size) {
        setSizeError("Size is required");
        hasError = true;
      } else {
        setSizeError("");
      }
    } else {
      // If no size chart is present, reset the size error
      setSizeError("");
    }
    if (!hasError && pincode) {
      const body = {
        product_id: props.id,
        color_id: clrId,
        size_id: size,
        pincode: pincode,
      };

      axios
        .post(Urls.checkdeliveryDate, body, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
          setDeliveryDate(response1.data.results.message);
          setDeliveryShopsList(response1.data.results.data);
          // setPincodeShow(true); // Show the message after receiving the response
       
        })
        .catch((error) => {
          console.log(error);
        });
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

  const reviewCount = `${reviews != undefined ? reviews.count : 0} Reviews`;

  const handleDoneClick = () => {
    // Perform any action you want when the "Done" button is clicked
    setShowErrorModal(false);
  };
  // Handle image load event
  const handleImageLoad = () => {
    setImageLoading(false);
  };


  let cost = props.offerPrice;
  let formattedCost = parseFloat(cost).toLocaleString();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  const result = numberWithCommas(formattedCost);


  const handleThumbnailClick = (index) => {
    setCurrentSlideIndex(index);
  };

  // List of image and video file extensions
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".tiff",
    ".webp",
  ];
  const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".flv", ".wmv"];

  // Arrays to hold image and video URLs
  const imageUrls = [];
  const videoUrls = [];

  // Iterate over the array of URLs
  imgSet.forEach((url) => {
    // Get the file extension, accounting for possible query parameters
    const parts = url && url.split("/");
    const fileName = parts && parts[parts && parts.length - 1];
    const extension = fileName && fileName.split(".").pop().toLowerCase(); // get file extension and convert to lowercase

    // Check if the extension is in the image or video list
    if (imageExtensions.includes(`.${extension}`)) {
      imageUrls.push(url);
    } else if (videoExtensions.includes(`.${extension}`)) {
      videoUrls.push(url);
    }
  });

  var settings = {
    dots: true,
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
    // autoplay: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

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

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      let _url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      try {
        setIsLoading(true);
        const response = await axios.get(_url);
        setPincode(response.data.address.postcode);
        localStorage.setItem("pincode", response.data.address.postcode);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    });
  };
  const getDeliveryDate = (deliveryDate) => {
    const today = new Date();
    const shippingTag24Hrs = "Delivery in 24 hrs";
    const shippingTagNextDay = "Shipment in next day";
    const shippingTag5Days = "Shipment in next 5 working days";

    if (deliveryDate === shippingTag24Hrs) {
      return shippingTag24Hrs; // Return the 24 hrs tag
    } else if (deliveryDate === shippingTagNextDay) {
      // Calculate the next day
      today.setDate(today.getDate() + 1);
    } else if (deliveryDate === shippingTag5Days) {
      // Calculate 5 working days (skip weekends)
      let workingDays = 5;
      while (workingDays > 0) {
        today.setDate(today.getDate() + 1);
        if (today.getDay() !== 6 && today.getDay() !== 0) {
          // Skip weekends (Saturday and Sunday)
          workingDays--;
        }
      }

      // Extract day and month for custom message
      const day = today.getDate(); // Get the day of the month
      const month = today.toLocaleString("default", { month: "long" }); // Get the full month name

      // Return the custom message with the calculated date
      return `Free delivery by ${day}th ${month}`;
    } else {
      return deliveryDate; // For any other delivery date
    }

    // Format the date for "Shipment in next day" or other cases
    const options = { month: "short", day: "numeric", year: "numeric" };
    return today.toLocaleDateString(undefined, options);
  };

  const handleReviewClicked = () => {
    if (ratingRef.current) {
      ratingRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <ScrollToTop />
      <div className="container ProductdetialParentContainer">
        <ToastContainer />
        <div className="row">
          <ProductImages
            thumbImg={thumbImg}
            videoSection={videoSection}
            imageLoading={imageLoading}
            imageUrls={imageUrls}
            videoUrls={videoUrls}
            avgR={props.avgR}
            discount={props.discount}
            discountPercentage={props.discountPercentage}
            reviewCount={reviewCount}
            bagImg={imgSet}
            handleReviewClicked={handleReviewClicked}
          />

          <div className="col-md-6" style={{ padding: "0px", zIndex: "100" }}>
            <div className="container">
              <div className={Classes.ParentHeadingD1}>
                <div className={Classes.NewArrivals}>{props.name}</div>
                <div
                  className={Classes.SubText}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
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
                  <RWebShare
                    data={{
                      text: "Swa Diamonds",
                      // url: "https://swa.co/" + location.pathname,
                      // url: `https://www.swa.co/jewellery/share?id=${props.productDetails.id}&color=${props.productDetails.color}&name=${props.productDetails.name}&alias=${props.alias}`,
                      url: `https://www.swa.co/jewellery/share?id=${
                        props && props.productDetails && props.productDetails.id
                      }&color=${
                        props &&
                        props.productDetails &&
                        props.productDetails.color
                      }&name=${
                        props &&
                        props.productDetails &&
                        props.productDetails.name
                      }&alias=${props && props.alias && props.alias}`,
                      // url: "https://www.swa.co/" + location.pathname,
                      title: "Swa Diamonds",
                    }}
                    onClick={() => console.log("shared successfully!")}
                  >
                    <Image
                      src={`/Assets/sharebtn.png`}
                      alt="PS1"
                      width={25}
                      height={25}
                      className={Classes.ImgHeartShare}
                    />
                  </RWebShare>
                </div>
              </div>
              <div className={Classes.SubText}>
                {props.name} In Gold ({props.gw} gram)
                {props.diamondWeight > 0
                  ? ` with Diamonds ( ${props.diamondWeight} Carat)`
                  : null}
                {/* {props.diamondWeight}gram) */}
              </div>
              <div className={Classes.Code}>SKU : {props.sku}</div>
              <div className="productdetailPricesec">
                <div className={`${Classes.Flex} ${Classes.MobDownAR}`}>
                  {/* <BiRupee size={25} /> */}

                  <div
                    className={Classes.NewPrice}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    {countryName === "India" && (
                      <BiRupee className={Classes.Rupee} />
                    )}
                    {countryName === "United States" && (
                      <CgDollar className={Classes.Rupee} />
                    )}
                    {countryName === "United Arab Emirates" && (
                      <span style={{ paddingRight: "5px" }}>AED</span>
                    )}
                    {/* &#x20B9; {parseFloat(formattedCost).toFixed(0)} */}
                    {result === null || result === "NaN" ? "" : result}
                  </div>
                  {props.actualPrice &&
                    (props.actualPrice === null ||
                    isNaN(Number(props.actualPrice)) ? (
                      ""
                    ) : (
                      <>
                        {countryName === "India" && (
                          <BiRupee size={25} color="#B0B0B0" />
                        )}
                        {countryName === "United States" && (
                          <CgDollar size={25} color="#B0B0B0" />
                        )}
                        {countryName === "United Arab Emirates" && (
                          <span
                            style={{ paddingRight: "5px", paddingLeft: "7px" }}
                          >
                            AED
                          </span>
                        )}
                        <div className={Classes.OldPrice}>
                          {numberWithCommas(
                            parseInt(props.actualPrice, 10).toFixed(0)
                          )}
                        </div>
                      </>
                    ))}
                </div>
                {props.discount ? (
                  <div className={Classes.HurrayText}>
                    Hurray! You have saved{" "}
                    {countryName === "India" && <BiRupee size={15} />}
                    {countryName === "United States" && <CgDollar size={15} />}
                    {countryName === "United Arab Emirates" && (
                      <span style={{ paddingRight: "5px" }}>AED</span>
                    )}{" "}
                    {numberWithCommas(props.discountVal.toFixed(0))}
                  </div>
                ) : null}
              </div>

              <div className={Classes.AvailableColours}>
                Customize this product
              </div>
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
                      <div>{item.colour_name}</div>
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
                  <button
                    className={Classes.VideoCall}
                    onClick={handleOpenModal}
                  >
                    <Image
                      src={`/Assets/video.png`}
                      alt="Call"
                      width={44}
                      height={44}
                      style={{
                        maxWidth: "44px",
                      }}
                    />
                  </button>{" "}
                  {countryName === "India" && (
                    <button className={Classes.FindStores} onClick={Tryhome}>
                      Trial at Home
                    </button>
                  )}
                </div>
                <VideocallForm
                  isOpen={isModalOpen}
                  handleClose={handleCloseModal}
                  productId={props.id}
                />
                <div className="sizevalidation" style={{ color: "#ff4545" }}>
                  {props.errormsgtrycart}
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
                    <Image
                      style={{
                        cursor: "pointer",
                      }}
                      src={`/Assets/closeModal.png`}
                      width={16}
                      height={16}
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
                              // props.selectedSize(item.id);
                            }}
                            checked={selectedSize === item.id}
                          />
                          <div> {item.size_name}</div>
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
                    <Image
                      style={{
                        cursor: "pointer",
                      }}
                      src={`./Assets/closeModal.png`}
                      width={20}
                      height={20}
                      onClick={() => setShowRestrictionModal(false)}
                      alt="Close"
                    />
                  </div>
                </div>
              </Modal>
              {props.sizeChart.length > 0 && (
                <div className={Classes.BorderBottom}>
                  <div className={Classes.AvailableColours}>Select Size</div>
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
                  <div className={Classes.AvailableColours}>
                    Delivery availability
                  </div>
                  {isLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress
                        size={20}
                        sx={{ color: "#000", ml: 1 }}
                      />
                    </Box>
                  ) : (
                    <div
                      className={Classes.locatortexts}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                      onClick={getLocation}
                    >
                      <Image
                        src={`/Assets/locations.png`}
                        alt="locationsimg"
                        width={15}
                        height={15}
                      />
                      Locate me
                    </div>
                  )}
                </div>
                <div className={Classes.DeliveryFields}>
                  <input
                    className={Classes.PinCode}
                    type="number"
                    value={pincode || ""}
                    onChange={pinCodeChangeHandler}
                    onInput={(e) => {
                      if (e.target.value.length > 6) {
                        e.target.value = e.target.value.slice(0, 6);
                      }
                    }}
                    min="0"
                  />
                  <button
                    className={Classes.CheckButton}
                    // onClick={() => setPincodeShow(true)}
                    onClick={() => {
                      if (props.sizeChart.length > 0) {
                        if (!props.Size && !selectedSize) {
                          setShowErrorModal(true);
                          setTimeout(() => {
                            setShowErrorModal(false);
                          }, 78000);
                        } else {
                          checkDelivery();
                        }
                      } else {
                        checkDelivery();
                      }
                    }}
                    // onClick={availbilityCheck}
                  >
                    CHECK
                  </button>
                  {/* <input
                  className={Classes.CheckButton}
                  type="submit"
                  onClick={availbilityCheck}
                /> */}
                </div>
                <div style={{ color: "#ff000094" }}>{props.picodeError}</div>
                <div style={{ color: "#ff000094" }}>{props.sizeError}</div>
                <div style={{ color: "#ff000094" }}>{props.colorError}</div>
                {/* <div>
                  {props.pincodeShow && (
                    <p
                      style={{
                        paddingTop: "12px",
                        color: "#006e7f",
                        fontWeight: "600",
                      }}
                    >
                      {deliveryDate}
                    </p>
                  )}{" "}
                </div> */}

                <div className="errrMsg">{pinCodeError}</div>

                {deliveryDate && (
                  <div className={Classes.shippingTag_one}>
                    <div className={Classes.shippingTag_container}>
                      <img
                        src={
                          deliveryDate === "Shipment in next 5 working days"
                            ? shippingTag1
                            : deliveryDate === "Delivery in 24 hrs"
                              ? shippingtag2
                              : deliveryDate === "Shipment in next day"
                                ? shippingTag
                                : shippingtag2
                        }
                      />
                      <div className={Classes.shippingTagtext}>
                        {deliveryDate === "Shipment in next 5 working days"
                          ? "7 day shipping"
                          : deliveryDate === "Delivery in 24 hrs"
                            ? "24hr Delivery"
                            : deliveryDate === "Shipment in next day"
                              ? "Next day shipping"
                              : shippingtag2}
                      </div>
                    </div>
                  </div>
                )}
                <div className={Classes.deliveryListContainer}>
                  {deliveryDate === "Shipment in next 5 working days" && (
                    <div className={Classes.deliveryDetailsList}>
                      <div className={Classes.freedevimageBack}>
                        <Image
                          src={`/Assets/freeDev3.png`}
                          alt="freeimg"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <div>
                          <div className={Classes.shippingTagtext_head}>
                            {getDeliveryDate(deliveryDate)}
                          </div>
                        </div>
                        <div>
                          <div className={Classes.shippingTagtext_sub}>
                            Order in next 4 HRS 23 mins
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <div className={Classes.deliveryDetailsList}>
                    <div className={Classes.freedevimageBack}>
                      <img src={freeDelivery4} />
                    </div>
                    <div>
                      <div>
                        <p className={Classes.shippingTagtext_head}>
                          available at hilite mall (1km)
                        </p>
                      </div>
                      <div>
                        <p className={Classes.shippingTagtext_sub}>
                          Also 3 other store Show more
                        </p>
                      </div>
                    </div>
                  </div> */}
                  {deliveryDate && (
                    <div className={Classes.deliveryDetailsList}>
                      <div className={Classes.freedevimageBack}>
                        <Image
                          src={`/Assets/freeDev5.png`}
                          alt="freeDev5"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        {deliveryDate === "Delivery in 24 hrs" ? (
                          <>
                            <div>
                              <div className={Classes.shippingTagtext_head}>
                                Free trial at home available
                              </div>
                            </div>
                            <div>
                              <div className={Classes.shippingTagtext_sub}>
                                Try swa video call option
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <div className={Classes.shippingTagtext_head}>
                                Free trial at home not available
                              </div>
                            </div>
                            <div>
                              <div className={Classes.shippingTagtext_sub}>
                                Try swa video call option
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  {deliveryDate &&
                    Array.isArray(props.deliveryShopList) &&
                    props.deliveryShopList.length > 0 && (
                      <div className={Classes.deliveryDetailsList}>
                        <div className={Classes.freedevimageBack}>
                          <Image
                            src={`/Assets/shopsl.png`}
                            alt="Free Delivery"
                            width={50}
                            height={50}
                          />
                        </div>
                        <div>
                          <div>
                            <div className={Classes.shippingTagtext_head}>
                              Available Shop
                            </div>
                          </div>
                          <div>
                            {props.deliveryShopList.map((shop, index) => {
                              // Use a Set to collect unique shop names
                              const shopNames = new Set();

                              if (
                                shop.delivery_in_24_hr &&
                                shop.delivery_in_24_hr.shop_name
                              ) {
                                shopNames.add(shop.delivery_in_24_hr.shop_name);
                              }
                              if (
                                shop.delivery_in_next_day &&
                                shop.delivery_in_next_day.shop_name
                              ) {
                                shopNames.add(
                                  shop.delivery_in_next_day.shop_name
                                );
                              }

                              // Convert the Set back to an array and render unique shop names
                              return Array.from(shopNames).map(
                                (name, subIndex) => (
                                  <div
                                    key={`${index}-${subIndex}`}
                                    className={Classes.shippingTagtext_sub}
                                  >
                                    {name}
                                  </div>
                                )
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
                {/* <div className={Classes.Flex}>
                <img className={Classes.Stroke} src={Stroke} alt="" />
                <p className={Classes.StrokeText}>Standard delivery between </p>
                <p className={Classes.DeliveryDate}>24 Oct & 28 oct 2022</p>
              </div> */}

                {active === true ? (
                  <>
                    <div className={Classes.DeliveryBtns}>
                      <button>
                        <Image
                          src={`/Assets/time.png`}
                          alt="time"
                          width={20}
                          height={20}
                        />
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
                          <Image
                            src={`/Assets/d1.png`}
                            alt="d1"
                            width={40}
                            height={40}
                          />
                        </div>
                        <div>
                          <div className={Classes.DHeadText}>
                            Free Delivery in 3-5 days
                          </div>
                          <div className={Classes.Dheadtext1}>
                            Order in next 4 HRS 23 mins
                          </div>
                        </div>
                      </div>
                      <div className={Classes.DeliveryMessages}>
                        <div>
                          <Image
                            src={`/Assets/d1.png`}
                            alt="d1"
                            width={40}
                            height={40}
                          />
                        </div>
                        <div>
                          <div className={Classes.DHeadText}>
                            available at hilite mall (1km)
                          </div>
                          <div className={Classes.Dheadtext1}>
                            Also 3 other store Show more
                          </div>
                        </div>
                      </div>
                      <div className={Classes.DeliveryMessages}>
                        <div>
                          <Image
                            src={`/Assets/d2.png`}
                            alt="d2"
                            width={40}
                            height={40}
                          />
                        </div>
                        <div>
                          <div className={Classes.DHeadText}>
                            Free trial at home not available
                          </div>
                          <p className={Classes.Dheadtext1}>
                            Try swa video call option
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {active === false ? (
                  <div
                    style={{
                      paddingTop: "0px",
                    }}
                    className="errrMsg"
                  >
                    Standard delivery not available
                  </div>
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
                  <Image
                    src={`/Assets/PD1.png`}
                    alt="PD1"
                    width={30}
                    height={30}
                  />
                  <div className={Classes.PdH1}>18kt Rose gold</div>
                  <div
                    style={{
                      color: "#7A8288",
                    }}
                  >
                    Net weight
                  </div>
                  <div
                    style={{
                      color: "#00464d",
                    }}
                  >
                    {props.gw}
                  </div>
                </div>
                <div className={Classes.ArrowlineMob}></div>
                <div className={Classes.RightMobCard1}>
                  <Image
                    src={`/Assets/PD2.png`}
                    alt="PD2"
                    width={30}
                    height={30}
                  />
                  {/* <div className={Classes.PdH1}>15 SIJJ Diamond</div> */}
                  <div className={Classes.PdH1}>VVS/EF Diamond</div>
                  <div
                    style={{
                      color: "#7A8288",
                    }}
                  >
                    Diamond weight
                  </div>
                  <div
                    style={{
                      color: "#00464d",
                    }}
                  >
                    {props.diamondWeight}
                  </div>
                </div>
              </div>
              <div className={Classes.ProductDetailsMobCard2}>
                <div className={Classes.MobCard2Head}>
                  <Image
                    src={`/Assets/PD3.png`}
                    alt="PD3"
                    width={30}
                    height={30}
                  />
                  <p className={Classes.PdM2}>Product details</p>
                </div>
                <div className={Classes.ProductMob3Rows}>
                  <div className={Classes.MobFirstCard}>
                    <div
                      style={{
                        color: "#7A8288",
                        fontSize: "15px",
                      }}
                    >
                      Product height
                    </div>
                    <div>
                      {productDetails.height}
                      {props.height + " mm"}
                    </div>
                  </div>
                  <div className={Classes.DummyLineArrow}></div>
                  <div className={Classes.MobFirstCard}>
                    <div
                      style={{
                        color: "#7A8288",
                        fontSize: "15px",
                      }}
                    >
                      Product length
                    </div>
                    <div>{props.length + " mm"}</div>
                  </div>
                  <div className={Classes.DummyLineArrow}></div>
                  <div className={Classes.MobFirstCard}>
                    <div
                      style={{
                        color: "#7A8288",
                        fontSize: "15px",
                      }}
                    >
                      Product width
                    </div>
                    <div>{props.width + " mm"}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={Classes.ParentOtherStoneMob}>
              <div className={Classes.OtherstoneHeadMob}>
                {/* <Image
                  src={`/Assets/PD4.png`}
                  alt="PD4"
                  width={20}
                  height={20}
                /> */}
                <div className={Classes.PdM2}>Other stone details</div>
              </div>
              <div className={Classes.Otherstone3Cards}>
                <div className={Classes.FirststoneMob}>
                  <div
                    style={{
                      color: "#7A8288",
                      fontSize: "15px",
                      lineHeight: "20px",
                    }}
                  >
                    Other stone name
                  </div>
                  <div
                    style={{
                      color: "#00464D",
                    }}
                  >
                    Ruby
                  </div>
                </div>
                <div className={Classes.DummyLineArrow2}></div>
                <div className={Classes.FirststoneMob}>
                  <div
                    style={{
                      color: "#7A8288",
                      fontSize: "15px",
                      lineHeight: "20px",
                    }}
                  >
                    Other Stone Weight
                  </div>
                  <div
                    style={{
                      color: "#00464D",
                    }}
                  >
                    {props.otherStoneW}
                  </div>
                </div>
                <div className={Classes.DummyLineArrow2}></div>
                <div className={Classes.FirststoneMob}>
                  <div
                    style={{
                      color: "#7A8288",
                      fontSize: "15px",
                      lineHeight: "20px",
                    }}
                  >
                    Other Stone count
                  </div>
                  <div
                    style={{
                      color: "#00464D",
                    }}
                  >
                    {props.otherStoneC}
                  </div>
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
                <div className={Classes.AvailableColours}>Certification</div>
                <div className={Classes.ParentCertificate}>
                  <div className={Classes.BIS}>
                    <Image
                      src={`/Assets/BIS.png`}
                      alt="BIS"
                      width={56}
                      height={39}
                    />
                    <p className={Classes.CertificateHead}>Bis Hallmark</p>
                    <p className={Classes.CertificateDesc}>For Gold</p>
                  </div>
                  <div className={Classes.BIS}>
                    <Image
                      src={`/Assets/IGI.png`}
                      alt="IGI"
                      width={93}
                      height={39}
                    />
                    <p className={Classes.CertificateHead}>IGI Certification</p>
                    <p className={Classes.CertificateDesc}>For Diamonds</p>
                  </div>
                  <div className={Classes.IGI}>
                    <Image
                      src={`/Assets/GIA.png`}
                      alt="GIA"
                      width={40}
                      height={41}
                    />
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
                    <div className={Classes.Left}>Product ID</div>
                    {/* <div className={Classes.Left}>Size</div> */}
                    {/* {props.gw > 0 ? (
                      <div className={Classes.Left}>Gross Weight</div>
                    ) : null} */}
                    <div className={Classes.Left}>Gross Weight</div>

                    {props.diamondTypw !== null && (
                      <div className={Classes.Left}>Diamond Type</div>
                    )}
                    {/* {props.diamondWeight > 0 ? (
                      <div className={Classes.Left}>Diamond Weight</div>
                    ) : null} */}
                    <div className={Classes.Left}>Diamond Weight</div>

                    {/* {props.diamondCount > 0 ? (
                      <div className={Classes.Left}>Diamond Count</div>
                    ) : null} */}
                    <div className={Classes.Left}>Diamond Count</div>
                    {/* {props.otherStoneW > 0 ? (
                      <div className={Classes.Left}>Other stone weight</div>
                    ) : null} */}
                    <div className={Classes.Left}>Other stone weight</div>

                    {/* {props.otherStoneC > 0 ? (
                      <div className={Classes.Left}>Other Stone Count</div>
                    ) : null} */}
                    <div className={Classes.Left}>Other Stone Count</div>

                    <div className={Classes.Left}>Product Length</div>
                    <div className={Classes.Left}>Product Width</div>
                    <div className={Classes.Left}>Product Height</div>
                  </div>
                  <div className="col-md-8 col-6">
                    <div className={Classes.Right}>{props.sku}</div>
                    {/* <p className={Classes.Right}>{props.size}</p> */}
                    {/* {props.gw > 0 ? (
                      <p className={Classes.Right}>{props.gw + " GM"}</p>
                    ) : null} */}
                    <p className={Classes.Right}>{props.gw + " G"}</p>

                    {props.diamondTypw !== null && (
                      <div className={Classes.Right}>{props.diamondTypw}</div>
                    )}
                    {/* {props.diamondWeight > 0 ? (
                      <p className={Classes.Right}>
                        {props.diamondWeight + " Carat"}
                      </p>
                    ) : null} */}
                    <div className={Classes.Right}>
                      {props.diamondWeight + " Carat"}
                    </div>

                    {/* <p className={Classes.Right}>{props.diamondCount}</p> */}

                    {/* {props.diamondCount > 0 ? (
                      <p className={Classes.Right}>{props.diamondCount}</p>
                    ) : null} */}
                    <div className={Classes.Right}>{props.diamondCount}</div>
                    {/* {props.otherStoneW > 0 ? (
                      <p className={Classes.Right}>{props.otherStoneW}</p>
                    ) : null} */}
                    <div className={Classes.Right}>{props.otherStoneW}</div>

                    {/* {props.otherStoneC > 0 ? (
                      <p className={Classes.Right}>{props.otherStoneC}</p>
                    ) : null} */}
                    <div className={Classes.Right}>{props.otherStoneC}</div>

                    <div className={Classes.Right}>{props.length + " mm"}</div>
                    <div className={Classes.Right}>{props.width + " mm"}</div>
                    <div className={Classes.Right}>{props.height + " mm"}</div>
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
                    <div className={Classes.Rating}>
                      {parseFloat(props.avgR).toFixed(0)}
                      {/* {props.avgR} */}
                    </div>
                    <IoIosStar
                      size={25}
                      color="#F7C514"
                      className={Classes.star}
                    />
                  </div>
                </div>
                <div className={Classes.RatingNum}>{reviewCount} </div>
              </div>
            </div>

            {/* {props.review.map((item, index) => {
              return (product
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
            <div
              className={Classes.BorderBottom2}
              style={{ borderBottom: "none" }}
            >
              <div className="container">
                <div className={Classes.CustomersHeadReview}>
                  <div className={Classes.ProductDetailsHead}>
                    Customer photos ({reviews.review_image_count})
                  </div>
                  {/* carousel */}
                  <ProductReviewImages reviewImages={reviewImages} />
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
                          <Image
                            src={`/Assets/profileicon.png`}
                            alt="Profile"
                            width={40}
                            height={40}
                          />
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
                          {item.review_image && (
                            <div className="mt-2">
                              <img
                                style={{
                                  maxWidth: "30px",
                                  borderRadius: "5px",
                                }}
                                src={item.review_image}
                                alt="review_image"
                              />
                            </div>
                          )}
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
                    {showAllReviews ? "See less" : "See all " + reviewCount}
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
        {loginModalVisible && (
          <>
            <LoginModal
              isLog={modalshow}
              close={closeHanlder}
              handleOpenLogin={"profile"}
              setShowSuccessModal={setShowSuccessModal}
              setText={setText}
            />
            <LoginSuccessModal
              openSuccessModal={showSuccessModal}
              close={() => setShowSuccessModal(false)}
              state={showSuccessModal}
              text={text}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
