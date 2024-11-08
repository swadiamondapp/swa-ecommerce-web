import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Classes from "../HeaderNew/MainHead.module.css";
import productimage from "../../Assets/BringTheParty1.png";
import { Carousel } from "antd";
import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import * as Urls from "../../Urls";
import axios from "axios";
import Slider from "react-slick";
import CheckDelivery from "../CheckDelivery/CheckDelivery";

const SililerProducts = (props) => {
  const history = useHistory();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState("Check delivery date");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buttonLabels, setButtonLabels] = useState({});
  const Contryname = localStorage.getItem("country_name");
  const countryId = localStorage.getItem("id");

  useEffect(() => {
    similarProduct();
    // Update windowWidth on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowModal = (product) => {
    console.log("product--->", product);
    setSelectedProduct(product);
    const pincode = localStorage.getItem("pincode");
    if (pincode) {
      setButtonLabels((prevLabels) => ({
        ...prevLabels,
        [product.product_id]: "Shipment in next 5 working days",
      }));
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const similarProduct = async () => {
    const response = await axios.get(
      "https://swaecommain.swa.co/ecom/jewellery/" +
        props.productId +
        "?country=" +
        countryId
    );
    if (
      response &&
      response.data &&
      response.data.results &&
      response.data.results.status_code === 200
    ) {
      setSimilarProducts(response.data.results.similar_data);
    }
  };

  const prodDetHandler = (prodItem) => {
    history.push({
      pathname:
        "/jewellery/" +
        prodItem.product_id +
        "/" +
        prodItem.thumbnail_colour_id +
        "/" +
        prodItem.product_name,
      state: { data: prodItem },
    });
  };

  var settings = {
    dots: false,
    infinite: true,
    autoplaySpeed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    initialSlide: 4,
    centerMode: true,
    centerPadding: "10px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          centerMode: true,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode: true,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

          centerMode: true,
          centerPadding: "10px",
        },
      },
    ],
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  console.log("similarProducts", similarProducts);

  return (
    <div style={{ marginTop: "80px" }}>
      <div className="container">
        <div className={Classes.SimilerProductHead}>Similar style</div>
        <div className={Classes.CatList1}>
          <div className="container similetrSliders">
            <div className={Classes.Web}>
              {similarProducts.length < 4 && windowWidth > 576 ? (
                <div
                  className={Classes.CarouselNoCard}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  {similarProducts.map((item, index) => (
                    <div
                      key={index}
                      className={Classes.Offers}
                      onClick={() => prodDetHandler(item)}
                    >
                      <img
                        style={{ width: "245px", height: "205px" }}
                        className={Classes.SlideImage}
                        src={item.thumbnail_image}
                        alt={`catg-${index}`}
                      />

                      <div className={Classes.PriceContainer}>
                        <p className={Classes.SimilerProductPrices}>
                          {Contryname === "India" && (
                            <BiRupee className={Classes.Rupee} />
                          )}
                          {Contryname === "United States" && (
                            <CgDollar className={Classes.Rupee} />
                          )}
                          {Contryname === "United Arab Emirates" && (
                            <span style={{ paddingRight: "5px" }}>AED</span>
                          )}{" "}
                          {item.country_total_price}
                        </p>
                        <p className={Classes.SimilerProductDiscount}>
                          {Contryname === "India" && (
                            <BiRupee className={Classes.Rupee} />
                          )}
                          {Contryname === "United States" && (
                            <CgDollar className={Classes.Rupee} />
                          )}
                          {Contryname === "United Arab Emirates" && (
                            <span style={{ paddingRight: "5px" }}>AED</span>
                          )}{" "}
                          {item.country_total_price}
                        </p>
                      </div>
                      <div>
                        <p
                          className={Classes.checkDate}
                          onClick={() => handleShowModal(item)}
                        >
                          {buttonLabels[item.product_id] ||
                            "Check delivery date"}
                        </p>
                      </div>
                      {/* <CheckDelivery
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleShow={handleShowModal}
                      /> */}
                      <div className={Classes.MainBtns}>
                        <div className={Classes.ParentHoverBtns}>
                          <button className={Classes.tryBtn}>
                            Trial at Home
                          </button>
                          <button className={Classes.buynowbtn}>Buy now</button>
                        </div>
                      </div>
                      {selectedProduct === item && (
                        <CheckDelivery
                          show={showModal}
                          handleClose={handleCloseModal}
                          handleShow={() => handleShowModal(item)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <Slider {...settings} className={Classes.CustomSlider}>
                  {similarProducts.map((item, index) => (
                    <div
                      key={index}
                      className={Classes.Offers}
                      onClick={() => prodDetHandler(item)}
                    >
                      <img
                        className={Classes.SlideImagedesk}
                        src={item.thumbnail_image}
                        alt={`catg-${index}`}
                      />

                      <div className={Classes.PriceContainer}>
                        <p className={Classes.SimilerProductPrices}>
                          {Contryname === "India" && (
                            <BiRupee className={Classes.Rupee} />
                          )}
                          {Contryname === "United States" && (
                            <CgDollar className={Classes.Rupee} />
                          )}
                          {Contryname === "United Arab Emirates" && (
                            <span style={{ paddingRight: "5px" }}>AED</span>
                          )}
                          {item.discount_price
                            ? numberWithCommas(item.discount_price)
                            : numberWithCommas(item.country_total_price)}
                        </p>
                        {item.discount_price && (
                          <p className={Classes.SimilerProductDiscount}>
                            {Contryname === "India" && (
                              <BiRupee className={Classes.Rupee} />
                            )}
                            {Contryname === "United States" && (
                              <CgDollar className={Classes.Rupee} />
                            )}
                            {Contryname === "United Arab Emirates" && (
                              <span style={{ paddingRight: "5px" }}>AED</span>
                            )}{" "}
                            {numberWithCommas(item.country_total_price)}
                          </p>
                        )}
                      </div>
                      {/* <p
                        className={Classes.checkDate}
                        onClick={(event) => {
                          event.stopPropagation();
                         
                        }}
                      >
                        Check delivery date
                      </p> */}
                      <div>
                        <p
                          className={Classes.checkDate}
                          onClick={(event) => {
                            console.log("nithin", item);
                            event.stopPropagation();
                            handleShowModal(item);
                          }}
                        >
                          {buttonLabels[item.product_id] ||
                            "Check delivery date"}
                        </p>
                      </div>
                      {selectedProduct === item && (
                        <CheckDelivery
                          show={showModal}
                          handleClose={handleCloseModal}
                          handleShow={() => handleShowModal(item)}
                        />
                      )}
                      <div className={Classes.MainBtns}>
                        <div className={Classes.ParentHoverBtns}>
                          {/* <button className={Classes.tryBtn}>
                            Try at Home
                          </button> */}
                          <button className={Classes.buynowbtn}>Buy now</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SililerProducts;
