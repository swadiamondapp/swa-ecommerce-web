import React from "react";
import Image from "next/image";

const SwaPromise = () => {
  const data = [
    {
      title: "Personalized video consultation",
      description: "Personalized video consultation",
      image: "/try/vedioconsultaion.svg",
    },
   {
      title: "Try at home service",
      description: "Try at home service",
      image: "/try/home.svg",
    },
      {
      title: "BIS Hallmark, IGI, GIA",
      description: "BIS Hallmark, IGI, GIA",
      image: "/try/Bis.svg",
    },
     {
      title: "90% value on cash back ",
      description: "90% value on cash back ",
      image: "/try/Vector.svg",
    },

      {
      title: "100% Refund Return with 7 days of delivery",
      description: "100% Refund Return with 7 days of delivery",
      image: "/try/refund.svg",
    },

    {
      title: "Free shipping",
      description: "Free shipping",
      image: "/try/delivery.svg",
    },

    {
      title: "Certified natural diamonds only",
      description: "Certified natural diamonds only",
      image: "/try/Group 1321314094.svg",
    },

    {
      title: "95% Value on exchange",
      description: "95% Value on exchange",
      image: "/try/Group.svg",
    },

   

  

  
  ];

  return (
    <div className="w-full bg-[#F8F4E9]">
      <div className="max-w-container h-full mx-auto justify-between px-4 gap-10 items-center lg:items-stretch flex flex-col-reverse lg:flex-row">
        <div className="flex flex-col justify-center relative">
          <div className="hidden lg:block text-start">
            <p className="text-[56px] font-playfair font-[500] min-w-[430px]">swa promise</p>
            <p className="text-[20px] mt-3 font-[400] text-[#334155] leading-[32px]">
              With timeless charm and radiant grace, Preity <br />
              Zinta embodies the spirit of our jewellery — where <br /> every
              diamond tells a story,
            </p>
          </div>
          <img
            src="/try/diaRing.svg"
            className="w-[200px] lg:w-[337.94px] h-[120px] lg:h-[203.12px] static lg:absolute bottom-0 z-100"
            alt="ring"
          />
        </div>

        <div className="grid lg:grid-cols-4 grid-cols-3 gap-2 lg:gap-8 text-[#334155] py-[1rem] lg:py-[5rem] max-w-[750px] ">
          {data.map((item, index) => (
            <div className="text-center flex flex-col items-center" key={index}>
              <div className="w-[90px] h-[90px] lg:w-[140px] lg:h-[140px] bg-white rounded-full mb-2 flex items-center justify-center">
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
