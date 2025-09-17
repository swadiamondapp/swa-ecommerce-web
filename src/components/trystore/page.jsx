import React from "react";
import Image from "next/image";

const StoreComp = () => {
  return (
    <div className="w-full h-[600px] bg-[#002D31]">
      <div className="max-w-container h-full mx-auto bg-[#002D31] relative text-start">
        <div className="w-[492px] absolute top-[145.87px] left-[143.41px]">
          <p className="text-[56px] font-[500] font-playfair text-[#F8F4E9]">
            Find nearest <br />
            swa diamond store <br />
            near you
          </p>
          <button
            className="flex items-center gap-2 border border-[#F8F4E9] bg-[#002D31] text-white text-[16px] px-6 py-3  mt-[23px] rounded-lg w-[268px] h-[56px] 
             hover:bg-[#014147] transition-all duration-300 ease-in-out outline-none"
            aria-label="Check nearest store"
          >
            CHECK NEAREST STORE
            <Image
              src="/try/storeArrow.svg"
              width={24}
              height={24}
              alt="arrow"
            />
          </button>
        </div>
        <Image
              src="/try/store.svg"
              width={479.37}
              height={479.37}
              className="top-[53.87px] left-[820.48px] shadow-[6px_6px_40px_10px_rgba(1,33,36,0.66),-6px_6px_40px_10px_rgba(1,33,36,0.66)] absolute z-10"
              alt="arrow"
            />

     <div className="w-[246px] absolute top-[300px] left-[1362px] z-20 text-[#F8F4E9]">
  {/* Big heading */}
  <p className="text-[40px] font-bold leading-tight">70+</p>

  {/* Subheading */}
  <p className="text-[20px] font-medium mt-1">Store across india</p>

  {/* Footer line */}
  <p className="text-[16px] mt-2">
    Opening soon @ <span className="font-semibold">Dubai</span>
    <span className="inline-block w-[69.34px] h-[4.18px] bg-[#017480] ml-2 align-middle"></span>
  </p>
</div>

      <div className="w-[948px] h-[348.94px] bg-[#004247] top-[184.3px] left-[820.41px] absolute"></div>


      </div>
    </div>
  );
};

export default StoreComp;
