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
        className={`${inter.className} relative w-full bg-zinc-100 flex flex-col md:h-[70vh] md:max-h-[560px]`}
      >
        <div className="max-w-container mx-auto px-4 flex flex-1 items-center justify-center md:justify-start w-full pt-16 pb-8 md:h-full md:pt-20 md:pb-12">
          <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left">
            <span className="text-sm font-normal tracking-wide text-[#918676]">
              CONTACT US
            </span>
            <p className="font-playfair font-semibold text-3xl md:text-4xl leading-tight">
              Get in touch with us
            </p>

            <div className="flex flex-col gap-5 mt-4 mb-12">
              <a
                href="tel:18002578600"
                className="flex items-center gap-4 text-[#334155]"
              >
                <img
                  src="/Assets/phone2.svg"
                  alt=""
                  className="h-6 w-6 shrink-0"
                />
                <span className="text-base">
                  Toll free number : 1800 257 8600
                </span>
              </a>
              <a
                href="mailto:info@swadiamonds.com"
                className="flex items-center gap-4 text-[#334155]"
              >
                <img
                  src="/Assets/mail1.svg"
                  alt=""
                  className="h-6 w-6 shrink-0"
                />
                <span className="text-base">info@swadiamonds.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[280px] md:absolute md:inset-y-0 md:right-0 md:w-[40%] md:h-full bg-slate-400 bg-[url('/Assets/ringgirl.svg')] bg-cover bg-center bg-no-repeat" />
      </div>
      <Swapromise />
    </>
  );
}

export default Contactus;
