import React from "react";
import Image from "next/image";

const Favcollection = () => {
  return (
    <div className="w-full h-[1080px] bg-[#F8F4E9]">
      <div className="max-w-container mx-auto  h-full relative">
        <div className="flex w-[377.83px] h-[160.65px] justify-between left-[8.41px] top-[814.25px] absolute">
          <div>
            <Image
              src="/try/favRing2.svg"
              className=""
              width={176.92}
              height={160.65}
            />
          </div>
          <div>
            <Image
              src="/try/favRing.svg"
              className=""
              width={176.92}
              height={160.65}
            />
          </div>
        </div>
        <Image
          src="/try/downArrow.svg"
          className="absolute left-[846.27px] bottom-0 z-10"
          width={85.14}
          height={143.57}
        />

        <Image
          src="/try/favcollectiongirl.svg"
          className="absolute left-[415.87px] bottom-0"
          width={853.7556762695312}
          height={875.171875}
        />

        <div className="absolute top-[134.44px] left-[8.18px] w-fit">
          <p className="font-playfair text-[56px] pb-[21.3px]">
            Preity Zinta <br /> Fav Collections
          </p>
          <Image
            src="/try/Rectangle.svg"
            width={88.89}
            height={4}
            alt="arrow"
            className="top-0 left-0 pb-[24.24px]"
          />

          <p className="pb-[24.81px]">
            Its design draws inspiration from the  pink oyster <br /> mushroom,
            a symbol of immortality and longevity, and it <br /> features 41
            unique mushroom-shaped petals adorned <br /> with diamonds The ring
            weighs
          </p>
          <button className="flex items-center gap-2 bg-[#002D31] text-white px-6 py-3 rounded-lg  ">
            VIEW COLLECTIONS
            <Image
              src="/try/favButtonarrow.svg"
              width={24}
              height={24}
              alt="arrow"
            />
          </button>
        </div>


        <div className="w-[270.6px] text-end  absolute top-[146px] right-[8.41px]">
             <Image
            src="/try/Rectangle.svg"
            width={88.89}
            height={4}
            alt="arrow"
            className="absolute top-0 right-0 pb-[24.24px]"
          />
            <p className="text-[20px] text-[#918676] pt-[9.66px]">
                TRENDY COLLECTIONS
            </p>
            <p>
                Its design draws inspiration from <br /> the pink oyster mushroom, a symbol of <br /> immortality and longevity, and it 

            </p>
        </div>
      </div>
    </div>
  );
};

export default Favcollection;
