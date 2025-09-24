// import React from 'react'
// import Image from 'next/image';

// const articles = [
//   {
//     title: "3 simple tips to care for and store your jewllwey",
//     description:
//       "Jewellery is more than just an accessory — it’s an investment, a memory, and often a symbol of love. Whether it’s a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
//     date: "23.05.25",
//     time: "08:20 pm",
//   },
//   {
//     title: "How to choose the right ring for weddings",
//     description:
//       "Jewellery is more than just an accessory — it’s an investment, a memory, and often a symbol of love. Whether it’s a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
//     date: "23.05.25",
//     time: "08:20 pm",
//   },
//   {
//     title: "3 simple tips to care for and store your jewllwey",
//     description:
//       "Jewellery is more than just an accessory — it’s an investment, a memory, and often a symbol of love. Whether it’s a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
//     date: "23.05.25",
//     time: "08:20 pm",
//   },
// ];

// const Limelight = () => {
//   return (
//     <div className='w-full h-[876px] bg-white'>
//         <div className= 'max-w-container mx-auto bg-white relative'>
//             <div className="max-w-4xl mx-auto px-4 py-12 absolute top-[64.83px] left-[8.41px]">
//       <h2 className="text-[56px] font-playfair  mb-8">In the Limelight</h2>
//      <Image src="/try/Horizontalline.svg" className='pb-[24.78px]' width={923} height={885}/>

//       <div className="space-y-[24px]">
//         {articles.map((article, idx) => (
//           <div
//             className="  w-[653px] "
//             key={idx}
//           >
//             <h3 className="text-[24px]  leading-[32px] font-bold">
//               {article.title}
//             </h3>
//             <p className="text-[16px] leading-[24px] font-[400]">
//               {article.description}
//             </p>
//             <p className="text-[16px] leading-[32px] mt-3 pb-[2px]">
//               {article.date} | {article.time}
//             </p>
//             <Image src="/try/Horizontalline.svg" className='pt-[24px]' width={923} height={885}/>

//           </div>
//         ))}
//       </div>
//     </div>
//      <Image src="/try/limelightring.svg" className='absolute top-[163.24px] left-[955.41px]' width={653} height={647.94}/>

//         </div>
//     </div>
//   )
// }

// export default Limelight

// import React from 'react'
// import Image from 'next/image';

// const articles = [
//   {
//     title: "3 simple tips to care for and store your jewllwey",
//     description:
//       "Jewellery is more than just an accessory — it’s an investment, a memory, and often a symbol of love. Whether it’s a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
//     date: "23.05.25",
//     time: "08:20 pm",
//   },
//   {
//     title: "How to choose the right ring for weddings",
//     description:
//       "Jewellery is more than just an accessory — it’s an investment, a memory, and often a symbol of love. Whether it’s a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
//     date: "23.05.25",
//     time: "08:20 pm",
//   },
//   {
//     title: "3 simple tips to care for and store your jewllwey",
//     description:
//       "Jewellery is more than just an accessory — it’s an investment, a memory, and often a symbol of love. Whether it’s a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
//     date: "23.05.25",
//     time: "08:20 pm",
//   },
// ];

// const Limelight = () => {
//   return (
//     <div className='w-full h-fit bg-white'>
//         <div className= 'max-w-container mx-auto  h-full  flex flex-row-reverse justify-between items-center'>
//           <Image src="/try/limelightring.svg" className='lg:block hidden' width={653} height={647.94}/>
//          <div className="space-y-[24px]">
//           <h2 className="text-[56px] font-playfair  mb-8">In the Limelight</h2>
//                <Image src="/try/Horizontalline.svg" className='pb-[24.78px]' width={923} height={885}/>
//                          <Image src="/try/limelightring.svg" className='pt-3 pb-3 lg:hidden block' width={653} height={647.94}/>
//          {articles.map((article, idx) => (
//           <div
//             className="  w-[653px] "
//             key={idx}
//           >
//             <h3 className="text-[24px]  leading-[32px] font-bold">
//               {article.title}
//             </h3>
//             <p className="text-[16px] leading-[24px] font-[400]">
//               {article.description}
//             </p>
//             <p className="text-[16px] leading-[32px] mt-3 pb-[2px]">
//               {article.date} | {article.time}
//             </p>
//             <Image src="/try/Horizontalline.svg" className='pt-[24px]' width={923} height={885}/>

