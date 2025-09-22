// import React from "react";
// import Image from "next/image";

// const StoreComp = () => {
//   return (
//     <div className="w-full h-[45rem] sm:h-[40rem] md:h-[40rem] lg:h-[37.5rem] bg-[#002D31]">
//       <div className="max-w-container h-full mx-auto bg-[#002D31] relative text-start px-4 lg:px-0">
//         {/* Main text content */}
//         <div className="w-[21.8rem]   top-[2rem] left-1/2 -translate-x-1/2 lg:translate-x-0 flex flex-col space-y-2 items-center lg:items-start text-center lg:text-left sm:w-[20rem] sm:top-[2rem] sm:left-[1rem] md:w-[28rem] md:top-[2rem] md:left-[2rem] lg:w-[30.75rem] lg:top-[9.117rem] lg:left-[8.963rem] absolute">
//           <p className="block lg:hidden text-[#918676] font-normal text-[0.875rem] leading-[1.5rem] tracking-[0.08em] text-center">
//             FIND AT STORE
//           </p>
//           <p className="text-[2rem] hidden lg:block sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-[500] font-playfair text-[#F8F4E9] leading-tight">
//             Find nearest <br />
//             swa diamond store <br />
//             near you
//           </p>

//           <p className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[3.5rem] font-medium font-playfair text-[#F8F4E9] leading-tight text-center lg:text-left lg:leading-tight lg:font-medium">
//             <span className="lg:hidden">
//               Find nearest swa <br /> diamond store
//             </span>
//           </p>
//           <div className="w-fit">
//             <button
//               className="flex items-center gap-2 border border-[#F8F4E9] bg-[#002D31] text-white text-[0.8rem] px-6 py-3 mt-[1rem] rounded-lg w-[14rem] h-[3rem] 
//              sm:w-[14rem] sm:h-[2.8rem] sm:text-[0.85rem] sm:mt-[1.5rem]
//              md:w-[15rem] md:h-[3rem] md:text-[0.9rem] md:mt-[1.5rem]
//              lg:w-[16.75rem] lg:h-[3.5rem] lg:text-[1rem] lg:mt-[1.438rem]
//              hover:bg-[#014147] transition-all duration-300 ease-in-out outline-none"
//               aria-label="Check nearest store"
//             >
//               <span className="">CHECK NEAREST STORE</span>
//               {/* <span className="inline md:hidden">FIND STORE</span> */}
//               <Image
//                 src="/try/storeArrow.svg"
//                 width={24}
//                 height={24}
//                 alt="arrow"
//                 className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
//               />
//             </button>
//           </div>
//         </div>

//         {/* Store image */}
//         <Image
//           src="/try/store.svg"
//           width={479.37}
//           height={479.37}
//           className="w-[18.609rem] h-[18.125rem] bottom-0 left-1/2 -translate-x-1/2 lg:translate-x-0  sm:w-[20rem] sm:h-[20rem] sm:bottom-0 sm:left-[1rem] md:w-[25rem] md:h-[25rem] md:top-[18rem] md:left-[2rem] lg:w-[29.96rem] lg:h-[29.96rem] lg:top-[3.367rem] lg:left-[51.28rem] shadow-[0.375rem_0.375rem_2.5rem_0.625rem_rgba(1,33,36,0.66),-0.375rem_0.375rem_2.5rem_0.625rem_rgba(1,33,36,0.66)] absolute z-10"
//           alt="store"
//         />

//         {/* Stats section */}
//         <div className="w-[10rem] top-[18rem] left-1/2 -translate-x-1/2 lg:translate-x-0 text-center sm:w-[12rem] sm:top-[44rem] sm:left-[9rem] md:w-[14rem] md:top-[45rem] md:left-[29rem] lg:w-[15.375rem] lg:top-[18.75rem] lg:left-[85.125rem] lg:text-left absolute z-20 text-[#F8F4E9]">
//           {/* Big heading */}
//           <p className="text-[1.8rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.5rem] font-bold leading-tight">
//             70+
//           </p>

