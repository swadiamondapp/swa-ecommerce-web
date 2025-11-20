"use client";
import React from "react";
import { Search } from "lucide-react";
import Image from "next/image";

import Swapromise from "../(other)/about-us/aboutcompo/Swapromise";

import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
});

function Contactus() {
  const location = [
    {
      title: "LULU MALL HYDERABAD",
      description:
        "Lower Ground Floor, Unit No. LG 08, LuLu Mall, JNTU- Hitech City Road, Kukatpally, Hyderabad, Medchal, Malkajgiri, Telangana, 500072",
      phone: "79 9434 3002",
    },
    {
      title: "LULU MALL HYDERABAD",
      description:
        "Lower Ground Floor, Unit No. LG 08, LuLu Mall, JNTU- Hitech City Road, Kukatpally, Hyderabad, Medchal, Malkajgiri, Telangana, 500072",
      phone: "79 9434 3002",
    },
    {
      title: "LULU MALL HYDERABAD",
      description:
        "Lower Ground Floor, Unit No. LG 08, LuLu Mall, JNTU- Hitech City Road, Kukatpally, Hyderabad, Medchal, Malkajgiri, Telangana, 500072",
      phone: "79 9434 3002",
    },
  ];
  const Signup = [
    {
      labals: "Name",
      place: "Name",
    },
    {
      labals: "Email ",
      place: "swa@gmail.com",
    },
    {
      labals: "Phone Number",
      place: "79 9434 3002",
    },
  ];
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

            <div className="h-12 w-full sm:w-[355px] md:w-[350px] lg:w-[500px] flex items-center gap-2 px-4 border rounded-3xl bg-white mt-6">
              <Search size={13} />
              <input
                className="outline-none text-sm text-[#334155] placeholder:text-[#334155] w-full"
                type="text"
                placeholder="Search nearby outlet"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 py-2">
            {location.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-2"
              >
                <h2 className="text-[#155658] font-semibold text-base">
                  {item.title}
                </h2>
                <p className="text-[#334155] font-normal text-base sm:w-[317px] w-full">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-[#155658] font-semibold text-base">
                  <img src="/Assets/phone1.svg" alt="Phone icon" />
                  <p>{item.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div
          className="relative w-full min-h-screen md:w-[70%] md:left-0 flex justify-center items-center bg-slate-400 bg-[url('/Assets/ringgirl.svg')] bg-cover bg-right bg-no-repeat p-4"
        >
          <div className="bg-white sm:w-[355px] lg:w-[350px] flex flex-col gap-2 p-5 z-1 rounded-2xl">
            <p className="font-playfair font-[500px] text-[32px] leading-[100%]">
              Let's Talk
            </p>

            {Signup.map((items, index) => (
              <div key={index} className="flex flex-col w-full gap-1 mt-3">
                <label className="text-[#334155] text-[15px] leading-[20px] font-[500px] ">
                  {items.labals}
                </label>

                <div className="bg-white border border-gray-200 rounded-xl ">
                  <input
                    type="text"
                    className="outline-none rounded-2xl w-full  p-3 placeholder:text-[#64748B] placeholder:text-[16px] font-[400px]"
                    placeholder={items.place}
                  />
                </div>
              </div>
            ))}

            <div className="flex flex-col w-full p-2">
              <label className="text-[#334155] text-[15px] leading-[20px] font-[500px]">
                Query
              </label>

              <div className="bg-white border border-gray-200 rounded-xl flex">
                <textarea
                  className="outline-none rounded-2xl w-full font-medium p-2 placeholder:text-[#64748B] placeholder:text-[16px] resize-none"
                  placeholder="Enter your message"
                  rows={3}
                ></textarea>
              </div>
            </div>

            <button className="bg-[#002D31] h-10 w-full rounded-lg text-white text-[16px] flex justify-center items-center mt-2 gap-2">
              SUBMIT
              <img src="/Assets/arrows.svg" alt="arrows"></img>
            </button>
          </div>
        </div>
      </div>
      <Swapromise className="bg-white" />
    </>
  );
}

export default Contactus;