//           </div>
//           ))}
//        </div>

//         </div>
//     </div>
//   )
// }

// export default Limelight

import React from "react";
import Image from "next/image";

const articles = [
  {
    title: "3 simple tips to care for and store your jewllwey",
    description:
      "Jewellery is more than just an accessory — it's an investment, a memory, and often a symbol of love. Whether it's a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
    date: "23.05.25",
    time: "08:20 pm",
  },
  {
    title: "How to choose the right ring for weddings",
    description:
      "Jewellery is more than just an accessory — it's an investment, a memory, and often a symbol of love. Whether it's a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
    date: "23.05.25",
    time: "08:20 pm",
  },
  {
    title: "3 simple tips to care for and store your jewllwey",
    description:
      "Jewellery is more than just an accessory — it's an investment, a memory, and often a symbol of love. Whether it's a sparkling diamond ring, a gold chain, or a pair of delicate earrings, proper care can keep your jewellery looking new for years.",
    date: "23.05.25",
    time: "08:20 pm",
  },
];

const Limelight = () => {
  return (
    <div className="w-full h-fit bg-white">
      <div className="max-w-container mx-auto px-4 lg:h-[906px] h-fit  flex flex-row-reverse justify-center items-center  ">
        {/* Image sticks to right side */}
        <div className=" hidden flex-shrink-0 mt-[9.5rem] lg:flex flex-col items-end">
          <div className="mb-5 mr-1">
            <a
              href="/"
              className=" underline underline-offset-4 !underline h-[30px] text-[#017480] text-[18px] leading-[24px] tracking-[0.06em] hover:text-[#2c2c2c] transition underline underline-offset-4"
            >
              SEE ALL
            </a>
          </div>
          <Image src="/try/limelightring.svg" width={653} height={647.94} />
        </div>

        {/* Content takes remaining width */}
        <div className="space-y-[16px] sm:space-y-[24px] flex-1 lg:mr-8 text-left  mt-[3rem] lg:block md:flex md:flex-col md:items-center md:justify-center">
          <h2 className="text-[32px] sm:text-[56px] font-playfair md:mb-0 sm:mb-8">
            In the Limelight
          </h2>

          {/* Horizontal line as span */}
          <span className="lg:block w-full h-[1px] bg-gray-300  sm:hidden"></span>

          {/* Mobile image */}
          <Image
            src="/try/limelightring.svg"
            className="pt-2 pb-2 sm:pt-3 sm:pb-3 lg:hidden block w-full max-w-[300px] sm:max-w-[653px] mx-auto sm:mx-0"
            width={653}
            height={647.94}
          />

          {articles.map((article, idx) => (
            <div
              className="w-full md:flex md:flex-col md:items-center md:justify-center lg:block"
              key={idx}
            >
              <h3 className="text-[18px] sm:text-[24px] leading-[24px] sm:leading-[32px] font-bold pb-4">
                {article.title}
              </h3>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] font-[400] max-w-[653px]">
                {article.description}
              </p>
              <p className="text-[14px] sm:text-[16px] leading-[24px] sm:leading-[32px] mt-2 sm:mt-3 pb-[2px]">
                {article.date} | {article.time}
              </p>

              {/* Horizontal line as span */}
              <span className="block w-full h-[1px] bg-gray-300 mt-[16px] sm:mt-[24px]"></span>
            </div>
          ))}
            <div className="pb-5 lg:hidden w-full flex justify-center">
            <a
              href="/"
              className=" underline underline-offset-4 !underline h-[30px] text-[#017480] text-[18px] leading-[24px] tracking-[0.06em] hover:text-[#2c2c2c] transition underline underline-offset-4"
            >
              SEE ALL
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Limelight;
