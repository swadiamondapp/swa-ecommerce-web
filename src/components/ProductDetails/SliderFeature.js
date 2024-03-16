import React from "react";
import Classes from "../HeaderNew/MainHead.module.css";
import { Carousel } from "antd";
import Sh1 from "../../Assets/SH1.png";
import Sh2 from "../../Assets/PS2.png";
import Sh3 from "../../Assets/PS3.png";
import Sh4 from "../../Assets/PS4.png";

const SliderFeature = () => {
  const similarProducts = [
    {
      desc: "Free shiping",
      image: Sh1,
    },
    {
      desc: "100% Refund",
      image: Sh2,
    },
    {
      desc: "100% Certified jewellery",
      image: Sh3,
    },
    {
      desc: "LifetimeExchange & Buyback",
      image: Sh4,
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
