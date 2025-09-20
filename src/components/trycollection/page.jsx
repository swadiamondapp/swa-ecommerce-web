import React from "react";
import Image from "next/image";

const Collection = () => {
  return (
    <div className="w-full h-[713px] bg-[#FEFDFB]">
      <div className="max-w-container mx-auto h-[713px] bg-[#FEFDFB] relative">
        <Image src="/try/collectiontopProp.svg" width={309.95} height={272.61} alt="collectiontopProp" className="absolute top-[17.92px] left-[1443.71px]" />
        <Image src="/try/collectionbottomProp.svg" width={242.31} height={213.13} alt="collectionbottomProp"  className="absolute top-[461.9px] -left-[152.26px]" />
     

       <div className="flex w-[1330px] h-[662px] flex-col mx-auto  justify-center items-center absolute top-[24px] bottom-[24px] left-[143.41px] ">
      

      <div className="flex w-[1330px] h-[331px]  justify-around items-center">
        <div className="w-[240px] h-[283px]  text-center">
          <Image src="/try/ring.svg" width={240} height={240} alt="RING" />
          <p className="text-[18px] mb-0 mt-3 pb-0 text-[#334155]">RING</p>
        </div>
        <div className="w-[240px] h-[283px]  text-center">
          <Image src="/try/earRing.svg" width={240} height={240} alt="EARRINGS" />
          <p className="text-[18px] mb-0 mt-3 pb-0 text-[#334155]">EARRINGS</p>

        </div>
        <div className="w-[240px] h-[283px]  text-center">
          <Image src="/try/bangle.svg" width={240} height={240} alt="BANGLES" />
          <p className="text-[18px] mb-0 mt-3 pb-0 text-[#334155]">BANGLES</p>
        </div>
        <div className="w-[240px] h-[283px]  text-center">
          <Image src="/try/bracelet.svg" width={240} height={240} alt="BRACELETS" />          
          <p className="text-[18px] mb-0 mt-3 pb-0 text-[#334155]">BRACELETS</p>
        </div>
      
      </div>          


      <div className="flex w-[1330px] h-[331px]  justify-around items-center">
         <div className="w-[240px] h-[283px]  text-center">
          <Image src="/try/chain.svg" width={240} height={240} alt="NACKLACES" />
          <p className="text-[18px] mb-0 mt-3 pb-0 text-[#334155]">NACKLACES</p>
        </div>
        <div className="w-[240px] h-[283px]  text-center">
          <Image src="/try/nosepin.svg" width={240} height={240} alt="NOSE PINS" />
          <p className="text-[18px] mb-0 mt-3 pb-0 text-[#334155]">NOSE PINS</p>
        </div>
        <div className="w-[240px] h-[283px]  text-center">
          <Image src="/try/pendent.svg" width={240} height={240} alt="PENDANTS" />
          <p className="text-[18px] mb-0 mt-3 pb-0 text-[#334155]">PENDANTS</p>
        </div>
        <div className="w-[240px] h-[283px]  text-center">
          <Image src="/try/charms.svg" width={240} height={240} alt="CHARMS" />
          <p className="text-[18px] mb-0 mt-3 pb-0 text-[#334155]">CHARMS</p>
        </div>
      </div>



       </div>


        
      
      </div>
    </div>
  );
};

export default Collection;
