import React from "react";
import Image from "next/image";

const Ringcomponet = () => {
  return (
    <>
      <div className="w-full lg:h-[540px] md:h-[1010px] h-[670px] bg-[#F5FFFD]">
        <div className="max-w-container mx-auto h-full flex flex-row justify-around items-center md:items-end lg:items-center pb-10">

          <div>
          <div className="text-center text-md-start lg:text-left">
            <p className="lg:text-[56px] text-[32px] font-medium md:leading-[63px] leading-[40px] font-playfair pb-3">
               Queen elizabath <br />
               coral Ring
             </p>
             <p className="lg:text-[20px] text-[16px] md:leading-[32px] leading-[25px] text-[#334155]">
               With timeless charm and radiant grace, Preity <br />{" "}
               Zinta embodies the spirit of our jewellery — where <br /> every
               diamond tells a story,
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
                  height={24}
                  alt="cart"
                />
              </button> */}

              <p className="text-[32px] leading-[40px] font-semibold py-2">
                ₹ 75000
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
      
      <div className="w-full lg:h-[540px] md:h-[720px] h-[670px]">
        <div className="max-w-container mx-auto h-full flex flex-row-reverse justify-around items-center">
         
       <div>
          <div className="text-center text-md-start lg:text-left">
            <p className="lg:text-[56px] text-[32px] md:leading-[63px] leading-[40px] font-medium font-playfair pb-3 ">
               Dalia Rose <br /> luxuriea ring
             </p>
             <p className="lg:text-[20px] text-[16px] md:leading-[32px] leading-[25px] text-[#334155]">
               With timeless charm and radiant grace, Preity <br />{" "}
               Zinta embodies the spirit of our jewellery — where <br /> every
               diamond tells a story,
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

              <p className="text-[32px] leading-[40px] font-semibold py-2">
                ₹ 75000
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
    </>
  );
};

export default Ringcomponet;


