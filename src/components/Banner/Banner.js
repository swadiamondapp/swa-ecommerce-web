import React from "react";
import Classes from "./Banner.module.css";
import { Carousel } from "antd";
import { useHistory } from "react-router-dom";

const Banner = (props) => {
  const history = useHistory();

  const carouselHandler = (selItem) => {
    console.log(selItem);

    if (selItem.is_category === true) {
      history.push({
        pathname: "/new_arrivel",
        state: { data: selItem.type_id },
      });
    } else {
      history.push({
        pathname: "/new_arrivel",
        state: { octnId: selItem.type_id, data: "occation" },
      });
    }
  };

  return (
    <React.Fragment>
      <div className={`${Classes.web} Bannerswa`}>
        <Carousel autoplay>
          {props.banners.map((item, index) => {
            return (
              <div onClick={() => carouselHandler(item)} key={index}>
                <img
                  className={Classes.SlideImage}
                  src={item.corousal_image}
                  alt={item.corousal_name}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className={Classes.mob}>
        <Carousel autoplay>
          {props.mob.map((item, index) => {
            return (
              <div onClick={() => carouselHandler(item)} key={index}>
                <img
                  className={Classes.SlideImage}
                  src={item.corousal_image}
                  alt={item.corousal_name}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </React.Fragment>
  );
};

export default Banner;
