// import React from 'react'
// import Image from 'next/image'

// const Newcollection = () => {
//   return (
//     <div className='w-full h-[1080px] bg-white'>
//         <div className='max-w-container mx-auto h-full bg-white relative'>
//             <Image src="/try/girlnewcollection.svg" className='flex flex-row items-center' width={512} height={790.28}/>
//             <Image src="/try/decorenewcollection.svg" className='absolute left-[1276.18px] top-0' width={390.36} height={473.22}/>
//             <div className='absolute top-[184.88px] left-[565.01px]'>
//                 <p className='text-[#918676] text-[20px] font-[400] leading-[24px] tracking-[0.08em]'>
//                    FIND YOUR NEW COLLECTION
//                 </p>
//                 <p className='text-[56px] font-[500] font-playfair '>
//                    New Arrival
//                 </p>
//             </div>
//       <div className="absolute top-[847.19px] left-[555.28px]">
//   <a
//     href="/"
//     className="flex flex-row items-center gap-2 w-[168px] underline underline-offset-4 !underline h-[30px] text-[#000000] text-[18px] leading-[24px] tracking-[0.06em] hover:text-[#2c2c2c] transition underline underline-offset-4"
//   >
//     VIEW MORE
//     <Image
//       src="/try/rightarrowblack.svg"
//       width={24}
//       height={24}
//       alt="arrow"
//     />
//   </a>
// </div>

//         </div>
//     </div>
//   )
// }

// export default Newcollection

import React from "react";
import Image from "next/image";

