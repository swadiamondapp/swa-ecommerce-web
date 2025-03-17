"use client";

import { useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import Classes from "./footer.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SiMinutemailer } from "react-icons/si";
import Link from "next/link";

export default function MobileFooterAccordion({ catgSet, occation }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const catSelHandler = (id) => {
    console.log(id);
  };

  const occationSelHandler = (id) => {
    console.log(id);
  };
  
  return (
    <div className={Classes.ParentCollaps}>
      <Accordion
        multiple
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <AccordionTab header="About us">
          <p
            style={{
              color: "#fff",

              textAlign: "justify",
              fontSize: "15px",
            }}
          >
            Concept of SWA Diamonds came into being from CAPESTONE Ventures Pvt
            Ltd, a leading name in wholesale diamond jewellers market, that does
            business with prominent retail jewellers. Many retail jewellers who
            deal only in gold jewellery are reluctant to add diamond jewellery
            to their stock due to certain factors
          </p>
        </AccordionTab>

        <AccordionTab header="Policies">
          <div className={Classes.PolicyLinks}>
            <a
              href="/privacy/policy"
              className={`${Classes.Links} ${Classes.a}`}
            >
              Privacy policy
            </a>
            <a
              href="/return/policy"
              className={`${Classes.Links} ${Classes.a}`}
            >
              Return policy
            </a>
            <a
              href="/terms/condition"
              className={`${Classes.Links} ${Classes.a}`}
            >
              Terms & conditions
            </a>
          </div>
        </AccordionTab>
        <AccordionTab header="franchise enquiry">
          <div className={Classes.PolicyLinks}>
            <a href="/" className={`${Classes.Links} ${Classes.a}`}>
              oms.mirrordiamonds.com
            </a>
            <a href="/" className={`${Classes.Links} ${Classes.a}`}>
              franchise.mirrordiamonds.com
            </a>
            <a href="/" className={`${Classes.Links} ${Classes.a}`}>
              swarepairtest.zinfog.com
            </a>
          </div>
        </AccordionTab>
        <AccordionTab header="Outlets">
          <p className="m-0"></p>
        </AccordionTab>
        <AccordionTab header="Quick links">
          <div className="m-0">
            <a href="/fa/questions" className={`${Classes.Links} ${Classes.a}`}>
              Faq
            </a>
            <div className={Classes.MobQuicklinks}>
              <div className="flex flex-col">
                {catgSet.slice(0, 15).map((item, index) => {
                  return (
                    <Link
                      className={Classes.Links}
                      href={`/${item.category.toLowerCase().replace(/\s+/g, '')}`}
                      style={{ color: "#ffff", cursor: "pointer" }}
                      key={index}
                    >
                      {item.category}{" "}
                    </Link>
                  );
                })}
                {occation.slice(0, 8).map((item, index) => {
                  return (
                    <Link
                      className={Classes.Links}
                      style={{ color: "#ffff", cursor: "pointer" }}
                      key={index}
                      href={`/${item.tag?.toLowerCase().replace(/\s+/g, '')}`}
                    >
                      {item.tag}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </AccordionTab>
        <AccordionTab header="Swa contact info">
          <div className={Classes.SwaAddresMob}>
            <div className={Classes.india}>
              <p>INDIA Contact info</p>
            </div>
            <div className={Classes.Address}>
              <SiMinutemailer
                size={28}
                color="#99C7CD"
                className={Classes.AddressText}
              />
              <p className={`${Classes.Links} ${Classes.AddressText}`}>
                Ground Floor, 7/688E, Al Wahad, Chenguvetty, Kerala, 676501
              </p>
            </div>
            <div className={Classes.Address}>
              <FaPhoneAlt
                color="#99C7CD"
                size={15}
                className={Classes.AddressText}
              />
              <p className={`${Classes.Links} ${Classes.AddressText}`}>
                Toll Free Number : 1800 257 8600
              </p>
            </div>
            <div className={Classes.Address}>
              <HiOutlineMail
                color="#99C7CD"
                size={20}
                className={Classes.AddressText}
              />
              <p className={`${Classes.Links} ${Classes.AddressText}`}>
                info@swadiamonds.com
              </p>
            </div>
            <div className={Classes.uae}>
              <p>UAE Contact info</p>
            </div>
            <div className={Classes.Address}>
              <SiMinutemailer
                size={28}
                color="#99C7CD"
                className={Classes.AddressText}
              />
              <p className={`${Classes.Links} ${Classes.AddressText}`}>
                Mushrif Mall, First Floor, Unit No: 139, 25th st, Airport Road,
                Al Mushrif, Abu Dhabi , PO BOX: 4048, United Arab Emirates.
              </p>
            </div>
            <div className={Classes.Address}>
              <FaPhoneAlt
                color="#99C7CD"
                size={15}
                className={Classes.AddressText}
              />
              <p className={`${Classes.Links} ${Classes.AddressText}`}>
                Toll Free Number : 02565-9545
              </p>
            </div>
            <div className={Classes.Address}>
              <HiOutlineMail
                color="#99C7CD"
                size={20}
                className={Classes.AddressText}
              />
              <p className={`${Classes.Links} ${Classes.AddressText}`}>
                info@swadiamonds.com
              </p>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  );
}