//           {/* Subheading */}
//           <p className="text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.25rem] font-medium mt-1">
//             Store across india
//           </p>

//           {/* Footer line */}
//           <span className="inline-block lg:hidden w-[3.65em] h-[0.25rem] sm:w-[3rem] pb-0 mb-0 sm:h-[0.18rem] md:w-[3.5rem] md:h-[0.2rem] lg:w-[4.334rem] lg:h-[0.261rem] bg-[#017480] ml-2 align-middle"></span>
//           <p className="text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[1rem] mt-">
//             Opening soon @ <span className="font-semibold">Dubai</span>
//             <span className=" hidden lg:inline-block w-[2.5rem] h-[0.15rem] sm:w-[3rem] sm:h-[0.18rem] md:w-[3.5rem] md:h-[0.2rem] lg:w-[4.334rem] lg:h-[0.261rem] bg-[#017480] ml-2 align-middle"></span>
//           </p>
//         </div>

//         {/* Background rectangle */}
//         <div className="w-[22.125rem] h-[27.562rem] bottom-0 left-1/2 -translate-x-1/2 lg:translate-x-0 sm:w-[24.125rem] sm:h-[29.562rem] sm:bottom-0 sm:left-[0rem] md:w-[40rem] md:h-[28rem] md:top-[16rem] md:left-[0rem] lg:w-[59.25rem] lg:h-[21.809rem] lg:top-[11.519rem] lg:left-[51.276rem] bg-[#004247] absolute"></div>
//       </div>
//     </div>
//   );
// };

// export default StoreComp;


// import React from "react";
// import Image from "next/image";

// const StoreComp = () => {
//   return (
//     <div className="w-full h-[45rem] sm:h-[40rem] md:h-[40rem] lg:h-[37.5rem] xl:h-[40rem] 2xl:h-[42rem] bg-[#002D31]">

//       <div className=" max-w-[1920px] w-full h-[45rem] sm:h-[40rem] md:h-[40rem] lg:h-[37.5rem] xl:h-[40rem] 2xl:h-[42rem] bg-[#002D31] relative">
// <div className="z-10 w-[22.125rem] h-[27.562rem] bottom-0 left-1/2 -translate-x-1/2 lg:translate-x-0 sm:w-[24.125rem] sm:h-[29.562rem] sm:bottom-0 sm:left-[0rem] md:w-[40rem] md:h-[28rem] md:top-[16rem] md:left-[0rem] lg:w-[30.25rem] lg:h-[21.809rem] lg:top-[11.519rem] lg:left-auto lg:right-0 bg-[#004247] absolute"></div>      <div className="max-w-container h-full mx-auto bg-[#002D31] relative text-start px-4 lg:px-0">
//         {/* Main text content */}
//         <div className="w-[21.8rem] top-[2rem] left-1/2 -translate-x-1/2 lg:translate-x-0 flex flex-col space-y-2 items-center lg:items-start text-center lg:text-left sm:w-[20rem] sm:top-[2rem] sm:left-[1rem] md:w-[28rem] md:top-[2rem] md:left-[2rem] lg:w-[30.75rem] lg:top-[9.117rem] lg:left-[8.963rem] xl:w-[32rem] xl:top-[10rem] xl:left-[10rem] 2xl:w-[34rem] 2xl:top-[11rem] 2xl:left-[12rem] absolute">
//           <p className="block lg:hidden text-[#918676] font-normal text-[0.875rem] leading-[1.5rem] tracking-[0.08em] text-center">
//             FIND AT STORE
//           </p>
//           <p className="text-[2rem] hidden lg:block sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[3.75rem] 2xl:text-[4rem] font-[500] font-playfair text-[#F8F4E9] leading-tight">
//             Find nearest <br />
//             swa diamond store <br />
//             near you
//           </p>

