"use client";

import Features from "@/components/features/features";
import Rating from "@/components/Rating/Rating";
import SliderFeature from "@/components/product-details/SliderFeature";

function RateAndReview(props) {
  return (
    <>
      <Rating />
      <Features />
      <SliderFeature />
    </>
  );
}

export default RateAndReview;
