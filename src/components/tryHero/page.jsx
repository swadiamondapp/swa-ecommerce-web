import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full lg:h-[61.875rem] h-[50rem] overflow-hidden">
      {/* Container wrapper - responsive max width */}
      <div className="relative max-w-[101rem] mx-auto h-full">
        {/* Background animated blobs - converted to percentage units */}
        <div className="absolute lg:top-[4%] lg:left-[2.5%] lg:w-[37%] lg:h-[60%] top-[3%] left-[3%] w-[40%] h-[40%] rounded-full bg-cyan-200/60 blur-3xl animate-float"></div>
        <div className="absolute lg:right-0 lg:top-[8%] lg:w-[43%] lg:h-[70%] right-0 top-[4%] w-[50%] h-[50%] rounded-full bg-cyan-200/60 blur-3xl animate-float delay-1000"></div>
        <div className="absolute lg:bottom-0 lg:left-[33%] lg:w-[49%] lg:h-[80%] bottom-0 left-[25%] w-[60%] h-[60%] rounded-full bg-cyan-200/60 blur-3xl animate-float delay-2000"></div>

        {/* Exclusive Craftsmanship Text - percentage positioning */}
        <p
          className="absolute lg:text-[1.5rem] lg:w-[38%] lg:h-[3%] lg:top-[14.3%] lg:left-1/2 lg:transform lg:-translate-x-1/2
                      sm:text-[0.875rem] sm:leading-6 sm:tracking-[0.08em] sm:font-medium sm:text-center sm:top-[2.5%]
                      text-[1.2rem] w-[80%] h-[3%] top-[8%] left-[10%]  
                      flex items-center justify-center font-medium text-[#918676] font-inter"
        >
          #EXCLUSIVE CRAFTSMANSHIP
        </p>

        {/* Hero Girl Image - percentage positioning */}
        <Image
          src="/try/girlHero.svg"
          className="absolute 
             lg:left-[37%] lg:top-[20.9%] lg:w-[35%] lg:h-[89%] lg:transform-none
             sm:w-[54%] sm:h-[61%] sm:top-[39.8%] sm:pt-5
             md:left-[26.5%] md:top-[39.8%] md:h-[61%] md:w-[54%]
             left-[22%] -bottom-2 w-[70%] h-[62%] opacity-100"
          width={563}
          height={885}
          priority
          alt="Hero Girl"
        />

        {/* AS REAL Image - percentage positioning */}
        <Image
          src="/try/as_real.svg"
          className="absolute hidden lg:flex lg:left-[1.4%] lg:top-[25.9%] left-[2%] top-[16%] lg:w-[35.6%] lg:h-[28.5%] w-[36%] h-auto"
          width={576}
          height={282}
          alt="As Real"
        />

        {/* YOU Image - percentage positioning */}
        <Image
          src="/try/YOU.svg"
          className="absolute hidden lg:flex lg:left-[62%] lg:top-[32.3%] right-[2%] top-[16%] lg:w-[12.4%] lg:h-[28.5%] w-[16%] h-auto"
          width={201}
          height={282}
          alt="You"
        />

        <p className="absolute top-[14.8%] left-1/2 -translate-x-1/2 lg:hidden z-30 font-british font-normal text-[2.625rem] leading-[100%] tracking-[0.01em] text-center uppercase whitespace-nowrap">
          A<span className="lowercase">s real AS you</span>
        </p>

        {/* Star Image - percentage positioning */}
        <Image
          src="/try/star.svg"
          width={116.83}
          height={102.76}
          className="absolute lg:top-[20.9%] lg:left-[75.8%] lg:w-[7.2%] lg:h-[10.4%] 
                     sm:w-[9.2%] sm:h-[8%] sm:top-[13.8%] sm:right-[2.8%] sm:rounded-[0.44rem]
                     right-[1%] top-[12%] w-[8%] h-auto opacity-100"
          alt="star"
        />

        {/* CTA Section - percentage positioning and sizing */}
        <div className="left-[25%] lg:w-[19.6%] lg:h-[14.9%] w-[55%] absolute space-y-3 lg:top-[53.8%] lg:left-[1.8%] top-[24.8%] flex items-center flex-col lg:items-start z-10">
          <Image
            src="/try/Rectangle.svg"
            width={88.89}
            height={4}
            alt="decoration"
            className="lg:w-[5.56rem] lg:h-[0.25rem] w-[4rem] h-[0.2rem]"
          />
          <p className="text-[1rem] text-center lg:text-left lg:text-[1.25rem] leading-relaxed">
            Check our natural <br />
            diamond jewellery collection
          </p>

          <button className="flex items-center gap-2 bg-[#002D31] text-white lg:px-6 lg:py-4 px-4 py-3 rounded-lg hover:bg-[#003A3F] transition-colors">
            <span className="lg:text-base text-sm">Explore collections</span>
            <Image
              src="/try/RightARRow.svg"
              width={24}
              height={24}
              alt="arrow"
              className="lg:w-6 lg:h-6 w-5 h-5"
            />
          </button>
        </div>

        {/* Video Card - percentage positioning and sizing */}
        <div className="hidden lg:w-[31.8%] lg:h-[19.7%] w-[50%] h-[20%] z-50 lg:flex flex-row justify-between items-center lg:p-2 lg:px-4 p-2 rounded-xl shadow-md absolute lg:top-[67.4%] lg:right-4 xl:right-0 bottom-[2%] right-[2%] bg-white/40 backdrop-blur-sm">
          <div className="lg:pl-4 pl-2 flex-1">
            <p className="lg:text-[0.94rem] text-sm pb-2 leading-relaxed max-w-[240px]">
              Discover the artistry of SWA 
              Diamonds as natural rough stones
              are transformed into sparkling
              masterpieces through precision
              cutting and polishing.
            </p>
            <a
              href="/"
              className="text-[#017480] hover:text-[#015A63] transition-colors underline underline-offset-4 lg:text-sm text-xs font-medium"
            >
              SEE VIDEO
            </a>
          </div>
          <div className="lg:w-[41.3%] lg:h-[90%] w-[40%] h-[70%] overflow-hidden rounded-lg flex-shrink-0">
            <video
              src="/try/diaVedio.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;