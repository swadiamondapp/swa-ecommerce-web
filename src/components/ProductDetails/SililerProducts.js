import React from "react";
import Classes from "../HeaderNew/MainHead.module.css";
import productimage from "../../Assets/BringTheParty1.png";
import { Carousel } from "antd";
import { BiRupee } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";

const SililerProducts = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <div className="container">
        <div className={Classes.SimilerProductHead}>Similar style</div>
        <div className={Classes.CatList1}>
          <div className="container">
            <div className={Classes.Web}>
              <div className={Classes.CarouselCards}>
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
                        slidesToShow: 5, // Set the number of slides to display on tablets
                      },
                    },
                    {
                      breakpoint: 991,
                      settings: {
                        slidesToShow: 5, // Set the number of slides to display on tablets
                      },
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 1, // Set the number of slides to display on mobile devices
                      },
                    },
                  ]}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
                    <div key={index} className={Classes.Offers}>
                      <img
                        style={{ width: "100%", height: "205px" }}
                        className={Classes.SlideImage}
                        src={productimage}
                        alt={`catg-${index}`}
                      />
                      <p className={Classes.SimilerProductPrices}>
                        <BiRupee className={Classes.Rupee} /> 27000
                      </p>
                      <div className={Classes.ParentAddToCartCard2}>
                        <div className={Classes.addToCartCard2}>
                          ADD TO CART <IoCartOutline color="#fff" size={20} />
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SililerProducts;
