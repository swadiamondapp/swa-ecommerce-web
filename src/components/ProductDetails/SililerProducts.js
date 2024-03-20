import React, { useState, useEffect } from "react";
import Classes from "../HeaderNew/MainHead.module.css";
import productimage from "../../Assets/BringTheParty1.png";
import { Carousel } from "antd";
import { BiRupee } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import * as Urls from "../../Urls";
import axios from "axios";

const SililerProducts = (props) => {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    similarProduct();
  }, []);

  const similarProduct = async () => {
    const response = await axios.get(
      "https://swaprdnecomnew.zinfog.in/ecom/products/" + props.productId
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
                  {similarProducts.map((item, index) => (
                    <div key={index} className={Classes.Offers}>
                      <img
                        style={{ width: "100%", height: "205px" }}
                        className={Classes.SlideImage}
                        src={item.thumbnail_image}
                        alt={`catg-${index}`}
                      />
                      <p className={Classes.SimilarProductName}>
                        {item.category.name}
                      </p>
                      <p className={Classes.SimilerProductSku}>
                        SKU : {item.sku}
                      </p>
                      <div className={Classes.PriceContainer}>
                        <p className={Classes.SimilerProductPrices}>
                          &#x20B9; {item.total_price_final}
                        </p>
                        <p className={Classes.SimilerProductDiscount}>
                          &#x20B9; {item.total_price_final}
                        </p>
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
