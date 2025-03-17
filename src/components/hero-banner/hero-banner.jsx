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
          style={{ height: "640px" }}
        >
          <FadeLoader color="#00464d" />
        </div>
      ) : (
        <Banner banners={banner ?? []} tags={tags ?? []} mob={mobBanner ?? []} />
      )}
    </>
  );
}

export default HeroBanner;
