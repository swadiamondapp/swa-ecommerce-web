"use client";
import React from "react";
import { Phone, Mail, Search } from "lucide-react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Swapromise from "../(other)/about-us/aboutcompo/Swapromise";

import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
});

function Contactus() {
  const location = [
    {
      title: "LULU MALL",
      description:
        "Lower Ground Floor, Unit No. LG 08, LuLu Mall, JNTU- Hitech City Road, Kukatpally, Hyderabad, Medchal, Malkajgiri, Telangana, 500072",
      phone: "234567345",
    },
    {
      title: "LULU MALL",
      description:
        "Lower Ground Floor, Unit No. LG 08, LuLu Mall, JNTU- Hitech City Road, Kukatpally, Hyderabad, Medchal, Malkajgiri, Telangana, 500072",
      phone: "234567345",
    },
    {
      title: "LULU MALL",
      description:
        "Lower Ground Floor, Unit No. LG 08, LuLu Mall, JNTU- Hitech City Road, Kukatpally, Hyderabad, Medchal, Malkajgiri, Telangana, 500072",
      phone: "234567345",
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
      place: "1234567890",
    },
  ];
  return (
    <>
      <div
        className={`${inter.className} min-h-screen w-full md:pl-20 pl-2 pr-2 md:pr-0 flex  md:justify-between md:flex-row flex-col bg-zinc-100`}
      >
        <div className="flex flex-col px-5 mt-20">
          <div className="flex flex-col gap-3 justify-center items-center md:items-start pb-5 text-lg-start">
            <span className="text-[16px] font-[400px] text-[#918676]">
              CONTACT US
            </span>
            <p className="font-playfair font-[500px] text-[32px] leading-[100%]">
              Get in touch with us
            </p>
            <div className="flex sm:flex-row gap-6 flex-col ">
              <div className="flex gap-4">
                <img src="/Assets/phone2.svg"></img>
                <span>Toll free number : 1234567890</span>
              </div>
              <div className="flex gap-4">
                <img src="/Assets/mail1.svg" alt="mailbox"></img>
                <span>info@swadiamonds.com</span>
              </div>
            </div>

            <div className="h-12 md:w-[500px]  w-full flex items-center gap-2 px-4 text- border rounded-3xl bg-white">
              <Search size={13} />
              <input
                className="outline-none text-[15px] text-[#334155] placeholder:text-[#334155] w-full"
                type="text"
                placeholder="Search near outlet"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 py-2">
            {location.map((item, index) => (
              <div
                key={index}
                className="bg-white w-full lg:w-[800px] rounded-2xl shadow-sm p-5 flex flex-col gap-2"
              >
                <h1 className="text-[#155658] font-semibold text-[16px] leading-[24px]">
                  {item.title}
                </h1>

                <p className="text-[#334155] font-[400px] text-[16px] leading-[24px] sm:w-[317px] w-full">
                  {item.description}
                </p>

                <div className="flex text-[#155658] font-semibold text-[16px] leading-[24px] gap-2">
                 <img src="/Assets/phone1.svg" alt="phone1"></img>
                  <p>{item.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 min-h-screen relative ">
          <div className="absolute inset-0">
            <Image
              src="/Assets/ringgirl.svg"
              alt="Hand ring"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute top-48 lg:left-16 md:left-10 left-20 bg-white w-[355px] flex flex-col gap-2 p-5 z-1 rounded-2xl ">
            <p className="font-playfair font-[500px] text-[32px] leading-[100%]">
              Let's Talk
            </p>

            {Signup.map((items, index) => (
              <div key={index} className="flex flex-col w-full">
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
      <Swapromise />
    </>
  );
}

export default Contactus;
