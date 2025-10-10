"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";



const Ringcomponet = () => {
    const [countryId, setCountryId] = useState(null);
  
 useEffect(() => {
    const storedCountryId = localStorage.getItem("id");
    setCountryId(storedCountryId);
  }, []);
  return (
    <>
    <Link  href="/rings" >
      <div className="w-full lg:h-[540px] md:h-[1010px] h-[670px] bg-[#F5FFFD] " >
        <div className="max-w-container mx-auto h-full flex flex-row justify-around items-center md:items-end lg:items-center pb-10">

          <div>
          <div className="text-center text-md-start lg:text-left">
            <p className="text-black lg:text-[56px] text-[32px] font-medium md:leading-[63px] leading-[40px] font-playfair pb-3">
               Fleur Trio <br /> Diamond Ring
             </p>
             <p className="lg:text-[20px] sm:text-[16px] text-[14px]  md:leading-[32px] leading-[25px] text-[#334155]">
              A graceful blend of simplicity and charm, this <br />
              ring features three delicate diamond-studded floral motifs <br />
              symbolizing elegance, love, and harmony.
             </p>
          </div>
           <div className="relative lg:hidden flex justify-center w-full">
              <div>
                 <Image
            src="/try/silverring.png"
            width={403.64}
            height={394.51}
            className="mx-auto lg:w-[403.64px] lg:h-[394.51px] w-[270.5px] h-[264.46px]"
            alt="ring"
          />
              </div>
           
             </div>
          <div className="pt-[56.18px] lg:pt-[26.18px] flex lg:flex-row flex-col-reverse items-center">
               {/* <button className="flex items-center gap-2 bg-[#002D31] text-white h-[56px] lg:px-[20.88px] px-[35px] rounded-lg lg:mr-7">
                 ADD TO CART
                 <Image
                  src="/try/kartwhite.svg"
                  width={24}
                  height={24}SUBSCRIBE
                  alt="cart"
                />
              </button> */}
       
              <p className={countryId === "2"?"text-[32px] leading-[40px] font-semibold py-2 text-black":"hidden"}>
                ₹ 21,500
              </p>
            </div>
             </div>
             <div className="relative hidden lg:block">
               <Image
            src="/try/silverring.png"
            width={600}
            height={600}
            className="mr-[5rem]"
            alt="ring"
          />
          
             </div>

        </div>
      </div>
    </Link>
     <Link  href="/rings" >
      <div className="w-full lg:h-[540px] md:h-[720px] h-[670px]">
        <div className="max-w-container mx-auto h-full flex flex-row-reverse justify-around items-center">
         
       <div>
          <div className="text-center text-md-start lg:text-left">
            <p className="lg:text-[56px] text-[32px] md:leading-[63px] leading-[40px] font-medium font-playfair pb-3  text-black">
               Velisse Aurelia <br /> Diamond Ring


             </p>
             <p className="lg:text-[20px] sm:text-[16px] text-[13.5px]  md:leading-[32px] leading-[25px] text-[#334155]">
              A symbol of elegance and strength, this dual-band <br />
              ring features a diamond-studded “V” that radiates golden grace. <br />
               Inspired by the name Aurelia, it reflects timeless beauty.
             </p>
          </div>
           <div className="relative lg:hidden flex justify-center w-full">
              <div>
                 <Image
            src="/try/rosering.png"
            width={403.64}
            height={394.51}
            className="mx-auto lg:w-[403.64px] lg:h-[394.51px] w-[270.5px] h-[264.46px]"
            alt="ring"
          />
              </div>
          
             </div>
            <div className="pt-[56.18px] lg:pt-[26.18px] flex lg:flex-row flex-col-reverse items-center">
               {/* <button className="flex items-center gap-2 bg-[#002D31] text-white h-[56px] lg:px-[20.88px] px-[35px] rounded-lg lg:mr-7">
                 ADD TO CART
                 <Image
                  src="/try/kartwhite.svg"
                  width={24}
                  height={24}
                  alt="cart"
                />
              </button> */}

              <p className={countryId === "2"?"text-[32px] leading-[40px] font-semibold py-2 text-black":"hidden"}>
                ₹ 24,300
              </p>
            </div>
             </div>
             <div className="relative hidden lg:block">
               <Image
            src="/try/rosering.png"
            width={600}
            height={600}
            className="mr-[5rem]"
            alt="ring"
          />
             </div>

        </div>
      </div>
      </Link>
    </>
  );
};

export default Ringcomponet;