//           <p className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[3.5rem] font-medium font-playfair text-[#F8F4E9] leading-tight text-center lg:text-left lg:leading-tight lg:font-medium">
//             <span className="lg:hidden">
//               Find nearest swa <br /> diamond store
//             </span>
//           </p>
//           <div className="w-fit">
//             <button
//               className="flex items-center gap-2 border border-[#F8F4E9] bg-[#002D31] text-white text-[0.8rem] px-6 py-3 mt-[1rem] rounded-lg w-[14rem] h-[3rem] 
//              sm:w-[14rem] sm:h-[2.8rem] sm:text-[0.85rem] sm:mt-[1.5rem]
//              md:w-[15rem] md:h-[3rem] md:text-[0.9rem] md:mt-[1.5rem]
//              lg:w-[16.75rem] lg:h-[3.5rem] lg:text-[1rem] lg:mt-[1.438rem]
//              xl:w-[17.5rem] xl:h-[3.75rem] xl:text-[1.05rem] xl:mt-[1.6rem]
//              2xl:w-[18.5rem] 2xl:h-[4rem] 2xl:text-[1.1rem] 2xl:mt-[1.8rem]
//              hover:bg-[#014147] transition-all duration-300 ease-in-out outline-none"
//               aria-label="Check nearest store"
//             >
//               <span className="">CHECK NEAREST STORE</span>
//               <Image
//                 src="/try/storeArrow.svg"
//                 width={24}
//                 height={24}
//                 alt="arrow"
//                 className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8"
//               />
//             </button>
//           </div>
//         </div>

//         {/* Store image */}
//         <Image
//           src="/try/store.svg"
//           width={479.37}
//           height={479.37}
//           className="w-[18.609rem] h-[18.125rem] bottom-0 left-1/2 -translate-x-1/2 lg:translate-x-0 sm:w-[20rem] sm:h-[20rem] sm:bottom-0 sm:left-[1rem] md:w-[25rem] md:h-[25rem] md:top-[18rem] md:left-[2rem] lg:w-[29.96rem] lg:h-[29.96rem] lg:top-[3.367rem] lg:left-[51.28rem] xl:w-[32rem] xl:h-[32rem] xl:top-[4rem] xl:left-[54rem] 2xl:w-[35rem] 2xl:h-[35rem] 2xl:top-[5rem] 2xl:left-[58rem] shadow-[0.375rem_0.375rem_2.5rem_0.625rem_rgba(1,33,36,0.66),-0.375rem_0.375rem_2.5rem_0.625rem_rgba(1,33,36,0.66)] absolute z-10"
//           alt="store"
//         />

//         {/* Stats section */}
//         <div className="w-[10rem] top-[18rem] left-1/2 -translate-x-1/2 lg:translate-x-0 text-center sm:w-[12rem] sm:top-[44rem] sm:left-[9rem] md:w-[14rem] md:top-[45rem] md:left-[29rem] lg:w-[15.375rem] lg:top-[18.75rem] lg:left-[85.125rem] xl:w-[16rem] xl:top-[20rem] xl:left-[90rem] 2xl:w-[17rem] 2xl:top-[22rem] 2xl:left-[96rem] lg:text-left absolute z-20 text-[#F8F4E9]">
//           {/* Big heading */}
//           <p className="text-[1.8rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.5rem] xl:text-[2.75rem] 2xl:text-[3rem] font-bold leading-tight">
//             70+
//           </p>

//           {/* Subheading */}
//           <p className="text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.25rem] xl:text-[1.3rem] 2xl:text-[1.4rem] font-medium mt-1">
//             Store across india
//           </p>

