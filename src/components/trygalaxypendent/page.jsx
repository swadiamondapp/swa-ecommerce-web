// import React from "react";
// import Image from "next/image";

// const Galxypendant = () => {
//   return (
//     <div className="w-full">
//       <div className="w-full bg-white">
//         <div className="h-[778px] max-w-container mx-auto bg-white relative">
//           <Image
//             src="/try/galaxypendant.svg"
//             className="absolute -left-[151.59px] top-0"
//             width={948}
//             height={778}
//           />
//           <div className="absolute top-[228.3px] left-[955.41px]">
//             <p className="text-[56px] font-medium font-playfair">
//               Galaxy collection <br />
//               pendant
//             </p>
//             <p className="text-[20px] leading-[32px]">
//               With timeless charm and radiant grace, Preity <br />{" "}
//               Zinta embodies the spirit of our jewellery — where <br /> every
//               diamond tells a story,
//             </p>

//             <div className="pt-[20px]">
//               <a
//                 href="/"
//                 className="flex flex-row items-center gap-2 w-[168px] underline underline-offset-4 !underline h-[30px] text-[#017480] text-[18px] leading-[24px] tracking-[0.06em] hover:text-[#2c2c2c] transition underline underline-offset-4"
//               >
//                 VIEW MORE
//                 <Image
//                   src="/try/rightarrowblack.svg"
//                   width={24}
//                   height={24}
//                   alt="arrow"
//                 />
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="w-full bg-[#F8F4E9] ">
//           <div className="h-[778px] max-w-container mx-auto bg-[#F8F4E9] relative">
//             <Image
//               src="/try/galaxyhand.svg"
//               className="absolute left-[796.41px] top-0"
//               width={972}
//               height={778}
//             />
//             <div className="absolute top-[213.42px] left-[143.41px]">
//               <p className="text-[56px] font-medium font-playfair">
//                 Galaxy collection <br />
//                 pendant
//               </p>
//               <p className="text-[20px] leading-[32px]">
//                 With timeless charm and radiant grace, Preity <br />{" "}
//                 Zinta embodies the spirit of our jewellery — where <br /> every
//                 diamond tells a story,
//               </p>

//               <div className="pt-[20px]">
//                 <a
//                   href="/"
//                   className="flex flex-row items-center gap-2 w-[168px] underline underline-offset-4 !underline h-[30px] text-[#017480] text-[18px] leading-[24px] tracking-[0.06em] hover:text-[#2c2c2c] transition underline underline-offset-4"
//                 >
//                   VIEW MORE
//                   <Image
//                     src="/try/rightarrowblack.svg"
//                     width={24}
//                     height={24}
//                     alt="arrow"
//                   />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Galxypendant;
import React from "react";
import Image from "next/image";

const Galxypendant = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col max-w-[1920px] w-full">
        {/* First Row */}
        <div className="flex lg:flex-row flex-col w-full h-[778px]">
          {/* Left Image */}
          <div className="relative flex-1 h-full">
            <Image
              src="/try/galaxypendant.svg"
              alt="Galaxy Pendant"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="flex-1 h-full flex justify-center items-center">
            <div>
              <p className="sm:text-[56px] text-[32px] leading-[63px] pb-3 font-medium font-playfair">
                Galaxy collection <br /> pendant
              </p>
              <p className="sm:text-[20px] text-[16px] leading-[32px] text-[#334155]">
                With timeless charm and radiant grace, Preity <br />
                Zinta embodies the spirit of our jewellery — where <br /> every
                diamond tells a story,
              </p>

              <div className="pt-[20px]">
                <a
                  href="/"
                  className="flex flex-row items-center gap-2 w-[168px] underline underline-offset-4 h-[30px] text-[#017480] text-[18px] leading-[24px] tracking-[0.06em] hover:text-[#2c2c2c] transition"
                >
                  VIEW MORE
                  <Image
                    src="/try/greenrightarrow.svg"
                    width={24}
                    height={24}
                    alt="arrow"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex lg:flex-row-reverse flex-col-reverse bg-[#F8F4E9] w-full h-[778px]">
          {/* Left Image */}
          <div className="relative flex-1 h-full">
            <Image
              src="/try/galaxyhand.svg"
              alt="Galaxy Hand"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="flex-1 h-full flex justify-center items-center">
            <div>
              <p className="sm:text-[56px] leading-[63px] pb-3 text-[32px] font-medium font-playfair">
                Galaxy collection <br /> pendant
              </p>
              <p className="sm:text-[20px] text-[16px] leading-[32px] text-[#334155]">
                With timeless charm and radiant grace, Preity <br />
                Zinta embodies the spirit of our jewellery — where <br /> every
                diamond tells a story,
              </p>

              <div className="pt-[20px]">
                <a
                  href="/"
                  className="flex flex-row items-center gap-2 w-[168px] underline underline-offset-4 h-[30px] text-[#017480] text-[18px] leading-[24px] tracking-[0.06em] hover:text-[#2c2c2c] transition"
                >
                  VIEW MORE
                  <Image
                    src="/try/greenrightarrow.svg"
                    width={24}
                    height={24}
                    alt="arrow"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Galxypendant;
