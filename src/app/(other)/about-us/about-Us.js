"use client";

import React from "react";

import { Inter } from "next/font/google";
import Image from "next/image";
import VisionMission from "./aboutcompo/vision";
import Swapromise from "./aboutcompo/Swapromise";
import Queen from "./aboutcompo/Queen";
import BrandZinda from "./aboutcompo/brandZinda";
import Manufactor from "./aboutcompo/manufactor";
const inter = Inter({
  subsets: ["latin"],
});

function AboutUsPage() {
  return (
    <div className={`${inter.className}` }>
      <div className="container min-h-screen ">
        <div className="flex lg:flex-row lg:mt-10 lg:gap-16 flex-col h-full ">
          <div className="w-full mt-10 leading-[32px] ">
            <h1 className="text-[16px] font-[400px] text-[#918676] hidden lg:block">
              WHO WE ARE
            </h1>
            <h1 className="md:text-[56px] text-[36px] font-[500px] font-playfair hidden lg:block">
              SWA Diamonds
            </h1>

            <h1 className="text-[16px] font-[400px] text-[#918676] block lg:hidden text-center">
              WHO WE ARE
            </h1>
            <h1 className="md:text-[56px] text-[36px] font-[500px] font-playfair block lg:hidden text-center">
              SWA Diamonds
            </h1>

            <div className="text-[#334155] lg:text-[20px] sm:text-[16px] text-[13.5px] flex flex-col gap-4 mt-6 text-center ">
              <div className="lg:hidden block">
              <p>
                Concept of SWA Diamonds came into being from CAPESTONE Ventures
                Pvt Ltd, a leading name in wholesale diamond jewellers market,
                that does business with prominent retail jewellers. Many retail
                jewellers who deal only in gold jewellery are reluctant to add
                diamond jewellery to their stock due to certain factors.
              </p>
              <p>
                {" "} 
                Lack of knowledge and experience in dealing with the quality
                checking of diamonds and difficulty in buying and selling
                diamond jewellery are their primary concerns. Terms and
                conditions of buy back, the understanding needed to use suitable
                packing materials for diamonds that should be different from the
                ones used for gold ornaments and repairing of diamond jewellery
                are the other reasons cited by most retailers who have the
                ability to trade diamond jewellery.
              </p>

              <p>
                {" "}
                On understanding the scenario, we brought SWA Diamonds to life
                that will ease diamond and platinum jewellery business.
              </p>
              </div>
            </div>
             <div className="text-[#334155] lg:text-[20px] sm:text-[16px] text-[13.5px] lg:block hidden  ">
              <div className=" flex flex-col gap-4 ">
              <p>
                Concept of SWA Diamonds came into being from CAPESTONE Ventures
                Pvt Ltd, a leading name in wholesale diamond jewellers market,
                that does business with prominent retail jewellers. Many retail
                jewellers who deal only in gold jewellery are reluctant to add
                diamond jewellery to their stock due to certain factors.
              </p>
              <p>
                {" "} 
                Lack of knowledge and experience in dealing with the quality
                checking of diamonds and difficulty in buying and selling
                diamond jewellery are their primary concerns. Terms and
                conditions of buy back, the understanding needed to use suitable
                packing materials for diamonds that should be different from the
                ones used for gold ornaments and repairing of diamond jewellery
                are the other reasons cited by most retailers who have the
                ability to trade diamond jewellery.
              </p>

              <p>
                {" "}
                On understanding the scenario, we brought SWA Diamonds to life
                that will ease diamond and platinum jewellery business.
              </p>
              
              </div>
            </div>
          </div>
          <div className="w-full justify-center items-center flex">
            <Image
              src="/try/store.svg"
              width={690.64}
              height={670.64}
              alt="store"
              className="w-[690.64px] h-[670.64px] relative z-1 mt-10"
            />
          </div>
        </div>
      </div>
      {/* blue screen */}

      <div className="h-[600px] bg-[#002D31] w-full">
        <div className="container flex lg:flex-row items-center justify-center h-full flex-col w-full gap-4">
          <div className="flex w-full justify-center ">
            <Image
              src="/Assets/swaLogo.svg"
              alt="swa"
              height={241}
              width={300}
              className="md:h-[271.55px] md:w-[322.64px] h-[100px] w-[150px]"
            />
          </div>

          <div className="flex flex-col gap-2 justify-center w-full">
            <h1 className="md:text-[56px] text-[36px] font-[500px] font-playfair text-[#FCFBFC] hidden lg:block">
              Brand Stories
            </h1>
            <h1 className="md:text-[56px] text-[36px] font-[500px] font-playfair text-[#FCFBFC] lg:hidden block text-center">
              Brand Stories
            </h1>

            <p className="font-[400px] lg:text-[20px] sm:text-[16px] text-[13.5px] text-[#FCFBFC] hidden lg:block">
              Concept of SWA Diamonds came into being from CAPESTONE Ventures
              Pvt Ltd, a leading name in wholesale diamond jewellers market,
              that does business with prominent retail jewellers. Many retail
              jewellers who deal only in gold jewellery are reluctant to add
              diamond jewellery to their stock due to certain factors.
            </p>
            <p className="font-[400px] lg:text-[20px] sm:text-[16px] text-[13.5px] text-[#FCFBFC] block lg:hidden text-center">
              Concept of SWA Diamonds came into being from CAPESTONE Ventures
              Pvt Ltd, a leading name in wholesale diamond jewellers market,
              that does business with prominent retail jewellers. Many retail
              jewellers who deal only in gold jewellery are reluctant to add
              diamond jewellery to their stock due to certain factors.
            </p>
          </div>
        </div>
      </div>
      <VisionMission />
      {/* <OurJourney /> */}
      <Swapromise />
      <Queen />

      <BrandZinda />
      <Manufactor />
    </div>
  );
}

export default AboutUsPage;
