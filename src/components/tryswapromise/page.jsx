import React from "react";
import Image from "next/image";

const SwaPromise = () => {
  const data = [
     {
      title: "Certified natural diamonds only",
      description: "Certified natural diamonds only",
      image: "/try/Group 1321314094.svg",
    },

     {
      title: "BIS Hallmark, IGI, GIA",
      description: "BIS Hallmark, IGI, GIA",
      image: "/try/Bis.svg",
    },
    {
      title: "95% Value on exchange",
      description: "95% Value on exchange",
      image: "/try/Group.svg",
    },
      {
      title: "90% value on cash back ",
      description: "90% value on cash back ",
      image: "/try/Vector.svg",
    },
     {
      title: "Free shipping",
      description: "Free shipping",
      image: "/try/delivery.svg",
    },
       {
      title: "100% Refund Return with 7 days of delivery",
      description: "100% Refund Return with 7 days of delivery",
      image: "/try/refund.svg",
    },
   {
      title: "Try at home service",
      description: "Try at home service",
      image: "/try/home.svg",
    },
     {
      title: "Life time repair warranty",
      description: "Life time repair warranty",
      image: "/try/vedioconsultaion.svg",
    },

    

   

  

  
  ];

  return (
    <div className="w-full bg-[#F8F4E9]">
      <div className="max-w-container h-full mx-auto justify-between px-4 gap-10 items-center lg:items-stretch flex flex-col-reverse lg:flex-row">
        <div className="flex flex-col justify-center relative">
          <div className="hidden lg:block text-start lg:mb-[4rem]">
            <p className="text-[56px] font-playfair font-[500] min-w-[430px]">swa promise</p>
            <p className="text-[20px] mt-[.5rem] font-[400] text-[#334155] leading-[32px]">
              With timeless charm and radiant grace, Preity <br />
              Zinta embodies the spirit of our jewellery — where <br /> every
              diamond tells a story,
            </p>
          </div>
          {/* <img
            src="/try/diaRing.svg"
            className="w-[200px] lg:w-[337.94px] h-[120px] lg:h-[203.12px] static lg:absolute bottom-0 z-100"
            alt="ring"
          /> */}
        </div>

        <div className="text-[#334155] py-[1rem] lg:py-[5rem] max-w-[750px]">
  {/* Mobile: Hexagon Layout */}
  <div className="md:hidden flex flex-col items-center gap-6">
    {/* First row: 3 items */}
    <div className="flex justify-center sm:gap-[2rem] gap-[.85rem]">
      {data.slice(0, 3).map((item, index) => (
        <div className="text-center flex flex-col items-center w-[100px]" key={index}>
          <div className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] bg-white rounded-full mb-[.5rem] flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-[36px] h-[36px] md:w-[48px] md:h-[48px]"
            />
          </div>
          <p className="text-[0.75rem] md:text-[0.875rem] font-[400] leading-[16px] md:leading-[18px]">
            {item.title}
          </p>
        </div>
      ))}
    </div>
    
    {/* Second row: 3 items with more spacing */}
    <div className="flex justify-center sm:gap-[3rem] gap-[2.3rem]">
      {data.slice(3, 6).map((item, index) => (
        <div className="text-center flex flex-col items-center w-[100px]" key={index + 3}>
          <div className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] bg-white rounded-full mb-2 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-[36px] h-[36px] md:w-[48px] md:h-[48px]"
            />
          </div>
          <p className="text-[0.75rem] md:text-[0.875rem] font-[400] leading-[16px] md:leading-[18px]">
            {item.title}
          </p>
        </div>
      ))}
    </div>
    
    {/* Third row: 2 items centered */}
    <div className="flex justify-center sm:gap-[4rem] gap-[2.4rem]">
      {data.slice(6, 8).map((item, index) => (
        <div className="text-center flex flex-col items-center w-[100px]" key={index + 6}>
          <div className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] bg-white rounded-full mb-2 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-[36px] h-[36px] md:w-[48px] md:h-[48px]"
            />
          </div>
          <p className="text-[0.75rem] md:text-[0.875rem] font-[400] leading-[16px] md:leading-[18px]">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Desktop: Grid Layout */}
  <div className="hidden md:grid md:grid-cols-4 gap-8">
    {data.map((item, index) => (
      <div className="text-center flex flex-col items-center" key={index}>
        <div className="w-[140px] h-[140px] bg-white rounded-full mb-2 flex items-center justify-center">
          <img
            src={item.image}
            alt={item.title}
            className="w-[64px] h-[64px]"
          />
        </div>
        <p className="text-[14px] font-[400] leading-[20px]">
          {item.title}
        </p>
      </div>
    ))}
  </div>
</div>

{/* 


        <div className="flex flex-wrap justify-center gap-2 lg:gap-8 text-[#334155] py-4 lg:py-20 max-w-[750px]">
  {data.map((item, index) => (
    <div className="text-center flex flex-col items-center w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-1.5rem)]" key={index}>
      <div className="w-[90px] h-[90px] lg:w-[160px] lg:h-[160px] bg-white rounded-full mb-2 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.title}
          className="w-[40px] lg:w-[64px] h-[40px] lg:h-[64px]"
        />
      </div>
      <p className="text-[0.75rem] lg:text-[14px] font-[400] leading-[20px]">
        {item.title}
      </p>
    </div>
  ))}
</div> */}
 
 
 
 
 




        <div className="block lg:hidden text-center mt-4">
          <p className="text-4xl font-playfair">Swa promise</p>
          <p className="text-[0.75rem] mt-3 font-[400] text-[#334155]">
            With timeless charm and radiant grace, Preity <br />
            Zinta embodies the spirit of our jewellery — where <br /> every
            diamond tells a story,
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwaPromise;
