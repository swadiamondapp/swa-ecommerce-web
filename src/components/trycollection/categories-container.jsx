"use client";
import React, { useRef } from "react";
import Image from "next/image";
import "./page.css";
import { LuChevronRight } from "react-icons/lu";

const CategoriesContainer = ({ children }) => {
  let containerRef = useRef(null);

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full lg:h-[44.56rem] md:h-[44.56rem] h-[22.875rem] bg-[#FEFDFB] ">
      <div className="lg:max-w-[84.20%] mx-auto h-full  relative">
        <Image
          src="/try/collectiontopProp.svg"
          width={309.95}
          height={272.61}
          alt="collectiontopProp"
          className="hidden lg:block absolute z-10 
             lg:-top-[8%] lg:left-[90%] 
             lg:w-[16.1%] lg:h-[61.2%] 
             md:top-[1.12rem] md:left-[90.23125rem] 
             sm:top-[1.12rem] sm:left-[90.23125rem]"
        />

        <Image
          src="/try/collectionbottomProp.svg"
          width={242.31}
          height={213.13}
          alt="collectionbottomProp"
          className="hidden lg:block absolute 
             lg:top-[52.8%] lg:-left-[3%] 
             lg:w-[12.6%] lg:h-[47.8%] 
             md:top-[28.86875rem] md:-left-[9.51625rem] 
             sm:top-[28.86875rem] sm:-left-[9.51625rem]"
        />

        <div onClick={handleScrollRight} className="sm:hidden absolute bottom-0 right-0 w-10 lg:h-[44.56rem] md:h-[44.56rem] h-[22.875rem] bg-gradient-to-l from-[#e8e3d7] to-transparent flex items-center justify-center z-40">
          <LuChevronRight className="text-[#002D31] text-3xl" />
        </div>
        <div className="collection-container" ref={containerRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CategoriesContainer;
