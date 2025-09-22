import React from "react";
import Image from "next/image";

const StoreComp = () => {
  return (
    <div className="w-full bg-[#002D31] overflow-hidden relative">
      {/* Mobile Layout */}
      <div className="md:hidden w-full relative flex flex-col">
        <div className="relative z-10 flex flex-col h-full px-4">
          <div className="flex flex-col items-center text-center pt-8 pb-4">
            <p className="text-[#918676] font-normal text-sm leading-[24px] tracking-[0.08em] mb-4">
              FIND AT STORE
            </p>
            <h1 className="text-[#F8F4E9] font-playfair font-medium text-3xl leading-[48px] text-center mb-4 max-w-[400px]">
              Find the nearest swa diamond store
            </h1>
            <button className="flex items-center justify-center gap-2 border border-[#F8F4E9] bg-transparent text-[#F8F4E9] px-4 py-2 rounded-lg">
              CHECK NEAREST STORE
              <Image
                src="/try/storeArrow.svg"
                width={24}
                height={24}
                alt="arrow"
                className="w-6 h-6"
              />
            </button>
          </div>
          <div className="bg-[#004247] pt-4 mt-12">
            <div className="text-center text-[#F8F4E9] pb-8 relative z-20">
              <p className="text-[28.8px] font-bold leading-tight mb-2">70+</p>
              <p className="text-[14.4px] font-medium mb-2">
                Store across india
              </p>
              <div className="flex items-center justify-center gap-2 mb-2 mt-2">
                <span className="w-[58.4px] h-[4px] bg-[#017480]"></span>
              </div>
              <p className="text-[12.8px]">
                Opening soon @ <span className="font-semibold">Dubai</span>
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
              <Image
                src="/try/store.svg"
                width={298}
                height={290}
                alt="store"
                className="w-[298px] h-[290px] relative z-20"
                style={{
                  filter:
                    "drop-shadow(6px 6px 40px rgba(1, 33, 36, 0.66)) drop-shadow(-6px 6px 40px rgba(1, 33, 36, 0.66))",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="max-w-container hidden md:grid grid-cols-2 w-full py-20 mx-auto z-0">
        <div className="flex flex-col items-start justify-center pl-4 md:pl-16 z-20">
          <h1 className="text-[#F8F4E9] font-playfair font-medium text-6xl mb-8">
            Find nearest <br /> swa diamond store <br /> near you
          </h1>
          <button className="flex items-center justify-center gap-2 border border-[#F8F4E9] bg-transparent text-[#F8F4E9] px-4 py-4 rounded-lg">
            CHECK NEAREST STORE
            <Image
              src="/try/storeArrow.svg"
              width={24}
              height={24}
              alt="arrow"
              className="w-6 h-6"
            />
          </button>
        </div>
        <div className="flex items-center justify-center z-20">
          <img
            src="/try/store.svg"
            alt="store"
            className="sm:w-[480px] sm:h-[480px] w-[298px] h-[290px]"
            style={{
              filter:
                "drop-shadow(6px 6px 40px rgba(1, 33, 36, 0.66)) drop-shadow(-6px 6px 40px rgba(1, 33, 36, 0.66))",
            }}
          />
          <div className="text-[#F8F4E9] pl-8 mt-20 relative z-20">
              <p className="text-[28.8px] font-bold leading-tight mb-2">70+</p>
              <p className="text-[14.4px] font-medium mb-2">
                Store across india
              </p>
              <p className="text-[12.8px]">
                Opening soon @ <span className="font-semibold">Dubai</span><span className="w-[58.4px] h-[4px] bg-[#017480]"></span>
              </p>
            </div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-20 right-0 w-[40%] h-[350px] bg-[#004247]"></div>
    </div>
  );
};

export default StoreComp;
