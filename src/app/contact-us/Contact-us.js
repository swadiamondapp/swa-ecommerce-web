"use client";
import React from "react";

import Swapromise from "../(other)/about-us/aboutcompo/Swapromise";

import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
});

function Contactus() {
  return (
    <>
      <div
        className={`${inter.className} min-h-screen w-full bg-zinc-100 pl-4 lg:pl-20 flex flex-col md:flex-row justify-between`}
      >
        {/* LEFT SIDE */}
        <div className="flex flex-col p-5 mt-20 w-full">
          <div className="flex flex-col gap-2 justify-center items-center md:items-start pb-5">
            <span className="text-sm font-normal text-[#918676]">
              CONTACT US
            </span>
            <p className="font-playfair font-semibold text-3xl leading-tight">
              Get in touch with us
            </p>

            <div className="flex flex-col lg:flex-row gap-6 mt-4 items-start lg:items-center">
              <div className="flex items-center gap-4 ">
                <img src="/Assets/phone2.svg" alt="Phone icon" />
                <span className="text-base">
                  Toll free number : 1800 257 8600
                </span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/Assets/mail1.svg" alt="Email icon" />
                <span className="text-base">info@swadiamonds.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="relative w-full min-h-screen md:w-[70%] md:left-0 bg-slate-400 bg-[url('/Assets/ringgirl.svg')] bg-cover bg-right bg-no-repeat p-4"
        />
      </div>
      <Swapromise />
    </>
  );
}

export default Contactus;
