"use client";

import React from "react";
import Classes from "./banner.module.css";
import { Carousel } from "antd";
import { useRouter } from "next/navigation";
import { useData } from "@/providers/data-provider";

const Banner = (props) => {
  const router = useRouter();
  const { categories, tags } = useData();

  const carouselHandler = (selItem) => {
    if (selItem.is_category === true) {
      const category = categories.find(
        (category) => category.id == selItem.type_id
      );
      router.push(`/${category.name.toLowerCase()}`);
    } else {
      const tag = tags.find((tag) => tag.id == selItem.type_id);
      router.push(`/${tag.name.toLowerCase()}`);
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
