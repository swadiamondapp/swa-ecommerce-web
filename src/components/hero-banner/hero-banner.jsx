"use client";

import { useEffect } from "react";
import { FadeLoader } from "react-spinners";
import Banner from "./banner";
import { useContext } from "react";
import { DataContext } from "@/providers/data-provider";

function HeroBanner() {
  const { loading, banner, tags, mobBanner } = useContext(DataContext);

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center loader"
          style={{
            width: "100%",
            aspectRatio: "16/5",
            backgroundColor: "#f0f0f0",
          }}
        >
          <FadeLoader color="#00464d" />
        </div>
      ) : (
        <Banner
          banners={banner ?? []}
          tags={tags ?? []}
          mob={mobBanner ?? []}
        />
      )}
    </>
  );
}

export default HeroBanner;