const Newcollection = () => {
  //const [selectedColor, setSelectedColor] = useState('rose-gold');
  const colors = [
    { id: "rose-gold", name: "Rose Gold", color: "#E8B4A0" },
    { id: "green", name: "Green", color: "#4A5D23" },
  ];
   
  const data =[
    {id:1,name:" ROSE GOLD RING",sku:" SKU : 5467I",price:"27000",src:"/try/newArrivaltry.png"},
    {id:2,name:" ROSE GOLD RING",sku:" SKU : 5467I",price:"27000",src:"/try/newArrivaltry.png"},
    {id:3,name:" ROSE GOLD RING",sku:" SKU : 5467I",price:"27000",src:"/try/newArrivaltry.png"},
    {id:4,name:" ROSE GOLD RING",sku:" SKU : 5467I",price:"27000",src:"/try/newArrivaltry.png"},
  ]

   
  return (
    <div className="w-full lg:h-[1080px] h-[640px] bg-white">
      <div className="max-w-container mx-auto h-full bg-white flex flex-row items-center relative ">
        {/* <Image
          src="/try/decorenewcollection.svg"
          className="absolute left-[1276.18px] top-0 z-0 hidden lg:block"
          width={390.36}
          height={473.22}
        /> */}
        <Image
          src="/try/girlnewcollection.svg"
          className="hidden lg:block"
          width={512}
          height={790.28}
        />

        <div className=" flex flex-col items-center justify-center lg:items-start lg:justify-start   w-full h-full mt-0">
          <div className="h-fit mt-2 lg:mt-[12rem] lg:ml-9 ml-0 text-center lg:text-left">
            <p className="text-[#918676] text-[20px] font-[400] leading-[24px] tracking-[0.08em]">
              FIND YOUR NEW COLLECTION
            </p>
            <p className="text-[56px] font-[500] font-playfair ">New Arrival</p>
          </div>











{/* <div className="max-sm:overflow-x-auto max-sm:overflow-y-visible lg:ml-9 lg:w-full flex max-sm:w-full max-sm:h-fit  bg-[#4A5D23]">
  <div className="h-fit w-full flex flex-row justify-between  md:ml-0 md:mr-0 sm:ml-0 sm:mr-0 ml-2 mr-2 lg:mt-[4rem] mt-[2rem] lg:mb-0 mb-[2rem] z-20 max-md:justify-start max-md:gap-4 max-sm:w-fit">
    {data.map((data) => (
      <div key={data.id} className="max-md:w-[188px] max-md:h-[340px] max-md:flex-shrink-0 max-sm:flex-shrink-0 max-sm:w-[200px] px-1">
        <div className="lg:w-[15.43rem] lg:h-[18.41rem] max-md:w-[180px] max-md:h-[220px] max-sm:w-[160px] max-sm:h-[200px] bg-[#FAF6F2] z-10 flex justify-center items-center relative">
          <img src={data.src} alt="" />
          <img src="/try/like.svg" className="top-2 right-2 absolute" alt="" />
        </div>
        <p className="font-inter font-semibold text-[16px] leading-[100%] tracking-[4%] align-middle uppercase pt-2 pb-1">
          {data.name}
        </p>
        <p className="font-inter text-[#918676] font-normal text-[14px] leading-[100%] tracking-[4%] align-middle uppercase pt-1 pb-1">
          {data.sku}
        </p>
        <div className="flex gap-2 mb-4 pt-2 pb-1">
          {colors.map((color) => (
            <div
              key={color.id}
              className="w-6 h-6 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: color.color }}
              title={color.name}
            />
          ))}
        </div>
        <p className="text-lg font-semibold text-gray-900">₹ {data.price}</p>
      </div>
    ))}
  </div>
</div> */}


<div className="max-sm:overflow-x-auto max-sm:overflow-y-visible lg:w-full flex max-sm:w-full max-sm:h-fit">
  <div className="lg:ml-9 lg:mr-3 h-fit w-full flex flex-row justify-between md:ml-0 md:mr-0 sm:ml-0 sm:mr-0 ml-2 mr-2 lg:mt-[4rem] mt-[2rem] lg:mb-0 mb-[2rem] z-20 max-md:justify-start max-md:gap-4 max-sm:w-fit sm:max-md:gap-2">
    {data.map((data) => (
      <div key={data.id} className="lg:mx-2 max-md:w-[188px] max-md:h-[340px] max-md:flex-shrink-0 max-sm:flex-shrink-0 max-sm:w-[200px] px-1 lg:flex-1 lg:min-w-0 sm:max-md:w-[140px] sm:max-md:px-0.5">
        <div className="lg:w-full lg:aspect-[4/5] max-md:w-[180px] max-md:h-[220px] max-sm:w-[160px] max-sm:h-[200px] sm:max-md:w-[130px] sm:max-md:h-[160px] bg-[#FAF6F2] z-10 flex justify-center items-center relative">
          <img src={data.src} alt="" />
          <img src="/try/like.svg" className="top-2 right-2 absolute sm:max-md:top-1 sm:max-md:right-1 sm:max-md:w-4 sm:max-md:h-4" alt="" />
        </div>
        <p className="font-inter font-semibold text-[16px] leading-[100%] tracking-[4%] align-middle uppercase pt-2 pb-1 sm:max-md:text-[12px] sm:max-md:pt-1 sm:max-md:pb-0.5">
          {data.name}
        </p>
        <p className="font-inter text-[#918676] font-normal text-[14px] leading-[100%] tracking-[4%] align-middle uppercase pt-1 pb-1 sm:max-md:text-[10px] sm:max-md:pt-0.5 sm:max-md:pb-0.5">
          {data.sku}
        </p>
        <div className="flex gap-2 mb-4 pt-2 pb-1 sm:max-md:gap-1 sm:max-md:mb-2 sm:max-md:pt-1 sm:max-md:pb-0.5">
          {colors.map((color) => (
            <div
              key={color.id}
              className="w-6 h-6 rounded-full border-2 border-gray-200 sm:max-md:w-4 sm:max-md:h-4 sm:max-md:border"
              style={{ backgroundColor: color.color }}
              title={color.name}
            />
          ))}
        </div>
        <p className="text-lg font-semibold text-gray-900 sm:max-md:text-sm">₹ {data.price}</p>
      </div>
    ))}
  </div>
</div>


          
          
          
          
          <div className="ml-9 mt-[4rem]">
            <a
              href="/"
              className="flex flex-row items-center gap-2 w-[168px] underline underline-offset-4 !underline h-[30px] text-[#000000] text-[18px] leading-[24px] tracking-[0.06em] hover:text-[#2c2c2c] transition underline underline-offset-4"
            >
              VIEW MORE
              <Image
                src="/try/rightarrowblack.svg"
                width={24}
                height={24}
                alt="arrow"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newcollection;














 {/* <div className="flex gap-2 mb-4">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedColor === color.id
                        ? "border-gray-400 scale-110"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                  />
                ))}
              </div> */}