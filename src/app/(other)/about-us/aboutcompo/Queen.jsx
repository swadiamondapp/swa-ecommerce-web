import React from "react";
import Image from "next/image";


function Queen() {
  return (
   
    <>
    {/* queen */}
      <div className="w-full lg:h-[540px] md:h-[720px] h-[670px] bg-[#F5FFFD] ">
        <div className="max-w-container mx-auto h-full flex flex-row justify-around items-center md:items-end lg:items-center pb-10">
          <div>
            <div className="text-center text-md-start lg:text-left">
              <p className="text-black lg:text-[56px] text-[32px] font-medium md:leading-[63px] leading-[40px] font-playfair pb-3">
                Queen elizabath <br></br>coral Ring
              </p>
              <p className="lg:text-[20px] sm:text-[16px] text-[14px]  md:leading-[32px] leading-[25px] text-[#334155]">
                With timeless charm and radiant grace,<br></br> Preity Zinta embodies the
                // spirit of our jewellery <br></br>— where every diamond tells a story.
              </p>
            </div>
            <div className="relative lg:hidden flex justify-center w-full">
              <div>
                <Image
                  src="/Assets/queenring.svg"
                  width={403.64}
                  height={394.51}
                  className="mx-auto lg:w-[403.64px] lg:h-[394.51px] w-[270.5px] h-[264.46px]"
                  alt="ring"
                />
              </div>
            </div>
          
          </div>
          <div className="relative hidden lg:block">
           <Image
                  src="/Assets/Queenring.svg"
                  width={403.64}
                  height={394.51}
                  className="mx-auto lg:w-[403.64px] lg:h-[394.51px] w-[270.5px] h-[264.46px]"
                  alt="ring"
                />
          </div>
        </div>
      </div>


      {/* dalia */}


      <div className="w-full lg:h-[540px] md:h-[720px] h-[670px]">
        <div className="max-w-container mx-auto h-full flex flex-row-reverse justify-around items-center">
          <div>
            <div className="text-center text-md-start lg:text-left">
              <p className="lg:text-[56px] text-[32px] md:leading-[63px] leading-[40px] font-medium font-playfair pb-3  text-black">
                Dalia Rose <br></br>luxuriea ring
              </p>
              <p className="lg:text-[20px] sm:text-[16px] text-[13.5px]  md:leading-[32px] leading-[25px] text-[#334155]">
                With timeless charm and radiant grace,<br></br> Preity Zinta embodies the
                spirit of our jewellery<br></br> — where every diamond tells a story.
              </p>
            </div>
            <div className="relative lg:hidden flex justify-center w-full">
              <div>
                <Image
                  src="/Assets/Daliaring.svg"
                  width={403.64}
                  height={394.51}
                  className="mx-auto lg:w-[403.64px] lg:h-[394.51px] w-[270.5px] h-[264.46px]"
                  alt="ring"
                />
              </div>
            </div>
           
          </div>
          <div className="relative hidden lg:block">
            <Image
              src="/Assets/Daliaring.svg"
              width={500}
              height={500}
              className="mr-[5rem]"
              alt="ring"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Queen;
