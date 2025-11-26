import React from "react";
import Image from "next/image";

function BrandZinda() {
  return (
    <div>
      <div className="w-full lg:h-[600px] bg-[#F8F4E9]  md:h-[900px] sm:h-[780px] h-[750px] block">
        <div className="max-w-container mx-auto lg:h-[667.46px] bg-[#F8F4E9] sm:h-full relative md:h-full h-full">
          <Image
            src="/try/1000538381.png"
            className="absolute bottom-0 z-10
             w-[310px]   /* default (xs) */
             sm:w-[340px] 
             md:w-[390px] 
             left-1/2 -translate-x-1/2 transform  /* center on xs–md */
             lg:left-auto lg:translate-x-0 lg:right-24 lg:transform-none 
             lg:w-[500px] lg:h-[600px]"
            alt="ambasedor girl"
            width={652}
            height={832.97}
          />

          <div
            className="space-y-[32px] absolute 
             lg:top-[172.48px] lg:left-[343.41px] 
             w-full max-w-[454px] 
             left-1/2 -translate-x-1/2 transform 
             md:text-center sm:text-center text-center text-lg-start
             md:top-[4rem] lg:text-left"
          >
            <p className="text-[#918676] lg:text-[20px] md:text-[30px] leading-[24px] font-[400] tracking-[0.04rem] pt-[.5rem] md:pt-0 text-[14px] sm:text-[18px] md:pb-[1.25rem] ">
              BRAND AMBASSADOR
            </p>

            <div className=" w-full h-auto flex items-center justify-center">
              <p className="sm:text-[48px] sm:w-[510px] w-[400px] text-[32px] md:text-[48px] lg:text-[60px] leading-none font-[400] font-BrittanySign">
                Preity G. zinta
              </p>
            </div>

            <p className="sm:text-[16px] text-[11px] px-4 sm:px-0 leading-[24px] sm:pt-[1rem] pt-[.5rem] font-[400] italic lg:hidden ">
              We are proud to welcome Bollywood star Preity G Zinta as the new
              Brand Ambassador for SWA Diamonds. A timeless icon of grace,
              trust, and charisma, Preity perfectly captures the spirit of SWA
              Diamonds — radiating brilliance, confidence, and elegance. Her
              enduring stardom and authentic charm embody our vision of modern
              sophistication with a touch of Bollywood glamour.
            </p>

            <p className="text-[16px] leading-[24px] font-[400] italic hidden lg:block  lg:pt-[1.25rem]">
              We are proud to welcome Bollywood star Preity G Zinta as the new
              Brand Ambassador for SWA Diamonds. A timeless icon of grace,
              trust, and charisma, Preity perfectly captures the spirit of SWA
              Diamonds — radiating brilliance, confidence, and elegance. Her
              enduring stardom and authentic charm embody our vision of modern
              sophistication with a touch of Bollywood glamour.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full ">
        <div className="max-w-container mx-auto">
        <Image
          src="/try/Rectangle 687.svg"
          alt="rectangle"
          height={800}
          width={1800}
          className=""
        />
        </div>
      </div>
    </div>
  );
}

export default BrandZinda;
