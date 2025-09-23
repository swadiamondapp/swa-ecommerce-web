"use client";

import React, { useState } from "react";

const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="px-4">
      <button
        onClick={onToggle}
        className="w-full py-4 text-left flex justify-between items-center text-white transition-colors"
      >
        <span className="text-sm font-semibold tracking-wider text-gray-300 uppercase">
          {title}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
      <div className="border-b border-white"></div>
    </div>
  );
};

const AccordionSection = ({ data }) => {
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (index) => {
    setOpenAccordions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="lg:hidden">
      {data.map((section, index) => (
        <AccordionItem
          key={index}
          title={section.title}
          isOpen={openAccordions[index]}
          onToggle={() => toggleAccordion(index)}
        >
          {section.links ? (
            <ul className={section.title === "Quick Links" ? "grid grid-cols-2 gap-x-4 gap-y-2" : "space-y-2"}>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={link.link}
                    className="text-gray-400 hover:text-white text-sm transition-colors block py-1"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            section.content
          )}
        </AccordionItem>
      ))}
    </div>
  );
};

export default AccordionSection;
