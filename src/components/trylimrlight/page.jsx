
import React from "react";
import Image from "next/image";

const articles = [
  {
    title: "The Enduring Allure of the Round Cut: History, Significance, and Modern Appeal",
    description:"Tracing its origins back to the early diamond cuts of the Middle Ages, the round cut has undergone significant evolution. With the advent of advanced cutting techniques and the Tolkowsky’s ideal cut in 1919, the round cut was transformed, achieving unparalleled brilliance and fire.",
    link:"https://swavlog.zinfog.in/the-enduring-allure-of-the-round-cut-history-significance-and-modern-appeal/",
    date: "23.05.25",
    time: "08:20 pm",
  },
  {
    title: "Anatomy of a Ring: Every Part of an Engagement Ring Explained",
    description:"Tracing its origins back to the early diamond cuts of the Middle Ages, the round cut has undergone significant evolution. With the advent of advanced cutting techniques and the Tolkowsky’s ideal cut in 1919, the round cut was transformed, achieving unparalleled brilliance and fire.",
    link:"https://swavlog.zinfog.in/anatomy-of-a-ring-every-part-of-an-engagement-ring-explained/",
    date: "23.05.25",
    time: "08:20 pm",
  },
  {
    title: "Finding Your Forever: Classic Engagement Rings",
    description:"Tracing its origins back to the early diamond cuts of the Middle Ages, the round cut has undergone significant evolution. With the advent of advanced cutting techniques and the Tolkowsky’s ideal cut in 1919, the round cut was transformed, achieving unparalleled brilliance and fire.",
    link:"https://swavlog.zinfog.in/2025-trending-nose-rings-what-to-look-for/",
    date: "23.05.25",
    time: "08:20 pm",
  },
];

const Limelight = () => {
  return (
    <div className="w-full h-fit bg-white">
      <div className="max-w-container mx-auto px-[1rem] lg:h-[906px] h-fit  flex flex-row-reverse justify-center items-center  ">
        {/* Image sticks to right side */}
        <div className=" hidden flex-shrink-0 mt-[7.5rem] lg:flex flex-col items-end">
          <div className="mb-[1.25rem] mr-[.25rem]">
            <a
              href="/blog"
              className=" underline underline-offset-4 !underline h-[30px] text-[#017480] text-[18px] leading-[24px] tracking-[0.06em] hover:text-[#2c2c2c] transition underline underline-offset-4"
            >
              SEE ALL
            </a>
          </div>
          <Image src="/try/limelight.jpeg" width={653} height={647.94} alt="limelight ring "/>
        </div>

        {/* Content takes remaining width */}
        <div className="space-y-[16px] sm:space-y-[24px] flex-1 lg:mr-8 text-left  mt-[3rem] lg:block md:flex md:flex-col md:items-center md:justify-center">
          <h2 className="text-[32px] sm:text-[56px] font-playfair md:mb-0 sm:mb-[2rem]">
            In the Spotlight
          </h2>

          {/* Horizontal line as span */}
          <span className="lg:block w-full h-[1px] bg-gray-300  sm:hidden"></span>

          {/* Mobile image */}
          <Image
            src="/try/limelight.jpeg"
            alt="limelight ring"
            className="pt-[0.5rem] pb-[0.5rem] sm:pt-[0.75rem] sm:pb-[0.75rem] lg:hidden block w-full max-w-[300px] sm:max-w-[653px] mx-auto sm:mx-0"
            width={653}
            height={647.94}
          />

          {articles.map((article, idx) => (
            <div
              className="w-full md:flex md:flex-col md:items-center md:justify-center md:text-center lg:text-start lg:block"
              key={idx}
            >
              <a href={article.link}>
              <h3 className=" text-black text-[18px] sm:text-[24px] leading-[24px] sm:leading-[32px] font-bold pb-[1rem]">
                {article.title}
              </h3></a>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] font-[400] max-w-[653px]">
                {article.description}
              </p>
              <p className="text-[14px] sm:text-[16px] leading-[24px] sm:leading-[32px] mt-[0.5rem] sm:mt-[0.75rem] pb-[2px]">
                {article.date} | {article.time}
              </p>

              {/* Horizontal line as span */}
              <span className="block w-full h-[1px] bg-gray-300 mt-[16px] sm:mt-[24px]"></span>
            </div>
          ))}
            <div className="pb-[1.25rem] lg:hidden w-full flex justify-center">
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
