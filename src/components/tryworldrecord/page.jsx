// import React from 'react'
// import Image from 'next/image'

// const Worldrec = () => {
//   return (
// <div className="relative w-full h-[778px]">
//   {/* Background Video */}
//   {/* <video
//     src="/try/worldrecvedio.mp4"
//     autoPlay
//     loop

//     muted
//     playsInline
//     className="w-full h-full object-cover"
//   /> */}

//   {/* Black overlay */}
//   <div className="absolute inset-0 z-10 bg-black/70" />

//   {/* Content container */}
//   <div className="absolute inset-0 z-20 flex items-center justify-center">
//     <div className="relative w-full h-full max-w-container mx-auto">
//       <Image
//         src="/try/worldrecring.svg"
//         width={1058}
//         height={737}
//         alt="ring"
//         className="absolute top-[248.71px] left-[279.41px]"
//       />

//       <Image
//         src="/try/worldreclogo.svg"
//         width={174.46}
//         height={174.46}
//         alt="ring"
//         className="absolute top-[44.97px] left-[1462.15px]"
//       />

//     <div className='text-center text-[#F8F4E9] absolute   top-[44.97px]  left-[414.41px]'>
//         <p className='text-[56px] font-[500] font-playfair'>
// Guinness world record
//         </p>
//         <p className='p-3'>
//             Its design draws inspiration from the pink oyster mushroom, a symbol of immortality and longevity, and it features 41 <br /> unique mushroom-shaped petals adorned with diamonds The ring weighs

//         </p>
//     </div>

//     </div>
//   </div>
// </div>

//   )
// }

// export default Worldrec

import React from "react";
import Image from "next/image";

const Worldrec = () => {
  return (
    <div className="relative w-full lg:h-[778px] sm:h-[666px] h-[850px]">
      {/* Background Video */}
      <video
        src="/try/worldrecvedio.webm"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Black overlay */}
      <div className="absolute inset-0 z-10 bg-black/70" />

      {/* Content container */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="flex w-full h-full max-w-container mx-auto justify-center items-center relative">
          <Image
            src="/try/worldreclogo.svg"
            width={174.46}
            height={174.46}
            alt="ring"
            className="
              absolute 
              top-[2.4rem] left-1/2 -translate-x-1/2
              lg:top-[2rem] md:top-[.85rem] lg:right-0 lg:left-auto lg:translate-x-0
            "
          />

          <div className="flex flex-col-reverse justify-center items-center h-full ">
            <Image
              src="/try/swaring.png"
              width={1058}
              height={737}
              alt="ring"
              className="lg:hidden lg:w-[1058px] lg:h-[737px] md:w-[390px] md:h-[290px] w-[288px] h-[200.65px] mt-[2rem]"
            />
            <div className="lg:block hidden relative lg:w-[1058px] lg:h-[737px] w-[288px] h-[200.65px] overflow-hidden">
              <Image
                src="/try/worldrecring.svg"
                width={1058}
                height={737}
                alt="ring"
                className="mt-[3rem]"
              />
            </div>

            <div className="text-center text-[#F8F4E9] lg:mt-[2rem] md:mt-[8rem] sm:mt-[8rem] mt-[8rem]">
              <p className="lg:text-[56px] md:text-[56px] text-[32px] font-[500] font-playfair mb-[0.75rem]">
                Guinness world record
              </p>
              <p className="p-[0.75rem] pb-0 lg:block hidden text-[16px] max-w-[1300px]">
                Inspired by the pink oyster mushrooms, "The touch of Ami" is a ring encrusted with 24,679 alluring conflict-free natural diamonds. The mushrooms were once reserved for royals an object of utmost value representing immortality, longevity, and royalty. The literal meaning of the word Ami is "Immortality." 
              </p>
              <p className="text-[16px] md:text-[18px] px-[20px] lg:hidden">
                Inspired by the pink oyster mushrooms, "The touch of Ami" is a ring encrusted with 24,679 alluring conflict-free natural diamonds. The mushrooms were once reserved for royals an object of utmost value representing immortality, longevity, and royalty. The literal meaning of the word Ami is "Immortality."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Worldrec;