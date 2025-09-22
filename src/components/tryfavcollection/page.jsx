import React from "react";
import Image from "next/image";

const Favcollection = () => {
  return (
    <div className="w-full h-[43rem] bg-[#F8F4E9] lg:h-[67.5rem] md:h-[67.5rem] sm:h-[43rem] ">
      <div className="max-w-container mx-auto h-full relative ">
        <div className="hidden lg:flex w-[23.61rem]  z-10 h-[10.04rem] justify-between left-[0.53rem] top-[50.89rem] absolute lg:w-[23.61rem] lg:h-[10.04rem] lg:left-[0.53rem] lg:top-[50.89rem] md:w-[23.61rem] md:h-[10.04rem] md:left-[0.53rem] md:top-[50.89rem] sm:w-[23.61rem] sm:h-[10.04rem] sm:left-[0.53rem] sm:top-[50.89rem]">
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
          className="absolute  bottom-0 z-10 left-1/2 transform -translate-x-1/2 w-[20%] h-[3.37rem] md:w-[3.5rem] md:h-[6rem] lg:w-[5.31rem] lg:h-[8.93rem]"
          width={85.14}
          height={143.57}
        />

 <Image
  src="/try/favcollectiongirl.svg"
  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 lg:pl-8 w-[20rem] h-[19.34rem] sm:w-[20rem] sm:h-[19.34rem] md:w-[40rem] md:h-[40rem] lg:w-[55%] lg:max-h-[81.3%] lg:h-auto"
  width={853.7556762695312}
  height={875.171875}
/>

        <div className="absolute text-center flex flex-col items-center left-1/2 transform -translate-x-1/2 lg:block lg:text-left top-[1.687rem] w-[20.125rem] md:w-[24rem] lg:top-[8.4rem] lg:left-[12.51rem] md:top-[3.9rem] sm:top-[6.4rem] ">
          <p className="font-playfair text-[2rem] pb-[1.33rem] lg:text-[3.5rem] lg:pb-[1.33rem] md:text-[3.5rem] md:pb-[1.33rem] sm:text-[2rem] sm:pb-[1.33rem]">
            Preity Zinta <br /> Fav Collections
          </p>
          <Image
            src="/try/Rectangle.svg"
            width={88.89}
            height={4}
            alt="arrow"
            className="hidden lg:block top-0 left-0 pb-[1.52rem] lg:pb-[1.52rem] md:pb-[1.52rem] sm:pb-[1.52rem]"
          />

          <p className="pb-[1.55rem] lg:pb-[1.55rem] md:pb-[1.55rem] sm:pb-[1.55rem] md:max-w-[23.60rem] max-w-[20rem] text-[0.75rem]">
            Its design draws inspiration from the pink oyster mushroom, a symbol
            of immortality and longevity, and it features 41 unique
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

        {/* <div className="hidden lg:block w-[16.91rem] text-end absolute top-[9.13rem] right-[0.53rem] lg:w-[16.91rem] lg:top-[9.13rem] lg:right-[0.53rem] md:w-[16.91rem] md:top-[9.13rem] md:right-[0.53rem] sm:w-[16.91rem] sm:top-[9.13rem] sm:right-[0.53rem]">
             <Image
            src="/try/Rectangle.svg"
            width={88.89}
            height={4}
            alt="arrow"
            className="absolute top-0 right-0 pb-[1.52rem] lg:pb-[1.52rem] md:pb-[1.52rem] sm:pb-[1.52rem]"
          />
            <p className="text-[1.25rem] text-[#918676] pt-[0.6rem] lg:text-[1.25rem] lg:pt-[0.6rem] md:text-[1.25rem] md:pt-[0.6rem] sm:text-[1.25rem] sm:pt-[0.6rem]">
                TRENDY COLLECTIONS
            </p>
            <p className="pt-[0.35rem] lg:pt-[0.35rem] md:pt-[0.35rem] sm:pt-[0.35rem]">
                Its design draws inspiration from <br /> the pink oyster mushroom, a symbol of <br /> immortality and longevity, and it 
            </p>
        </div> */}

        <div className="hidden lg:block w-[16.91rem] text-end absolute top-[9.13rem] right-[0.53rem]">
          <Image
            src="/try/Rectangle.svg"
            width={88.89}
            height={4}
            alt="arrow"
            className="absolute top-0 right-0 pb-[1.52rem]"
          />
          <p className="text-[1.25rem] text-[#918676] pt-[0.6rem]">
            TRENDY COLLECTIONS
          </p>
          <p className="pt-[0.35rem]">
            Its design draws inspiration from <br /> the pink oyster mushroom, a
            symbol of <br /> immortality and longevity, and it
          </p>
        </div>

        <img
          src="/try/Line.svg"
          alt="arrow"
          className="hidden lg:block absolute top-[18.55rem] right-[4.46rem]"
        />

        <div className="hidden lg:block absolute bottom-20 right-[0.53rem] text-end w-[15.32rem] h-[5.25rem]">
          <p className="text-[1.25rem] font-extrabold">
            WE HAVE STYLE AT <br /> YOUR AFFORDABLE <br /> BUDGET
          </p>
        </div>

        <img
          src="/try/Line.svg"
          alt="arrow"
          className="hidden lg:block  absolute top-[18.55rem] right-[4.46rem] pb-[1.52rem] lg:top-[18.55rem] lg:right-[4.46rem] lg:pb-[1.52rem] md:top-[18.55rem] md:right-[4.46rem] md:pb-[1.52rem] sm:top-[18.55rem] sm:right-[4.46rem] sm:pb-[1.52rem]"
        />

        {/* <div className="hidden lg:block absolute lg:top-[9.13rem] lg:right-[0.53rem] text-end  w-[15.32rem] h-[5.25rem]  lg:w-[15.32rem] lg:h-[5.25rem] md:top-[55.91rem] md:left-[85.21rem] md:w-[15.32rem] md:h-[5.25rem] sm:top-[55.91rem] sm:left-[85.21rem] sm:w-[15.32rem] sm:h-[5.25rem]">
            <p className="text-[1.25rem] font-extrabold lg:text-[1.25rem] md:text-[1.25rem] sm:text-[1.25rem]">
              WE HAVE STYLE AT <br /> YOUR AFFORDABLE <br /> BUDGET
            </p>
          </div> */}
      </div>
    </div>
  );
};

export default Favcollection;
