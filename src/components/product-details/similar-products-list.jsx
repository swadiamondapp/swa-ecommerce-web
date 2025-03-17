"use client";

import { useState, useEffect } from "react";
import Classes from "../header/main-header.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiRupee } from "react-icons/bi";
import { CgDollar } from "react-icons/cg";
import Slider from "react-slick";
import Image from "next/image";
import CheckDelivery from "@/components/check-delivery/check-delivery";
import { useCountry } from "@/providers/country-provider";
import { useRouter } from "next/navigation";

function SimilarProductsList({ products }) {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const [buttonLabels, setButtonLabels] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { countryName } = useCountry();
  const [pincode, setPincode] = useState(null);
  useEffect(() => {
    const pincode = localStorage.getItem("pincode");
    setPincode(pincode);
  });
  useEffect(() => {
    setWindowWidth(window?.innerWidth);
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const prodDetHandler = (prodItem) => {
    localStorage.setItem(
      "productDetails",
      JSON.stringify({
        id: prodItem.product_id,
        color: prodItem.colour_id,
        name: prodItem.product_name,
      })
    );
    router.push(`/jewellery/${prodItem.alias}`);
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    // const pincode = localStorage.getItem("pincode");
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

  const PriceDisplay = ({ price, className }) => (
    <p className={className}>
      {countryName === "India" && <BiRupee className={Classes.Rupee} />}
      {countryName === "United States" && (
        <CgDollar className={Classes.Rupee} />
      )}
      {countryName === "United Arab Emirates" && (
        <span style={{ paddingRight: "5px" }}>AED</span>
      )}{" "}
      {numberWithCommas(price)}
    </p>
  );

  const ProductCard = ({ item, index }) => (
    <div
      key={index}
      className={Classes.Offers}
      onClick={() => prodDetHandler(item)}
    >
      <img
        width={213}
        height={213}
        className={Classes.SlideImagedesk}
        src={item.thumbnail_image}
        alt={`catg-${index}`}
      />

      <div className={Classes.PriceContainer}>
        <PriceDisplay
          price={item.discount_price || item.country_total_price}
          className={Classes.SimilerProductPrices}
        />
        {item.discount_price && (
          <PriceDisplay
            price={item.country_total_price}
            className={Classes.SimilerProductDiscount}
          />
        )}
      </div>

      <div>
        <p
          className={Classes.checkDate}
          onClick={(event) => {
            event.stopPropagation();
            handleShowModal(item);
          }}
        >
          {buttonLabels[item.product_id] || "Check delivery date"}
        </p>
      </div>

      {selectedProduct === item && (
        <div onClick={(e) => e.stopPropagation()}>
          <CheckDelivery
            show={showModal}
            handleClose={handleCloseModal}
            handleShow={() => handleShowModal(item)}
          />
        </div>
      )}

      <div className={Classes.MainBtns}>
        <div className={Classes.ParentHoverBtns}>
          <button className={Classes.buynowbtn}>Buy now</button>
        </div>
      </div>
    </div>
  );

  if (products.length < 4 && windowWidth > 576) {
    return (
      <div
        className={Classes.CarouselNoCard}
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {products.map((item, index) => (
          <ProductCard key={index} item={item} index={index} />
        ))}
      </div>
    );
  }

  return (
    <Slider {...settings} className={Classes.CustomSlider}>
      {products.map((item, index) => (
        <ProductCard key={index} item={item} index={index} />
      ))}
    </Slider>
  );
}

export default SimilarProductsList;
