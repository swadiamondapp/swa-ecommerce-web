import React, { useEffect, useState } from "react";
import Ring from "../../Assets/new4.png";
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
import Call from "../../Assets/call.png";
import Stroke from "../../Assets/Stroke.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CgHeart } from "react-icons/cg";
import Carousel from "react-bootstrap/Carousel";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import * as Urls from "../../Urls";
import Profiles from "../../Assets/profileicon.png";
import ProductImages from "./ProductImages";
import { MdOutlineStarPurple500 } from "react-icons/md";

const ProductDetails = (props) => {
  const [show, setShow] = useState(false);
  const [addToWishList, setAddToWishList] = useState(false);
  const [wishId, setWishId] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [active, setActive] = useState(null);
  const history = useHistory();
  const token = localStorage.getItem("swaToken");

  useEffect(() => {
    if (token !== null) {
      axios
        .get(Urls.productDet + props.id, {
          headers: { Authorization: "Token " + token },
        })
        .then((response1) => {
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
  }, []);
  const addToCartHandler = () => {
    props.cartAdd();
  };
  const homeHandler = () => {
    history.push("/");
  };
  const [purity, setPurity] = useState(false);
  const clickPurity = () => {
    setPurity(!purity);
  };
  const colorSelectHandler = (color) => {
    props.colorSelct(color);
  };
  const bagImgHandler = (imgUrl) => {
    props.bagImgSelect(imgUrl);
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
          headers: { Authorization: "Token " + token },
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
            headers: { Authorization: "Token " + token },
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
  const sizeChangeHandler = (e) => {
    props.sizeChange(e.target.value);
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "40px" }}>
        <ToastContainer />
        {/* <div className={Classes.SubTexts}>
          <p
            style={{ color: "#00464D" }}
            className={Classes.Home}
            onClick={homeHandler}
          >
            HOME /&nbsp;
          </p>
          <p style={{ color: "#00464D" }} className={Classes.Home}>
            {" "}
            NEW ARRAIVALS / &nbsp;
          </p>
          <p className={Classes.NewArrival}>
            {" "}
            {props.name ? props.name.toUpperCase() : ""}
          </p>
        </div> */}
        <div className="row">
          <div className="col-md-6">
            <div className={`${Classes.Display} ${Classes.StickyDisplay}`}>
              <div className="container">
                <div className="row">
                  <div className={`col-md-10 ${Classes.MobProductDetails2}`}>
                    <div className={Classes.ImageWishList}>
                      <img
                        className={Classes.LargeImage}
                        src={props.thumbImg}
                        alt=""
                      />
                      {/* warning not remove */}

                      {/* {addToWishList ? (
                        <FaHeart
                          color="#F91919"
                          className={Classes.Heart}
                          onClick={Remove}
                        />
                      ) : (
                        <CgHeart
                          color="#060000"
                          className={Classes.Heart}
                          onClick={Added}
                        />
                      )} */}
                      {/* warning not remove */}
                      <div className={Classes.rateStar8}>
                        5{" "}
                        <MdOutlineStarPurple500 className={Classes.starrate8} />{" "}
                        435
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* inner images */}
              <div className="container">
                <div>
                  <div className={Classes.MobProductDetails}>
                    {props.bagImg.map((item, index) => {
                      return (
                        <div className={Classes.SmallImages} key={index}>
                          <img
                            className={Classes.ImageSmall}
                            src={item}
                            alt=""
                            onClick={() => bagImgHandler(item)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
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
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  {/* <img
                    onClick={Added}
                    src={PH1}
                    className={Classes.ImgHeartShare}
                  /> */}
                  <p>
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
                  <img src={PS1} className={Classes.ImgHeartShare} />
                </p>
              </div>
              <p className={Classes.SubText}>
                {props.name} In Gold ({props.gw} gram) with Diamonds (
                {props.diamond}gram)
              </p>
              <p className={Classes.Code}>{props.sku}</p>
              <div className={`${Classes.Flex} ${Classes.MobDownAR}`}>
                {/* <BiRupee size={25} /> */}

                <p className={Classes.NewPrice}>&#x20B9; {props.offerPrice}</p>
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
                  return (
                    <div
                      className={Classes.Options}
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
                <div className={Classes.FindStoreParent}>
                  <button className={Classes.TryHome}>Try @ Home</button>
                  <button className={Classes.VideoCall}>
                    <img src={Call} />
                  </button>
                  <button className={Classes.FindStores}>Find @ store</button>
                </div>
              </div>
              <div className={Classes.BorderBottom}>
                <p className={Classes.AvailableColours}>Select Size</p>
                <select
                  className={Classes.SizeSelect}
                  onChange={sizeChangeHandler}
                >
                  <option value="">Select Size</option>
                  {props.sizeChart.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.size_name}
                      </option>
                    );
                  })}
                </select>
                <div style={{ paddingTop: "0px" }} className="errrMsg">
                  {props.error}
                </div>
              </div>
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
                <p className={Classes.AvailableColours}>
                  Delivery availability
                </p>
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

                <div className="errrMsg">{pinCodeError}</div>
                {/* <div className={Classes.Flex}>
                <img className={Classes.Stroke} src={Stroke} alt="" />
                <p className={Classes.StrokeText}>Standard delivery between </p>
                <p className={Classes.DeliveryDate}>24 Oct & 28 oct 2022</p>
              </div> */}

                {active === true ? (
                  <>
                    <div className={Classes.Flex} style={{ marginLeft: "0px" }}>
                      <img className={Classes.Stroke} src={Stroke} alt="" />
                      <p className={Classes.StrokeText}>
                        Cash / Card delivery option available
                      </p>{" "}
                    </div>
                    <div className={Classes.Flex} style={{ marginLeft: "0px" }}>
                      <img className={Classes.Stroke} src={Stroke} alt="" />
                      <p className={Classes.StrokeText}>
                        Standard delivery available
                      </p>
                    </div>
                  </>
                ) : null}
                {active === false ? (
                  <p style={{ paddingTop: "0px" }} className="errrMsg">
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
                  <p>029567-2345643</p>
                </div>
              </div>
              <div className={Classes.ProductDetailsMobCard}>
                <div className={Classes.LeftMobCard1}>
                  <img src={PD1} />
                  <p className={Classes.PdH1}>18kt Rose gold</p>
                  <p style={{ color: "#7A8288" }}>Net weight</p>
                  <p style={{ color: "#00464d" }}>1.300 GM</p>
                </div>
                <div className={Classes.ArrowlineMob}></div>
                <div className={Classes.RightMobCard1}>
                  <img src={PD2} />
                  <p className={Classes.PdH1}>15 SIJJ Diamond</p>
                  <p style={{ color: "#7A8288" }}>Diamond weight</p>
                  <p style={{ color: "#00464d" }}>0.456 ct</p>
                </div>
              </div>
              <div className={Classes.ProductDetailsMobCard2}>
                <div className={Classes.MobCard2Head}>
                  <img src={PD3} />
                  <p className={Classes.PdM2}>Product details</p>
                </div>
                <div className={Classes.ProductMob3Rows}>
                  <div className={Classes.MobFirstCard}>
                    <p style={{ color: "#7A8288", fontSize: "15px" }}>
                      Product hight
                    </p>
                    <p>19 mm</p>
                  </div>
                  <div className={Classes.DummyLineArrow}></div>
                  <div className={Classes.MobFirstCard}>
                    <p style={{ color: "#7A8288", fontSize: "15px" }}>
                      Product length
                    </p>
                    <p>18 mm</p>
                  </div>
                  <div className={Classes.DummyLineArrow}></div>
                  <div className={Classes.MobFirstCard}>
                    <p style={{ color: "#7A8288", fontSize: "15px" }}>
                      Product width
                    </p>
                    <p>6.8 mm</p>
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
                  <p style={{ color: "#00464D" }}>Ruby</p>
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
                  <p style={{ color: "#00464D" }}>0</p>
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
                  <p style={{ color: "#00464D" }}>0</p>
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
                    <p className={Classes.CertificateHead}>Bis Hallamrk</p>
                    <p className={Classes.CertificateDesc}>For Gold</p>
                  </div>
                  <div className={Classes.BIS}>
                    <img src={IGI} alt="" />
                    <p className={Classes.CertificateHead}>IGI Crtification</p>
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
                    <p className={Classes.Left}>Gross Weight</p>
                    {props.diamondTypw !== null && (
                      <p className={Classes.Left}>Diamond Type</p>
                    )}
                    <p className={Classes.Left}>Diamond Weight</p>
                    <p className={Classes.Left}>Diamond Count</p>
                    <p className={Classes.Left}>Other stone weight</p>
                    <p className={Classes.Left}>Other Stone Count</p>
                    <p className={Classes.Left}>Product Length</p>
                    <p className={Classes.Left}>Product Width</p>
                    <p className={Classes.Left}>Product Height</p>
                  </div>
                  <div className="col-md-8 col-6">
                    <p className={Classes.Right}>{props.sku}</p>
                    {/* <p className={Classes.Right}>{props.size}</p> */}
                    <p className={Classes.Right}>{props.gw + " GM"}</p>
                    {props.diamondTypw !== null && (
                      <p className={Classes.Right}>{props.diamondTypw}</p>
                    )}
                    <p className={Classes.Right}>
                      {props.diamondWeight + " Carat"}
                    </p>
                    <p className={Classes.Right}>{props.diamondCount}</p>
                    <p className={Classes.Right}>{props.otherStoneW}</p>
                    <p className={Classes.Right}>{props.otherStoneC}</p>
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
            <div className={Classes.BorderBottom}>
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
                    <p className={Classes.Rating}>{props.avgR}</p>
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

            {props.review.map((item, index) => {
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
            })}
            <div className={Classes.BorderBottom2}>
              <div className="container">
                <div className={Classes.CustomersHeadReview}>
                  <p className={Classes.ProductDetailsHead}>
                    Customer photos (32)
                  </p>
                  {/* carousel */}
                  <ProductImages />
                  {/* carousel */}
                </div>
                <div className={Classes.ReviewImageTexts}>
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
                </div>
                {/* second dummy */}
                <div
                  className={Classes.ReviewImageTexts}
                  style={{ borderBottom: "0px" }}
                >
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
                </div>
              </div>
            </div>
            <div className={Classes.CommentFlex} onClick={seAllHandler}>
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
                  See all {props.count}{" "}
                </p>
                <MdOutlineKeyboardArrowRight
                  size={30}
                  className={Classes.ArrowIcon1}
                />
              </div>
            </div>
            {show &&
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
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
