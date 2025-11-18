import React from "react";
import Image from "next/image";

function Manufactor() {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="flex lg:flex-row flex-col w-full min-h-screen items-center md:px-20 gap-20 justify-center py-10 gap-">
        {/* LEFT SIDE */}
        <div className="hidden lg:block text-start lg:mb-[4rem] min-w-[430px]">
          <p className="text-[56px] font-playfair font-[500] ">
            Manufacturing Unit
          </p>
          <p className="text-[20px] mt-[.5rem] font-[400] text-[#334155] leading-[32px]">
            Concept of SWA Diamonds came into being from <br></br>CAPESTONE Ventures Pvt
            Ltd, a leading name in wholesale<br></br> diamond jewellers market, that does
            business with prominent retail jewellers. Many retail jewellers who
            deal only in gold jewellery are reluctant to add diamond jewellery
            to their stock due to certain factors.
          </p>
        </div>
        <div className="block lg:hidden text-center mt-4">
          <p className="text-4xl font-playfair">Manufacturing Unit</p>
          
           <p className="sm:text-[16px] text-[13px] px-2 sm:px-0 leading-[24px] sm:pt-[1rem] pt-[.5rem] font-[400] ">
              Concept of SWA Diamonds came into being from CAPESTONE Ventures Pvt
            Ltd, a leading name in wholesale diamond jewellers market, that does
            business with prominent retail jewellers. Many retail jewellers who
            deal only in gold jewellery are reluctant to add diamond jewellery
            to their stock due to certain factors.
            </p>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex justify-center items-center w-full">
          <Image
            src="/try/Blueprint.svg"
            alt="blueprint"
            height={600}
            width={900}
            className="w-[270.5px] h-[264.46px] lg:h-[600px] lg:w-[900px] sm:w-full "
          />
        </div>
      </div>
    </div>
  );
}

export default Manufactor;
