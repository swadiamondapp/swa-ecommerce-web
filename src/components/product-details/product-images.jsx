"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "react-bootstrap";
import Classes from "./productDetails.module.css";
import Slider from "react-slick";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { useRef, useState } from "react";

const ProductImages = ({
  thumbImg,
  videoSection,
  imageLoading,
  imageUrls,
  videoUrls,
  avgR,
  discount,
  discountPercentage,
  reviewCount,
  bagImg,
  handleReviewClicked,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const largeSliderRef = useRef(null);

  const handleImageClick = (index) => {
    largeSliderRef.current.slickGoTo(index);
    setActiveIndex(index);
  };

  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    // arrows: true,
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
          arrows: true,
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
          arrows: true,
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
          arrows: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="col-md-6 biggersliderimg">
      <div className={`${Classes.Display} ${Classes.StickyDisplay}`}>
        <div className="container">
          <div className="row">
            <div className={`col-md-10 ${Classes.MobProductDetails2}`}>
              {!videoSection && (
                <>
                  <div className={Classes.ImageWishList}>
                    {imageLoading && !thumbImg && (
                      <div className="card">
                        <div className="card-image">
                          <div id="image" className="skeleton-loader"></div>
                        </div>
                      </div>
                    )}
                    {imageUrls.length === 1 ? (
                      <div className="ParentSlide">
                        {imageUrls.map((item, index) => {
                          return (
                            <div>
                              {discount && discountPercentage && (
                                <div className={Classes.Discount}>
                                  <div className={Classes.Number}>
                                    {discountPercentage + "% DISCOUNT"}
                                  </div>
                                </div>
                              )}
                              <img
                                className={Classes.Mobsliderbig}
                                src={item}
                                alt={`Slide ${index}`}
                                // width={100}
                                // height={100}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="ParentSlide">
                        <Slider
                          {...settings}
                          ref={largeSliderRef}
                          key={imageUrls}
                        >
                          {imageUrls.map((item, index) => {
                            return (
                              <div>
                                {discount && discountPercentage && (
                                  <div className={Classes.Discount}>
                                    <p className={Classes.Number}>
                                      {discountPercentage + "% DISCOUNT"}
                                    </p>
                                  </div>
                                )}
                                <img
                                  style={{ outline: "none" }}
                                  className={Classes.Mobsliderbig}
                                  src={item}
                                  alt={`Slide ${index}`}
                                  width={100}
                                  height={100}
                                />
                              </div>
                            );
                          })}
                          {videoUrls.map((item) => (
                            <div
                            // style={{
                            //   width: "429px",
                            //   position: "relative",
                            //   overflow: "hidden",
                            //   height: "389px",
                            // }}
                            >
                              <video
                                className="videoParentslider"
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
                    )}

                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      className={Classes.rateStar8}
                      onClick={handleReviewClicked}
                    >
                      {parseFloat(avgR).toFixed(0)}
                      <MdOutlineStarPurple500
                        className={Classes.starrate8}
                      />{" "}
                      {reviewCount}
                    </div>
                  </div>
                </>
              )}

              {videoSection && (
                <div className={Classes.ImageWishList1}>
                  <video
                    className="Vediosec"
                    src={thumbImg}
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
                  {bagImg.map((url, index) => {
                    const isActive = activeIndex === index;

                    if (
                      (url && url.endsWith(".jpg")) ||
                      (url && url.endsWith(".jpeg")) ||
                      (url && url.endsWith(".png")) ||
                      (url && url.endsWith(".webp"))
                    ) {
                      return (
                        <img
                          onClick={() => handleImageClick(index)}
                          className={`${
                            isActive ? Classes.selectedOptionColor : ""
                          }`}
                          key={index}
                          src={url}
                          alt={`Media ${index}`}
                          //   width={100}
                          //   height={100}
                        />
                      );
                    } else if (url && url.endsWith(".mp4")) {
                      return (
                        <div
                          key={index}
                          className="relative"
                        >
                          <video
                            className={Classes.smallVideos}
                            playsInline
                            muted
                            onClick={() => handleImageClick(index)}
                          >
                            <source src={url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <BsFillPlayFill
                            className={Classes.playbtn}
                            onClick={() => handleImageClick(index)}
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)"
                            }}
                          />
                        </div>
                      );
                    } else {
                      return <p key={index}>Unknown media type</p>;
                    }
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Classes.Slider}>
        <Carousel>
          {bagImg.map((item, index) => {
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
  );
};

export default ProductImages;
