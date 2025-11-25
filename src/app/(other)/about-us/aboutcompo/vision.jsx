"use client";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});
export default function VisionMission() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col max-w-[1920px] w-full">
        {/* First Row */}
        <div className="flex lg:flex-row flex-col bg-white w-full h-[778px]">
          {/* Left Image */}
          <div className="relative flex-1 h-full">
            <Image
              src="/Assets/cresent.svg"
              alt="cresent"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="flex-1 h-full flex justify-center items-center ">
            <div className="px-[.75rem] sm:p-10 ">
              <p className="sm:text-[56px] text-[32px] md:leading-[63px] leading-[40px] pb-3 font-medium font-playfair lg:block hidden">
                Vision
              </p>
              <p className="sm:text-[20px] text-[16px] md:leading-[32px] leading-[25px] text-[#334155] lg:block hidden  ">
                Concept of SWA Diamonds came into being from CAPESTONE Ventures
                Pvt Ltd, a leading name in wholesale diamond jewellers market,
                that does business with prominent retail jewellers. Many retail
                jewellers who deal only in gold jewellery are reluctant to add
                diamond jewellery to their stock due to certain factors. Lack of
                knowledge and experience in dealing with the quality checking of
                diamonds and difficulty in buying and selling diamond jewellery
                are their primary concerns. Terms and conditions of buy back,
                the understanding needed to use suitable packing materials for
                diamonds that should be different from the ones used for gold
                ornaments and repairing of diamond jewellery are the other
                reasons cited by most retailers who have the ability to trade
                diamond jewellery.
              </p>
              <p className="sm:text-[56px] text-[32px] md:leading-[63px] leading-[40px] pb-3 font-medium font-playfair block lg:hidden text-center">
                Vision
              </p>
              <p className="lg:text-[20px] text-[16px] md:leading-[32px] leading-[25px] text-[#334155] lg:hidden block text-center ">
                Concept of SWA Diamonds came into being from CAPESTONE Ventures
                Pvt Ltd, a leading name in wholesale diamond jewellers market,
                that does business with prominent retail jewellers. Many retail
                jewellers who deal only in gold jewellery are reluctant to add
                diamond jewellery to their stock due to certain factors. Lack of
                knowledge and experience in dealing with the quality checking of
                diamonds and difficulty in buying and selling diamond jewellery
                are their primary concerns. Terms and conditions of buy back,
                the understanding needed to use suitable packing materials for
                diamonds that should be different from the ones used for gold
                ornaments and repairing of diamond jewellery are the other
                reasons cited by most retailers who have the ability to trade
                diamond jewellery.
              </p>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex lg:flex-row-reverse flex-col-reverse bg-white w-full h-[778px]">
          {/* Left Image */}
          <div className="relative flex-1 h-full">
            <Image
              src="/Assets/handarings.svg"
              alt="Hand ring"
              fill
              className="object-cover"
            />
          </div>

          {/* left Text */}
          <div className="flex-1 h-full flex justify-center items-center ">
            <div className="px-[.75rem] sm:p-10 ">
              <p className="sm:text-[56px] md:leading-[63px] leading-[40px] pb-3 text-[32px] font-medium font-playfair lg:block hidden ">
                Mission
              </p>
              <p className="sm:text-[20px] text-[16px] md:leading-[32px] leading-[25px] text-[#334155] lg:block hidden ">
                Concept of SWA Diamonds came into being from CAPESTONE Ventures
                Pvt Ltd, a leading name in wholesale diamond jewellers market,
                that does business with prominent retail jewellers. Many retail
                jewellers who deal only in gold jewellery are reluctant to add
                diamond jewellery to their stock due to certain factors. Lack of
                knowledge and experience in dealing with the quality checking of
                diamonds and difficulty in buying and selling diamond jewellery
                are their primary concerns. Terms and conditions of buy back,
                the understanding needed to use suitable packing materials for
                diamonds that should be different from the ones used for gold
                ornaments and repairing of diamond jewellery are the other
                reasons cited by most retailers who have the ability to trade
                diamond jewellery.
              </p>
              <p className="sm:text-[56px] md:leading-[63px] leading-[40px] pb-3 text-[32px] font-medium font-playfair lg:hidden block text-center ">
                Mission
              </p>
              <p className="lg:text-[20px] text-[16px] md:leading-[32px] leading-[25px] text-[#334155] lg:hidden block text-center ">
                Concept of SWA Diamonds came into being from CAPESTONE Ventures
                Pvt Ltd, a leading name in wholesale diamond jewellers market,
                that does business with prominent retail jewellers. Many retail
                jewellers who deal only in gold jewellery are reluctant to add
                diamond jewellery to their stock due to certain factors. Lack of
                knowledge and experience in dealing with the quality checking of
                diamonds and difficulty in buying and selling diamond jewellery
                are their primary concerns. Terms and conditions of buy back,
                the understanding needed to use suitable packing materials for
                diamonds that should be different from the ones used for gold
                ornaments and repairing of diamond jewellery are the other
                reasons cited by most retailers who have the ability to trade
                diamond jewellery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
