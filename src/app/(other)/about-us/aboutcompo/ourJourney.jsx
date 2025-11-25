import React from "react";
import Image from "next/image";

function OurJourney() {
  return (
    <div className="w-full min-h-screen bg-[#F8F4E9] relative">
      <div className="flex justify-center items-center flex-col w-full pt-20 ">
        <h1 className="font-playfair font-[500px] lg:text-[56px] sm:text-[36px] leading-[100%] text-black">
          Our Journey
        </h1>
        <p className="font-[400px] text-[#334155] leading-[33px] lg:text-[24px] sm:text-[16px] text-[13.5px]">
          celebrating heritage. Redefining Luxury
        </p>
      </div>

      <div className=" w-full mt-[120px]">
        {/* IMAGE TO POSITION */}
        <div className="absolute lg:left-[600px] lg:top-[290px]">
          <Image
            src="/Assets/zinda2.svg"
            alt="Swarotate"
            height={222}
            width={317}
            className=""
          />
          <div className="border-b-2 border border-gray-500 w-[70px] absolute rotate-90 lg:left-36">
            {" "}
          </div>
        </div>

        {/* THE DASHED LINE */}
        <div className="flex justify-center px-20 mt-[400px]">
          <div className=" relative border-b-2 border-dashed border-gray-500 w-full"></div>
          <div className="w-3 h-3 bg-[#004247] absolute  left-[773px] rounded-3xl bottom-[150px]"></div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-2 flex-col ">
        {" "}
        <h1>2019</h1>
        <p className="text-center">
          SWA Diamonds was founded in <br></br>
          2019 by CAPESTONE Ventures Pvt Ltd,{" "}
        </p>
      </div>
    </div>
  );
}

export default OurJourney;
