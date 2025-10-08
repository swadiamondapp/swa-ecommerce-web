import React from "react";
import Image from "next/image";
import AccordionSection from "./AccordionSection";

const SubscribeNewsletter = () => {
  return (
    <div className="border-b border-gray-800 py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl max-w-[200px] sm:max-w-full text-white font-playfair mb-8 tracking-wide">
          Customisation Enquiry
        </h2>

        <div className="flex flex-row gap-2 sm:gap-4 w-full justify-stretch sm:justify-center">
          <input
            type="email"
            placeholder="EMAIL*"
            className="w-full max-w-[500px] px-[2rem] py-[1rem] bg-white text-black text-sm font-medium placeholder-gray-500 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button className="px-[1.5rem] py-[1rem] bg-[#017480] text-white font-semibold rounded-md justify-center transition-colors duration-200 flex items-center gap-2">
            Enquire <span className="hidden sm:inline-block">Now</span>
            <Image
              src="/try/arrowwhite.svg"
              width={20}
              height={20}
              alt="arrow"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const data = [
    {
      title: "Free shipping",
      image: "/try/shipping.svg",
    },
    {
      title: "CERTIFIED NATURAL DIAMONDS",
      image: "/try/diafooter.svg",
    },
    {
      title: "100% Certified jewellery",
      image: "/try/certified.svg",
    },
    {
      title: "Lifetime Exchange & Buyback",
      image: "/try/lifetime.svg",
    },
  ];
  return (
    <div className="border-b border-gray-800 py-6 lg:py-10">
      <div className="max-w-container mx-auto px-4 text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-5">
       {data.map((item, index) => (
        <div key={index} className="text-white flex flex-row items-center lg:justify-center justify-start gap-2">
          <Image src={item.image} alt={item.title} width={24} height={24} objectFit="contain" className="w-[24px] h-[24px] lg:w-[44px] lg:h-[24px] text-white" />
          <p>{item.title}</p>
        </div>
       ))}
      </div>
    </div>
  );
};

const GeneralInfo = () => {
  const data = [
    {
      title: "General Info",
      links: [
        {
          title: "Faq",
          link: "/fa/questions",
        },
        {
          title: "Contact Us",
          link: "/contact-us",
        },
        {
          title: "About Us",
          link: "/about-us",
        },
        {
          title: "Privacy Policy",
          link: "/privacy/policy",
        },
        {
          title: "Return Policy",
          link: "/return/policy",
        },
        {
          title: "Terms & Conditions",
          link: "/terms/condition",
        },
        {
          title: "Outlets",
          link: "/product/outlets",
        },
      ],
    },
    {
      title: "Quick Links",
      links: [
        {
          title: "Offers",
          link: "/offers",
        },
        {
          title: "Earrings",
          link: "/earrings",
        },
        {
          title: "Devotional",
          link: "/devotional",
        },
        {
          title: "Bangle",
          link: "/bangles",
        },
        {
          title: "Bracelet",
          link: "/bracelets",
        },
        {
          title: "Platinum",
          link: "/platinum",
        },
        {
          title: "Solitaire",
          link: "/solitaire",
        },
        {
          title: "Pendant",
          link: "/pendants",
        },
        {
          title: "Rings",
          link: "/rings",
        },
        {
          title: "Nose Pin",
          link: "/nosepins",
        },
        {
          title: "Couple band",
          link: "/couple-band",
        },
        {
          title: "Nacklace",
          link: "/necklaces",
        },
        {
          title: "Navaratna",
          link: "/navaratna",
        },
        {
          title: "Clip bangle",
          link: "/clip-bangle",
        },
        {
          title: "Pendant with chain",
          link: "/pendant-with-chain",
        },
        {
          title: "Kids",
          link: "/kids",
        },
      ],
    },
    {
      title: "Contact info",
      content: (
        <>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wider mb-6 text-gray-300 uppercase">INDIA Contact info</h3>
          <div className="flex items-start gap-3">
            <Image
              src="/try/location.svg"
              className="pt-1"
              width={16}
              height={16}
              alt="location"
            />
            <div className="text-sm leading-6 text-gray-300">
              FIRST FLOOR,PLOT NO. F11,12, SUB PLOT NO.15, C-4, 
              GEETA APPARELS PVT LTD WESTERN INDUSTRIAL CO-OP ESTATE LTD,<br />
               MIDC MAROL, CENTRAL ROAD, OPP SEEPZ, ANDHERI EAST, Mumbai, <br />
                Maharashtra, 400093
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/try/phone.svg"
              width={16}
              height={16}
              alt="phone"
            />
            <div className="text-sm leading-6 text-gray-300">
              Toll Free Number : 1800 257 8600
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/try/mail.svg"
              width={19}
              height={16}
              alt="email"
            />
            <div className="text-sm leading-6 text-gray-300">
              info@swadiamonds.com
            </div>
          </div>
        </div>
        <div className="space-y-4 pt-[2rem]">
          <h3 className="text-sm font-semibold tracking-wider mb-6 text-gray-300 uppercase">UAE Contact info</h3>
          <div className="flex items-start gap-3">
            
            <Image
              src="/try/location.svg"
              className="pt-1"
              width={16}
              height={16}
              alt="location"
            />
            <div className="text-sm leading-6 text-gray-300">
              Mushrif Mall, First Floor, Unit No: 139, 25th st, Airport Road, Al Mushrif, Abu Dhabi
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/try/phone.svg"
              width={16}
              height={16}
              alt="phone"
            />
            <div className="text-sm leading-6 text-gray-300">
              Toll Free Number : 02565-9545
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/try/mail.svg"
              width={19}
              height={16}
              alt="email"
            />
            <div className="text-sm leading-6 text-gray-300">
              info@swadiamonds.com
            </div>
          </div>
        </div>
        </>
      )
      
    }
    
  ];

  return (
    <div className="py-6 lg:py-0">
      <AccordionSection data={data}  />
      <div className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {data.map((section, index) => (
          <div key={index} className={`text-white py-6 border-l ${index === 0 ? 'border-l-0' : 'border-l pl-6'} border-gray-800`}>
            {section.title !== "Contact info" && <h3 className="text-sm font-semibold tracking-wider mb-6 text-gray-300 uppercase">
              {section.title}
            </h3>
            }
            {section.links ? (
              <ul className={section.title === "Quick Links" ? "grid grid-cols-2 gap-x-8 gap-y-2" : "space-y-2"}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.link}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              section.content
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CompanyInfo = () => {
  return (
    <div className="py-4 border-t-0 lg:border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 pb-14 lg:pb-4 text-center flex flex-col items-start lg:items-center">
        <div className="mb-4 flex justify-center w-full">
          <Image
            src="/try/logowhite.svg"
            width={96.58}
            height={81.29}
            className="w-14 h-14 lg:w-24 lg:h-24"
            alt="SWA Diamonds Logo"
          />
        </div>
        <div className="w-full flex justify-center">
          <p className="text-[12px] text-center lg:max-w-[700px] text-gray-400 leading-relaxed   lg:text-center">
            Concept of SWA Diamonds came into being from CAPESTONE Ventures
            Pvt Ltd, a leading name in wholesale diamond jewellers market,
            that does business with prominent retail jewellers. Many retail
            jewellers who deal only in gold jewellery are reluctant to add
            diamond jewellery to their stock due to certain factors
          </p>
        </div>
      </div>
    </div>
  );
};

const TFooter = () => {
  return (
    <div className="w-full bg-[#07060B] flex flex-col">
      <SubscribeNewsletter />
      <Features />
      <GeneralInfo />
      <CompanyInfo />
    </div>
  );
};

export default TFooter;