//           {/* Footer line */}
//           <span className="inline-block lg:hidden w-[3.65em] h-[0.25rem] sm:w-[3rem] pb-0 mb-0 sm:h-[0.18rem] md:w-[3.5rem] md:h-[0.2rem] lg:w-[4.334rem] lg:h-[0.261rem] bg-[#017480] ml-2 align-middle"></span>
//           <p className="text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.05rem] 2xl:text-[1.1rem] mt-1">
//             Opening soon @ <span className="font-semibold">Dubai</span>
//             <span className="hidden lg:inline-block w-[2.5rem] h-[0.15rem] sm:w-[3rem] sm:h-[0.18rem] md:w-[3.5rem] md:h-[0.2rem] lg:w-[4.334rem] lg:h-[0.261rem] xl:w-[4.5rem] xl:h-[0.28rem] 2xl:w-[5rem] 2xl:h-[0.3rem] bg-[#017480] ml-2 align-middle"></span>
//           </p>
//         </div>

//         {/* Background rectangle */}
//       </div>

//       </div>
//     </div>
//   );
// };

// export default StoreComp;

import React from "react";
import Image from "next/image";

const StoreComp = () => {
  return (
    <div className="w-full h-[45rem] sm:h-[45rem] md:h-[45rem] lg:h-[37.5rem]  bg-[#002D31]">
 <div className="lg:hidden w-full mx-auto lg:max-w-[1616.82px]  h-[45rem] sm:h-[45rem] md:h-[45rem] z-10 lg:h-[37.5rem] xl:h-[40rem] 2xl:h-[42rem]  relative">
        

      

        {/* Background rectangle */}
        <div className=" absolute bottom-0 left-1/2 -translate-x-1/2 w-[22.125rem]  sm:w-[29rem] md:w-full h-[27.562rem] bg-[#004247]
         lg:translate-x-0
         z-10
           md:h-[28rem] 
          lg:w-[30.25rem] lg:h-[21.809rem] lg:top-[30%] lg:left-[70.1%] 
          xl:left-[65%]
          2xl:left-[70%]" 
        />



        {/* Main container */}
        <div className="max-w-container h-full mx-auto bg-[#002D31] relative text-start px-4 lg:px-0">
          
          {/* Text section */}
          <div className="absolute top-[2rem] md:top-2 left-1/2 -translate-x-1/2 flex flex-col items-center lg:items-start lg:text-left text-center space-y-2 w-[21.8rem] sm:w-[23rem]
          lg:translate-x-0  md:w-[33rem]
            lg:top-[9.117rem] lg:left-[4.963rem] lg:w-[30.75rem]
            xl:top-[10rem] xl:left-[10rem] xl:w-[32rem]
            2xl:top-[11rem] 2xl:left-[12rem] 2xl:w-[34rem]"
          >
            {/* Mobile subtitle */}
            <p className="block lg:hidden text-[#918676] font-normal text-[0.875rem] md:text-[1rem] leading-[1.5rem] tracking-[0.08em] text-center">
              FIND AT STORE
            </p>

            {/* Desktop title */}
            <p className="hidden lg:block text-[2rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3.5rem]  font-[500] font-playfair text-[#F8F4E9] leading-tight">
              Find nearest <br />
              swa diamond store <br />
              near you
            </p>

            {/* Mobile title */}
            <p className="lg:hidden text-[2.5rem] md:text-[3.5rem] font-medium font-playfair text-[#F8F4E9] leading-tight text-center">
              Find nearest swa <br /> diamond store
            </p>

            {/* Button */}
            <div className="w-fit">
              <button
                className="flex items-center gap-2 border border-[#F8F4E9] bg-[#002D31] text-white text-[0.8rem] px-6 py-3 mt-[1rem] rounded-lg w-[14rem] h-[3rem] 
                  sm:w-[15rem] sm:h-[2.8rem] sm:text-[0.85rem] sm:mt-[1.5rem]
                  md:w-[15rem] md:h-[3rem] md:text-[0.9rem] md:mt-[1.5rem]
                  lg:w-[16.75rem] lg:h-[3.5rem] lg:text-[1rem] lg:mt-[1.438rem]
                  xl:w-[17.5rem] xl:h-[3.75rem] xl:text-[1.05rem] xl:mt-[1.6rem]
                  2xl:w-[18.5rem] 2xl:h-[4rem] 2xl:text-[1.1rem] 2xl:mt-[1.8rem]
                  hover:bg-[#014147] transition-all duration-300 ease-in-out outline-none"
                aria-label="Check nearest store"
              >
                <span>CHECK NEAREST STORE</span>
                <Image
                  src="/try/storeArrow.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                  className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8"
                />
              </button>
            </div>
          </div>

          {/* Store image */}
          <Image
            src="/try/store.svg"
            width={479.37}
            height={479.37}
            alt="store"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[18.609rem] h-[18.125rem]
              sm:w-[20rem] sm:h-[20rem] md:left-1/4 md-translate-x-1/2 lg:translate-x-0 
              md:w-[25rem] md:h-[25rem] md:bottom-0 
              lg:w-[29.96rem] lg:h-[29.96rem] lg:top-[3.367rem] lg:left-[41.28rem]
              xl:w-[32rem] xl:h-[32rem] xl:top-[4rem] xl:left-[54rem]
              2xl:w-[35rem] 2xl:h-[35rem] 2xl:top-[5rem] 2xl:left-[58rem]
              shadow-[0.375rem_0.375rem_2.5rem_0.625rem_rgba(1,33,36,0.66),-0.375rem_0.375rem_2.5rem_0.625rem_rgba(1,33,36,0.66)]"
          />

          {/* Stats */}
          <div className="absolute top-[18rem] left-1/2 -translate-x-1/2 text-center z-20 text-[#F8F4E9] w-[10rem]
          md:left-2/4 md-translate-x-1/2 lg:translate-x-0
            sm:top-[18rem] md:translate-x-0 sm:w-[12rem]
            md:top-[24rem]  md:w-[25rem] 
            lg:top-[18.75rem] lg:left-[75.125rem] lg:w-[15.375rem] lg:text-left
            xl:top-[20rem] xl:left-[90rem] xl:w-[16rem]
            2xl:top-[22rem] 2xl:left-[96rem] 2xl:w-[17rem]"
          >
            <p className="text-[1.8rem]  md:text-[4.5rem] lg:text-[2.5rem] xl:text-[2.75rem] 2xl:text-[3rem] font-bold leading-tight">
              70+
            </p>
            <p className="mt-1 sm:mt-0 sm:mb-0 text-[0.9rem] sm:text-[1rem] md:text-[3rem] lg:text-[1.25rem] xl:text-[1.3rem] 2xl:text-[1.4rem] font-medium">
              Store across india
            </p>
            <span className="lg:hidden inline-block w-[3.65em] h-[0.25rem] md:w-[20rem]  bg-[#017480] ml-2 sm:mt-0 sm:mb-0"></span>
            <p className="mt-1 sm:mt-0 text-[0.8rem] sm:text-[0.85rem] md:text-[2rem] lg:text-[1rem] xl:text-[1.05rem] 2xl:text-[1.1rem]">
              Opening soon @ <span className="font-semibold">Dubai</span>
              <span className="hidden lg:inline-block w-[2.5rem] h-[0.15rem] sm:w-[3rem] sm:h-[0.18rem] md:w-[3.5rem] md:h-[0.2rem] lg:w-[4.334rem] lg:h-[0.261rem] xl:w-[4.5rem] xl:h-[0.28rem] 2xl:w-[5rem] 2xl:h-[0.3rem] bg-[#017480] ml-2"></span>
            </p>
          </div>
        </div>
      </div>


<div className="sm:hidden lg:flex max-w-[1920px] h-full border-4 border-black">
  <div className="w-1/2 h-full flex items-center justify-center">
   <div className=""
          >
            {/* Mobile subtitle */}
            <p className="block lg:hidden text-[#918676] font-normal text-[0.875rem] md:text-[1rem] leading-[1.5rem] tracking-[0.08em] text-center">
              FIND AT STORE
            </p>

            {/* Desktop title */}
            <p className="hidden lg:block text-[2rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3.5rem]  font-[500] font-playfair text-[#F8F4E9] leading-tight">
              Find nearest <br />
              swa diamond store <br />
              near you
            </p>

            {/* Mobile title */}
            <p className="lg:hidden text-[2.5rem] md:text-[3.5rem] font-medium font-playfair text-[#F8F4E9] leading-tight text-center">
              Find nearest swa <br /> diamond store
            </p>

            {/* Button */}
            <div className="w-fit">
              <button
                className="flex items-center gap-2 border border-[#F8F4E9] bg-[#002D31] text-white text-[0.8rem] px-6 py-3 mt-[1rem] rounded-lg w-[14rem] h-[3rem] 
                  sm:w-[15rem] sm:h-[2.8rem] sm:text-[0.85rem] sm:mt-[1.5rem]
                  md:w-[15rem] md:h-[3rem] md:text-[0.9rem] md:mt-[1.5rem]
                  lg:w-[16.75rem] lg:h-[3.5rem] lg:text-[1rem] lg:mt-[1.438rem]
                  xl:w-[17.5rem] xl:h-[3.75rem] xl:text-[1.05rem] xl:mt-[1.6rem]
                  2xl:w-[18.5rem] 2xl:h-[4rem] 2xl:text-[1.1rem] 2xl:mt-[1.8rem]
                  hover:bg-[#014147] transition-all duration-300 ease-in-out outline-none"
                aria-label="Check nearest store"
              >
                <span>CHECK NEAREST STORE</span>
                <Image
                  src="/try/storeArrow.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                  className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8"
                />
              </button>
            </div>
          </div>
  
  </div>
  <div className=" w-1/2 h-full flex relative  ">
  
  <Image
            src="/try/store.svg"
            width={460.37}
            height={479.37}
            alt="store"
            className="absolute
             z-10
              lg:top-[3.6rem] lg:left-0
              shadow-[0.375rem_0.375rem_2.5rem_0.625rem_rgba(1,33,36,0.66),-0.375rem_0.375rem_2.5rem_0.625rem_rgba(1,33,36,0.66)]"
          />



           {/* Background rectangle */}
        <div className="  bg-[#004247]
        lg:mt-[18.3%]
         
          lg:ml-[49.1%]
          lg:w-[30.25rem]  lg:h-[21.809rem] relative
        "
        >
        <div className="absolute 
         
            lg:top-[5.75rem] lg:left-[7.5rem] lg:w-[15.375rem] lg:text-left z-20 text-white
           "
          >
            <p className="text-[1.8rem]  md:text-[4.5rem] lg:text-[2.5rem] xl:text-[2.75rem] 2xl:text-[3rem] font-bold leading-tight">
              70+
            </p>
            <p className="mt-1 sm:mt-0 sm:mb-0 text-[0.9rem] sm:text-[1rem] md:text-[3rem] lg:text-[1.25rem] xl:text-[1.3rem] 2xl:text-[1.4rem] font-medium">
              Store across india
            </p>
            <span className="lg:hidden inline-block w-[3.65em] h-[0.25rem] md:w-[20rem]  bg-[#017480] ml-2 sm:mt-0 sm:mb-0"></span>
            <p className="mt-1 sm:mt-0 text-[0.8rem] sm:text-[0.85rem] md:text-[2rem] lg:text-[1rem] xl:text-[1.05rem] 2xl:text-[1.1rem]">
              Opening soon @ <span className="font-semibold">Dubai</span>
              <span className="hidden lg:inline-block w-[2.5rem] h-[0.15rem] sm:w-[3rem] sm:h-[0.18rem] md:w-[3.5rem] md:h-[0.2rem] lg:w-[4.334rem] lg:h-[0.261rem] xl:w-[4.5rem] xl:h-[0.28rem] 2xl:w-[5rem] 2xl:h-[0.3rem] bg-[#017480] ml-2"></span>
            </p>
          </div>
          </div>
  </div>
  
</div>

    </div>
  );
};

export default StoreComp;
