import React from "react";
import Image from "next/image";

const Ringcomponet = () => {
  return (
    <>
      <div className="w-full h-[540px] bg-[#F5FFFD]">
        <div className="max-w-container mx-auto h-full relative">
          <div className="absolute top-[101.68px] left-[143.41px]">
            <p className="text-[56px] font-medium font-playfair">
              Queen elizabath <br />
              coral Ring
            </p>
            <p className="text-[20px] leading-[32px]">
              With timeless charm and radiant grace, Preity <br />{" "}
              Zinta embodies the spirit of our jewellery — where <br /> every
              diamond tells a story,
            </p>

            <div className="pt-[56.18px] flex flex-row">
              <button className="flex items-center gap-2 bg-[#002D31] text-white h-[56px] px-[20.88px] rounded-lg  mr-7 ">
                ADD TO CART
                <Image
                  src="/try/kartwhite.svg"
                  width={24}
                  height={24}
                  alt="cart"
                />
              </button>

              <p className="text-[32px] leading-[40px] font-semibold py-2  ">
                ₹ 75000
              </p>
            </div>
          </div>
          <Image
            src="/try/queenring.svg"
            width={403.64}
            height={394.51}
            className="absolute top-[72.74px] left-[1012.59px]"
            alt="ring"
          />
           <Image
            src="/try/ringshadow.svg"
            width={222.02}
            height={23.79}
            className="absolute top-[353.71px] left-[1100.74px]"
            alt="shadow"
          />
        </div>
      </div>
      <div className="w-full h-[540px] bg-[#FFFFFF]">
        <div className="max-w-container mx-auto h-full relative">
          <div className="absolute top-[103.38px] left-[820.41px]">
            <p className="text-[56px] font-medium font-playfair">
              Dalia Rose <br />luxuriea ring
            </p>
            <p className="text-[20px] leading-[32px]">
              With timeless charm and radiant grace, Preity <br />{" "}
              Zinta embodies the spirit of our jewellery — where <br /> every
              diamond tells a story,
            </p>

            <div className="pt-[56.18px] flex flex-row">
              <button className="flex items-center gap-2 bg-[#002D31] text-white h-[56px] px-[20.88px] rounded-lg  mr-7 ">
                ADD TO CART
                <Image
                  src="/try/kartwhite.svg"
                  width={24}
                  height={24}
                  alt="cart"
                />
              </button>

              <p className="text-[32px] leading-[40px] font-semibold py-2  ">
                ₹ 75000
              </p>
            </div>
          </div>
          <Image
            src="/try/rosering.svg"
            width={403}
            height={360.64}
            className="absolute top-[89.29px] left-[145.48px]"
            alt="ring"
          />
            <Image
            src="/try/ringshadow.svg"
            width={222.02}
            height={23.79}
            className="absolute top-[332.2px] left-[255.41px]"
            alt="shadow"
          />

        </div>
      </div>
    </>
  );
};

export default Ringcomponet;
