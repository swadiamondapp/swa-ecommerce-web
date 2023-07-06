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
import Stroke from "../../Assets/Stroke.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CgHeart } from "react-icons/cg";
import Carousel from "react-bootstrap/Carousel";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import * as Urls from "../../Urls";

const ProductDetails = (props) => {
  const [show, setShow] = useState(false);
  const [addToWishList, setAddToWishList] = useState(false);
  const [wishId, setWishId] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [active, setActive] = useState(null)
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

          setActive(response1.data.IsSuccess)



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
  const ProductData = [
    {
      manufacturer: "Swa Diamonds MIDC MAROL ANDHERI EAST, MUMBAI, 400093",
      country: "India",
      tollFreeNumber: "1800 257 8600",
      chatNumber: "+91 95677 77722"
    }
  ];

  return (
    <div>
      <div className="container">
        <ToastContainer />
        <div className={Classes.SubTexts}>
          <p className={Classes.Home} onClick={homeHandler}>
            HOME /
          </p>
          <p className={Classes.Home}>NEW ARRAIVALS /</p>
          <p className={Classes.NewArrival}>{props.name}</p>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className={Classes.Display}>
              <div className="container">
                <div className="row">
                  <div className="col-md-2">
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
                  <div className="col-md-10">
                    <div className={Classes.ImageWishList}>
                      <img
                        className={Classes.LargeImage}
                        src={props.thumbImg}
                        alt=""
                      />

                      {addToWishList ? (
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
          <div className="col-md-6">
            <p className={Classes.NewArrivals}>New Arrivals</p>
            <p className={Classes.SubText}>
              {props.name} In Gold ({props.gw} gram) with Diamonds (
              {props.diamond} gram)
            </p>
            <p className={Classes.Code}>{props.sku}</p>
            <div className={Classes.Flex}>
              <BiRupee size={25} />
              <p className={Classes.NewPrice}>{props.offerPrice}</p>
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
            <p className={Classes.AvailableColours}>Available  Metal Types</p>
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
            <input
              type="submit"
              className={Classes.AddtoCart}
              value="Add to Cart"
              onClick={addToCartHandler}
            />
            <input
              type="submit"
              className={Classes.BuyNow}
              value="Buy Now"
              onClick={props.clickedBuy}
            />
            <div className={Classes.BorderBottom}>
              <p className={Classes.AvailableColours}>Select Size</p>
              <select
                className={Classes.SizeSelect}
                onChange={sizeChangeHandler}
              >
                <option value=""></option>
                {props.sizeChart.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.size_name}
                    </option>
                  );
                })}
              </select>
              <div className="errrMsg">{props.error}</div>
            </div>
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
              <p className={Classes.AvailableColours}>Delivery availability</p>

              <input
                className={Classes.PinCode}
                type="number"
                value={pinCode}
                onChange={pinCodeChangeHandler}
              />
              <input
                className={Classes.CheckButton}
                type="submit"
                onClick={availbilityCheck}
              />
              <br />
              <div className="errrMsg">{pinCodeError}</div>
              {/* <div className={Classes.Flex}>
                <img className={Classes.Stroke} src={Stroke} alt="" />
                <p className={Classes.StrokeText}>Standard delivery between </p>
                <p className={Classes.DeliveryDate}>24 Oct & 28 oct 2022</p>
              </div> */}


              {active === true ? <>
                <div className={Classes.Flex}><img className={Classes.Stroke} src={Stroke} alt="" /><p className={Classes.StrokeText}>
                  Cash / Card delivery option available
                </p> </div>
                <div className={Classes.Flex}>
                  <img className={Classes.Stroke} src={Stroke} alt="" /><p className={Classes.StrokeText}>
                    Standard delivery  available
                  </p></div></> : null}
              {active === false ? <p className="errrMsg">Standard delivery not available</p> : null}

            </div>
            <div className={Classes.BorderBottom}>
              <p className={Classes.AvailableColours}>Certification</p>
              <div className={Classes.Flex}>
                <div className={Classes.BIS}>
                  <img src={BIS} alt="" />
                  <p className={Classes.CertificateText}>Bis Hallamrk</p>
                  <p className={Classes.CertificateSubText}>For Gold</p>
                </div>
                <div className={Classes.IGI}>
                  <img src={IGI} alt="" />
                  <p className={Classes.CertificateText}>IGI Crtification</p>
                  <p className={Classes.CertificateSubText}>For Diamonds</p>
                </div>
              </div>
            </div>
            <div className={Classes.BorderBottom}>
              <p className={Classes.AvailableColours}>Product details</p>
              <div className="row">
                <div className="col-md-4">
                  <p className={Classes.Left}>Product ID</p>
                  {/* <p className={Classes.Left}>Size</p> */}
                  <p className={Classes.Left}>Gold Weight</p>
                  <p className={Classes.Left}>Diamond</p>
                  <p className={Classes.Left}>Other stone weight</p>
                </div>
                <div className="col-md-8">
                  <p className={Classes.Right}>{props.sku}</p>
                  {/* <p className={Classes.Right}>{props.size}</p> */}
                  <p className={Classes.Right}>{props.gw}</p>
                  <p className={Classes.Right}>{props.diamond}</p>
                  <p className={Classes.Right}>{props.oSw}</p>
                </div>
              </div>
            </div>
            <div className={Classes.BorderBottom}>
              <p className={Classes.AvailableColours}>Product discription</p>
              <div className={Classes.ProductDiscription}>
                Lorem ipsum dolor sit amet consectetur.
                Varius integer mollis ut morbi amet varius cursus.
                Pellentesque morbi mauris maecenas interdum.
                Sem netus sed dui libero. Orci massa pretium ac velit quis risus at porttitor.
                Duis eget vitae porttitor non. Enim molestie sapien sit imperdiet.
                {props.description}
              </div>
            </div>
            <div className={Classes.BorderBottom}>
              <div className={`row ${Classes.SellerInfo}`}>
                <div className="col-md-4">
                  <p className={Classes.Left}>Manufacturer      :</p>
                  <p className={Classes.Left}>Country of Origin :</p>
                  <p className={Classes.Left}>Toll-Free Number  :</p>
                  <p className={Classes.Left}>Chat Number       :</p>
                </div>
                <div className="col-md-8">
                  {ProductData.map((item, index) => (
                    <div key={index}>
                      <p className={Classes.Right}>{item.manufacturer}</p>
                      <p className={Classes.Right}>{item.country}</p>
                      <p className={Classes.Right}>{item.tollFreeNumber}</p>
                      <div className={`${Classes.Right} ${Classes.ChatNo_WhatsIcon}`}>
                        <IoLogoWhatsapp className={`${Classes.WhatsappIcon}`} />
                        <p style={{
                          marginBottom: '0px'
                        }}>{item.chatNumber}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={Classes.BorderBottom}>
              <div className={Classes.RatingFlex}>
                <p className={Classes.AvailableColours}>Rating & Review</p>
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
            <div className={Classes.CommentFlex} onClick={seAllHandler}>
              <p className={Classes.AvailableColours}>See all {props.count} </p>
              <MdOutlineKeyboardArrowRight
                size={30}
                className={Classes.ArrowIcon}
              />
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
