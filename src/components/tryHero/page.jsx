import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative min-h-[45.75rem]  lg:h-[calc(100vh-90px)] h-[44.7rem] sm:h-[50rem] lg:max-h-[990px] overflow-hidden">
      {/* Container wrapper - responsive max width */}
      <div className="relative max-w-[101rem] mx-auto h-full">
        {/* Background animated blobs - converted to percentage units */}
        <div className="absolute lg:top-[4%] lg:left-[2.5%] lg:w-[37%] lg:h-[60%] top-[3%] left-[3%] w-[40%] h-[40%] rounded-full bg-cyan-200/60 blur-3xl animate-float"></div>
        <div className="absolute lg:right-0 lg:top-[8%] lg:w-[43%] lg:h-[70%] right-0 top-[4%] w-[50%] h-[50%] rounded-full bg-cyan-200/60 blur-3xl animate-float delay-1000"></div>
        <div className="absolute lg:bottom-0 lg:left-[33%] lg:w-[49%] lg:h-[80%] bottom-0 left-[25%] w-[60%] h-[60%] rounded-full bg-cyan-200/60 blur-3xl animate-float delay-2000"></div>

        {/* Exclusive Craftsmanship Text - percentage positioning */}
        <p
          className="absolute lg:text-[1.25rem] lg:w-[38%] lg:h-[3%] lg:top-[13%] lg:left-1/2 lg:transform lg:-translate-x-1/2
                      sm:text-[0.875rem] sm:leading-6 sm:tracking-[0.08em] sm:font-medium sm:text-center sm:top-[2.5%]
                      text-[1.2rem] w-[80%] h-[3%] top-[3%] left-[10%]  
                      flex items-center justify-center font-medium text-[#918676] font-inter"
        >
          #NATURAL DIAMONDS
        </p>

        
         <p className="absolute top-[10%] left-1/2 -translate-x-1/2 lg:hidden z-30 font-british font-normal text-[2.625rem] leading-[100%] tracking-[0.01em] text-center uppercase whitespace-nowrap">
          A<span className="lowercase">s real AS you</span>
        </p>

        {/* AS REAL Image - percentage positioning */}
        <Image
          src="/try/as_real.svg"
          className="absolute hidden lg:flex lg:left-[3.4%] lg:top-[28%] left-[4%] top-[16%] lg:w-[32%] lg:h-auto w-[36%] h-auto"
          width={576}
          height={282}
          alt="As Real"
        />

        {/* YOU Image - percentage positioning */}
        <Image
          src="/try/YOU.svg"
          className="absolute hidden lg:flex lg:left-[64%] lg:top-[34%] right-[2%] top-[16%] lg:w-[11%] lg:h-auto w-[16%] h-auto"
          width={201}
          height={282}
          alt="You"
        />

       

        {/* Star Image - percentage positioning */}
        <Image
          src="/try/star.svg"
          width={116.83}
          height={102.76}
          className="absolute lg:top-[16%] lg:left-[75.8%] lg:w-[6.5%] lg:h-auto 
                     sm:w-[9.2%] sm:h-[8%] sm:top-[13.8%] sm:right-[2.8%] sm:rounded-[0.44rem]
                     right-[1%] top-[12%] w-[8%] h-auto opacity-100"
          alt="star"
        />


        <div className="flex flex-col items-center pt-[9rem] sm:pt-0 sm:block">

       
        {/* Hero Girl Image - percentage positioning */}
   <Image
  src="/try/herogirl.webp"
  className="sm:absolute z-10 ml-[18rem] sm:ml-0
    left-1/2 -translate-x-1/2 bottom-0 
    w-[20rem] sm:w-[22rem] lg:w-[28%] lg:max-w-[500px] h-auto
    opacity-100
    [mask-image:linear-gradient(to_top,transparent,black_40%)]
    [-webkit-mask-image:linear-gradient(to_top,transparent,black_40%)]
    sm:[mask-image:none]
    sm:[-webkit-mask-image:none]"
  width={563}
  height={885}
  priority
  alt="Hero Girl"
/>
        {/* CTA Section - percentage positioning and sizing */}
        <div className=" pt-[.25rem] sm:pt-0 left-[25%] lg:w-[19.6%] lg:h-[14.9%] w-[60%] sm:absolute space-y-2 lg:top-[58%] lg:left-[4%] top-[24.8%] flex items-center flex-col lg:items-start z-10">
          <Image
            src="/try/Rectangle.svg"
            width={88.89}
            height={4}
            alt="decoration"
            className="lg:w-[4.5rem] lg:h-[0.25rem] w-[4rem] h-[0.2rem]"
          />
          <p className="text-[1rem] text-center text-md-start lg:text-left lg:text-[1.1rem] leading-relaxed">
            Check our natural <br />
            diamond jewellery collection
          </p>

          <Link
            href="/rings"
            className="group flex items-center gap-2 bg-[#002D31] text-white lg:px-[1.25rem] lg:py-[.75rem] px-[1rem] py-[.75rem] rounded-lg hover:bg-[#003A3F] transition-colors"
          >
            <span className="lg:text-[0.95rem] text-sm">
              Explore collections
            </span>
            <Image
              src="/try/RightARRow.svg"
              width={24}
              height={24}
              alt="arrow"
              className="lg:w-5 lg:h-5 w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:rotate-45"
            />
          </Link>
        </div>
         </div>

        {/* Video Card - percentage positioning and sizing */}
        <div className="hidden lg:w-[32rem] lg:h-[11rem] w-[20rem] h-[10rem] z-50 lg:flex flex-row justify-between items-center p-[1rem] lg:px-[1.25rem] lg:py-[1rem] rounded-xl shadow-md absolute lg:top-[67.4%] lg:right-[1rem] xl:right-[0rem] bottom-[2%] right-[2%] bg-white/40 backdrop-blur-sm">
          <div className="pl-[1rem] flex-1">
            <p className="lg:text-[0.94rem] text-[0.875rem] pb-[0.5rem] leading-relaxed max-w-[15rem]">
              Discover the artistry of SWA Diamonds as natural rough stones are
              transformed into sparkling masterpieces through precision cutting
              and polishing.
            </p>
            <a
              href="/"
              className="text-[#017480] hover:text-[#015A63] transition-colors underline underline-offset-4 lg:text-[0.875rem] text-[0.75rem] font-medium"
            >
              SEE VIDEO
            </a>
          </div>

          <div className="lg:w-[13rem] lg:h-[9.5rem] w-[8rem] h-[7rem] overflow-hidden rounded-lg flex-shrink-0">
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
