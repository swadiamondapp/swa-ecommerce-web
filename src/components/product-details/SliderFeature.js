import React from "react";
import Classes from "../header/main-header.module.css";
import { Carousel } from "antd";

const SliderFeature = () => {
  const similarProducts = [
    {
      desc: "Free shipping",
      image: "/Assets/SH1.png",
    },
    {
      desc: "100% Refund",
      image: "/Assets/PS2.png",
    },
    {
      desc: "100% Certified jewellery",
      image: "/Assets/PS3.png",
    },
    {
      desc: "Lifetime Exchange & Buyback",
      image: "/Assets/PS4.png",
    },
  ];
  
  return (
    <div>
      <div
        className={Classes.WebMobSlide}
        style={{ background: "#FCFBF6", padding: "10px 0px" }}
      >
        <div className={Classes.CarouselCards} style={{ marginBottom: "0px" }}>
          <Carousel
            autoplay
            slidesToShow={5}
            dots={false}
            centerMode={true}
            draggable={true}
            centerPadding="5px"
            className={Classes.ResponsiveCarousel}
            responsive={[
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3, // Set the number of slides to display on tablets
                },
              },
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 3, // Set the number of slides to display on tablets
                },
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2, // Set the number of slides to display on mobile devices
                },
              },
            ]}
          >
            {similarProducts.map((item, index) => (
              <div key={index} className={Classes.MobOffersSlide}>
                <img
                  className={Classes.SlideLandingimg}
                  src={item.image}
                  alt={`Product ${index + 1}`}
                />

                <p className={Classes.SimilerProductSku}>{item.desc}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default SliderFeature;
