"use client";

import React from "react";
import Classes from "./banner.module.css";
import { Carousel } from "antd";
import { useRouter } from "next/navigation";

const Banner = (props) => {
  const router = useRouter();

  const carouselHandler = (selItem) => {
    if (selItem.is_category === true) {
      router.push(`/new/arrivals?type=${selItem.type_id}`);
    } else {
      router.push(`/new/arrivals?octnId=${selItem.type_id}&data=occation`);
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
