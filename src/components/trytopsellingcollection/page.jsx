import React from "react";
import Image from "next/image";

const TopSellingCollection = () => {
  return (
    <div className="w-full lg:h-[1080px] bg-[#F8F4E9]  md:h-[900px] sm:h-[890px] h-[849px] block">
         <Image
        src="/try/ambasedorbaner.svg"
        className="w-screen lg:h-[412.54px] md:h-[300px] sm:h[250px] h-[170px] object-cover  hidden md:block"
        width={1920}
        height={412.54}
        alt="banner"
      /> 

      <div className="max-w-container mx-auto lg:h-[667.46px] bg-[#F8F4E9] sm:h-full relative md:h-full h-full">
          <div>
       <Image
        src="/try/ambasedorbaner.svg"
        className="w-screen lg:h-[412.54px] md:h-[300px] sm:h[250px] h-[170px] object-cover  md:hidden"
        width={1920}
        height={412.54}
        alt="banner"
      />
     </div>
        <Image
          src="/try/ambasadorgirl.png"
          className="absolute bottom-0 z-10
             w-[310px]   /* default (xs) */
             sm:w-[340px] 
             md:w-[390px] 
             left-1/2 -translate-x-1/2 transform  /* center on xs–md */
             lg:left-auto lg:translate-x-0 lg:right-24 lg:transform-none 
             lg:w-[652px] lg:h-[832.97px]"
             alt="ambasedor girl"
          width={652}
          height={832.97}
        />

        <div className="top-[20.41px] lg:-top-[280px] md:-top-[280px] absolute lg:left-[8.41px] w-fit  lg:block  left-1/2 -translate-x-1/2 transform lg:translate-x-0 text-center text-lg-start lg:text-left">
          <p className="text-white text-[18px] font-extralight leading-[24px] tracking-[8%] pb-[28.21px]">
            TOP SELLING COLLECTION
          </p>
          <div className="flex flex-row justify-between md:w-[590px] sm:w-[340px] w-[290px]  h-[160.65px]">
            <Image
              src="/try/ring copy.jpg"
              className="w-[88.1px] h-[80px] md:w-[176.92px] md:h-[160.65px] rounded-xl"
              width={176.92}
              height={160.65}
              alt="ring"
            />
            <Image
              src="/try/bracelet copy.jpg"
              className="w-[88.1px] h-[80px] md:w-[176.92px] md:h-[160.65px] rounded-xl"
              width={176.92}
              height={160.65}
              alt="ring"
            />
            <Image
              src="/try/necklace copy.jpg"
              className="w-[88.1px] h-[80px] md:w-[176.92px] md:h-[160.65px] rounded-xl"
              width={176.92}
              height={160.65}
              alt="chain"
            />
          </div>
        </div>
        <div
  className="space-y-[32px] absolute 
             lg:top-[172.48px] lg:left-[343.41px] 
             w-full max-w-[454px] 
             left-1/2 -translate-x-1/2 transform 
             md:text-center sm:text-center text-center text-lg-start
             md:top-[4rem] lg:text-left">
  <p className="text-[#918676] lg:text-[20px] md:text-[30px] leading-[24px] font-[400] tracking-[0.04rem] pt-[.5rem] md:pt-0 text-[14px] sm:text-[18px] md:pb-[1.25rem] ">
    BRAND AMBASSADOR
  </p>

  <div className=" w-full h-auto flex items-center justify-center">
    <p className="sm:text-[48px] sm:w-[510px] w-[400px] text-[32px] md:text-[48px] leading-none font-[400] font-british">
      Preity G Zinta
    </p>
  </div>

  <p className="sm:text-[16px] text-[14px] px-4 sm:px-0 leading-[24px] sm:pt-[1rem] pt-[.5rem] font-[400] italic lg:hidden ">
We are proud to welcome Bollywood star Preity G Zinta as the new Brand Ambassador for SWA Diamonds. A timeless icon of grace, trust, and charisma, Preity perfectly captures the spirit of SWA Diamonds — radiating brilliance, confidence, and elegance. Her enduring stardom and authentic charm embody our vision of modern sophistication with a touch of Bollywood glamour.
  </p>

  <p className="text-[16px] leading-[24px] font-[400] italic hidden lg:block  lg:pt-[1.25rem]">
We are proud to welcome Bollywood star Preity G Zinta as the new Brand Ambassador for SWA Diamonds. A timeless icon of grace, trust, and charisma, Preity perfectly captures the spirit of SWA Diamonds — radiating brilliance, confidence, and elegance. Her enduring stardom and authentic charm embody our vision of modern sophistication with a touch of Bollywood glamour.
  </p>
</div>

      </div>
    </div>
  );
};

export default TopSellingCollection;
