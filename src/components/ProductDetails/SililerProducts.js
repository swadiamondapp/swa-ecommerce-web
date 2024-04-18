import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Classes from "../HeaderNew/MainHead.module.css";
import productimage from "../../Assets/BringTheParty1.png";
import { Carousel } from "antd";
import { BiRupee } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import * as Urls from "../../Urls";
import axios from "axios";
import Slider from "react-slick";

const SililerProducts = (props) => {
  const history = useHistory();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(5);

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

  const prodDetHandler = (prodItem) => {
    history.push({
      pathname:
        "/products/" +
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
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    initialSlide: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div className="container">
        <div className={Classes.SimilerProductHead}>Similar style</div>
        <div className={Classes.CatList1}>
          <div className="container similetrSliders">
            <div className={Classes.Web}>
              {similarProducts.length < 5 ? (
                <div className={Classes.CarouselNoCard} style={{display:'flex',justifyContent:'flex-start'}}>
                  {similarProducts.map((item, index) => (
                    <div
                      key={index}
                      className={Classes.Offers}
                      onClick={() => prodDetHandler(item)}
                    >
                      <img
                        style={{ width: "300px", height: "205px" }}
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
