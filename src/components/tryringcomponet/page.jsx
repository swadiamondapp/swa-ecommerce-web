import React from "react";
import Image from "next/image";

const Ringcomponet = () => {
  return (
    <>
      <div className="w-full lg:h-[540px] md:h-[1010px] h-[670px] bg-[#F5FFFD]">
        <div className="max-w-container mx-auto h-full flex flex-row justify-around items-center md:items-end lg:items-center pb-10">

          <div>
          <div className="text-center lg:text-left">
            <p className="lg:text-[56px] text-[32px] font-medium font-playfair">
               Queen elizabath <br />
               coral Ring
             </p>
             <p className="lg:text-[20px] text-[16px] leading-[32px]">
               With timeless charm and radiant grace, Preity <br />{" "}
               Zinta embodies the spirit of our jewellery — where <br /> every
               diamond tells a story,
             </p>
          </div>
           <div className="relative lg:hidden flex justify-center w-full">
              <div>
                 <Image
            src="/try/queenring.svg"
            width={403.64}
            height={394.51}
            className="mx-auto lg:w-[403.64px] lg:h-[394.51px] w-[270.5px] h-[264.46px]"
            alt="ring"
          />
              </div>
           <Image
            src="/try/ringshadow.svg"
            width={222.02}
            height={23.79}
            className="absolute top-[9rem] left-[5rem]"
            alt="shadow"
          />
             </div>
          <div className="pt-[56.18px] flex lg:flex-row flex-col-reverse items-center">
               <button className="flex items-center gap-2 bg-[#002D31] text-white h-[56px] lg:px-[20.88px] px-[35px] rounded-lg lg:mr-7">
                 ADD TO CART
                 <Image
                  src="/try/kartwhite.svg"
                  width={24}
                  height={24}
                  alt="cart"
                />
              </button>

              <p className="text-[32px] leading-[40px] font-semibold py-2">
                ₹ 75000
              </p>
            </div>
             </div>
             <div className="relative hidden lg:block">
               <Image
            src="/try/queenring.svg"
            width={403.64}
            height={394.51}
            className="mr-[5rem]"
            alt="ring"
          />
           <Image
            src="/try/ringshadow.svg"
            width={222.02}
            height={23.79}
            className="absolute top-[18rem] left-[5rem]"
            alt="shadow"
          />
             </div>

        </div>
      </div>
      
      <div className="w-full lg:h-[540px] md:h-[720px] h-[670px]">
        <div className="max-w-container mx-auto h-full flex flex-row-reverse justify-around items-center">
         
       <div>
          <div className="text-center lg:text-left">
            <p className="lg:text-[56px] text-[32px] font-medium font-playfair">
               Dalia Rose <br /> luxuriea ring
             </p>
             <p className="lg:text-[20px] text-[16px] leading-[32px]">
               With timeless charm and radiant grace, Preity <br />{" "}
               Zinta embodies the spirit of our jewellery — where <br /> every
               diamond tells a story,
             </p>
          </div>
           <div className="relative lg:hidden flex justify-center w-full">
              <div>
                 <Image
            src="/try/rosering.svg"
            width={403.64}
            height={394.51}
            className="mx-auto lg:w-[403.64px] lg:h-[394.51px] w-[270.5px] h-[264.46px]"
            alt="ring"
          />
              </div>
           <Image
            src="/try/ringshadow.svg"
            width={222.02}
            height={23.79}
            className="absolute top-[9rem] left-[5rem]"
            alt="shadow"
          />
             </div>
            <div className="pt-[56.18px] flex lg:flex-row flex-col-reverse items-center">
               <button className="flex items-center gap-2 bg-[#002D31] text-white h-[56px] lg:px-[20.88px] px-[35px] rounded-lg lg:mr-7">
                 ADD TO CART
                 <Image
                  src="/try/kartwhite.svg"
                  width={24}
                  height={24}
                  alt="cart"
                />
              </button>

              <p className="text-[32px] leading-[40px] font-semibold py-2">
                ₹ 75000
              </p>
            </div>
             </div>
             <div className="relative hidden lg:block">
               <Image
            src="/try/rosering.svg"
            width={403.64}
            height={394.51}
            className="mr-[5rem]"
            alt="ring"
          />
           <Image
            src="/try/ringshadow.svg"
            width={222.02}
            height={23.79}
            className="absolute top-[18rem] left-[5rem]"
            alt="shadow"
          />
             </div>

        </div>
      </div>
    </>
  );
};

export default Ringcomponet;


