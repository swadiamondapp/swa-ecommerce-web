import React from "react";
import Image from "next/image";
import { alt } from "joi";

const Favcollection = () => {
  return (
    <div className="w-full h-[43rem]  bg-[#F8F4E9] lg:h-[67.5rem] md:h-[67.5rem] sm:h-[43rem] ">
      <div className="mx-auto h-full relative lg:max-w-[min(1616.82px,calc(100%-2.5rem))]">
        <div className=" w-full blip bg-yellow-200 mx-5">
          <div className="hidden lg:flex w-[23.61rem]  z-10 h-[10.04rem] justify-between left-[0.53rem] top-[50.89rem] absolute lg:w-[23.61rem] lg:h-[10.04rem] lg:left-[0.53rem] lg:top-[50.89rem] md:w-[23.61rem] md:h-[10.04rem] md:left-[0.53rem] md:top-[50.89rem] sm:w-[23.61rem] sm:h-[10.04rem] sm:left-[0.53rem] sm:top-[50.89rem]">
            <div>
              <Image
                src="/try/favRing2.svg"
                className=""
                width={176.92}
                height={160.65}
                alt="ring"
              />
            </div>
            <div>
              <Image
                src="/try/favRing.svg"
                className=""
                width={176.92}
                height={160.65}
                alt="ring"
              />
            </div>
          </div>
          <Image
            src="/try/downArrow.svg"
            className="absolute bottom-0 z-10 left-1/2 transform -translate-x-1/2 w-[1.5rem] md:w-[2rem] lg:w-[3rem]"
            width={85.14}
            height={143.57}
            alt="arrow"
          />

          <Image
            src="/try/favgirl.webp"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 lg:pl-8 w-[17rem] sm:w-[17rem] md:w-[30rem] lg:w-[55%]"
            width={788}
            height={976}
            alt="fav collection girl"
          />

          <div className="absolute text-center text-md-start flex flex-col items-center left-1/2 transform -translate-x-1/2 lg:block lg:text-left top-[1.687rem] w-[20.125rem] md:w-[24rem] lg:top-[8.4rem] lg:left-[12.51rem] md:top-[3.9rem] sm:top-[2.4rem] ">
            <p className="font-playfair text-[2rem] pb-3 lg:text-[3.5rem] lg:pb-[1.33rem] md:text-[3.5rem] md:pb-[1.33rem] sm:text-[2rem] sm:pb-[1.33rem]">
              Preity Zinta <br /> Fav Collections
            </p>
            <Image
              src="/try/Rectangle.svg"
              width={88.89}
              height={4}
              alt="rectangle"
              className="hidden lg:block top-0 left-0 pb-[1.52rem] lg:pb-[1.52rem] md:pb-[1.52rem] sm:pb-[1.52rem]"
            />

            <p className="pb-[1.55rem] lg:pb-[1.55rem] md:pb-[1.55rem] sm:pb-[1.55rem] md:max-w-[23.60rem] max-w-[20rem] text-[0.75rem] sm:text-sm">
              Its design draws inspiration from the pink oyster mushroom, a
              symbol of immortality and longevity, and it features 41 unique
              mushroom-shaped petals adorned with diamonds The ring weighs
            </p>
            <div className="w-fit">
              <button className="flex items-center gap-2 bg-[#002D31] text-white px-6 py-3 rounded-lg lg:px-6 lg:py-3 md:px-6 md:py-3 sm:px-6 sm:py-3">
                VIEW COLLECTIONS
                <Image
                  src="/try/favButtonarrow.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                />
              </button>
            </div>
          </div>

          <div className="hidden lg:block w-[16.91rem] text-end absolute top-[9.13rem] right-[0.53rem]">
            <Image
              src="/try/Rectangle.svg"
              width={88.89}
              height={4}
              alt="rectangle"
              className="absolute top-0 right-0 pb-[1.52rem]"
            />
            <p className="text-[1.25rem] text-[#918676] pt-[0.6rem]">
              TRENDY COLLECTIONS
            </p>
            <p className="pt-[0.35rem]">
              Its design draws inspiration from <br /> the pink oyster mushroom,
              a symbol of <br /> immortality and longevity, and it
            </p>
          </div>

          <img
            src="/try/Line.svg"
            alt="line"
            className="hidden lg:block absolute top-[18.55rem] right-[4.46rem]"
          />

          <div className="hidden lg:block absolute bottom-20 right-[0.53rem] text-end w-[15.32rem] h-[5.25rem]">
            <p className="text-[1.25rem] font-extrabold">
              WE HAVE STYLE AT <br /> YOUR AFFORDABLE <br /> BUDGET
            </p>
          </div>

          <img
            src="/try/Line.svg"
            alt="line"
            className="hidden lg:block  absolute top-[18.55rem] right-[4.46rem] pb-[1.52rem] lg:top-[18.55rem] lg:right-[4.46rem] lg:pb-[1.52rem] md:top-[18.55rem] md:right-[4.46rem] md:pb-[1.52rem] sm:top-[18.55rem] sm:right-[4.46rem] sm:pb-[1.52rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Favcollection;
