import Image from "next/image";
import Link from "next/link";
import { SiMinutemailer } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import styles from "./footer.module.css";
import MobileFooterAccordion from "./mobile-footer-accordion";
import { filter } from "@/utils/urls";

async function Footer() {
  const fetchCategories = async () => {
    const response = await fetch(filter + "?category=&tag=");
    const data = await response.json();
    console.log("data---------7777--------", data);

    return data.results.data;
  };

  const categories = await fetchCategories();
  const { category: catgSet = [], tags: occation = [] } = categories || {};

  const redirectToSocial = {
    facebook: "https://www.facebook.com/swadiamonds/",
    linkedin: "https://in.linkedin.com/company/swa-diamonds",
    instagram: "https://www.instagram.com/swadiamonds/",
  };

  return (
    <div>
      <div className={styles.Footer}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Image
                className={styles.Logo}
                src={"/Assets/swaLogo.png"}
                alt="Logo"
                width={77}
                height={77}
              />
              <p className={styles.LogoText}>
                Concept of SWA Diamonds came into being from CAPESTONE Ventures
                Pvt Ltd, a leading name in wholesale diamond jewellers market,
                that does business with prominent retail jewellers. Many retail
                jewellers who deal only in gold jewellery are reluctant to add
                diamond jewellery to their stock due to certain factors
              </p>
            </div>

            <div className="col-md-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <h1 className={styles.Title}>General info</h1>
                    <Link className={styles.Links} href="/fa/questions">
                      <p className={styles.Links}>FAQ</p>
                    </Link>
                    <Link className={styles.Links} href="/about-us">
                      <p className={styles.Links}>About us</p>
                    </Link>
                    <Link className={styles.Links} href="/privacy/policy">
                      <p className={styles.Links}>Privacy policy</p>
                    </Link>
                    <Link className={styles.Links} href="/return/policy">
                      <p className={styles.Links}>Return policy</p>
                    </Link>
                    <Link className={styles.Links} href="/terms/condition">
                      <p className={styles.Links}>Terms & conditions</p>
                    </Link>
                    <Link className={styles.Links} href="/product/outlets">
                      <p className={styles.Links}>Outlets</p>
                    </Link>
                  </div>

                  <div className="col-md-4">
                    <h1 className={styles.Title}>Quick links</h1>
                    {catgSet.slice(0, 8).map((item) => (
                      <Link
                        href={`/${item.category.toLowerCase().replace(/\s+/g, "-")}`}
                        key={item.id}
                        className={styles.Links}
                      >
                        <p className={styles.Links}>
                          {item.category.charAt(0).toUpperCase() +
                            item.category.slice(1).toLowerCase()}
                        </p>
                      </Link>
                    ))}
                  </div>

                  <div className="col-md-4">
                    <div className={styles.Link}>
                      {occation.slice(0, 8).map((item) => {
                        const tag = item.tag || "";
                        const capitalizedTag =
                          tag.charAt(0).toUpperCase() +
                          tag.slice(1).toLowerCase();

                        return (
                          <Link
                            href={`/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                            key={item.id}
                            className={styles.Links}
                          >
                            {capitalizedTag}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <p className={styles.Title}>Swa contact info</p>

              <div className={styles.india}>
                <p>INDIA Contact info</p>
              </div>
              <ContactInfo
                address="Ground Floor, 7/688E, Al Wahad, Chenguvetty, Kerala, 676501"
                phone="1800 257 8600"
                email="info@swadiamonds.com"
              />

              <div className={styles.uae}>
                <p>UAE Contact info</p>
              </div>
              <ContactInfo
                address="Mushrif Mall, First Floor, Unit No: 139, 25th st, Airport Road, Al Mushrif, Abu Dhabi"
                phone="02565-9545"
                email="info@swadiamonds.com"
              />

              <p className={`${styles.Title} ${styles.FollowUs} pl-4`}>
                Follow us on
              </p>
              <div className={styles.Icons + " flex"}>
                {Object.entries(redirectToSocial).map(([platform, url]) => (
                  <Link key={platform} href={url} target="_blank">
                    <Image
                      src={`/Assets/${platform}.png`}
                      alt={platform}
                      width={42}
                      height={38}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileFooter
        catgSet={catgSet}
        occation={occation}
        redirectToSocial={redirectToSocial}
      />

      <FooterBottom />
    </div>
  );
}

function MobileFooter({ catgSet, occation, redirectToSocial }) {
  return (
    <>
      <div className={styles.FooterMob}>
        <div className={styles.LogoMobScreen}>
          <Image
            className={styles.Logo}
            src={`/Assets/swaLogo.png`}
            alt=""
            height={40}
            width={40}
          />
        </div>
        <MobileFooterAccordion catgSet={catgSet} occation={occation} />
        <div className={styles.SwaParentInfoMob}>
          <div className={styles.FollowUsMOB}>
            <p
              style={{ paddingLeft: "20px" }}
              className={`${styles.Title} ${styles.FollowUs}`}
            >
              Follow us on
            </p>
            <div className={styles.Icons}>
              <Link href={redirectToSocial.facebook} target="_blank">
                <Image
                  src={`/Assets/facebook.png`}
                  alt="Facebook Logo Image"
                  width={42}
                  height={39}
                />
              </Link>
              <Link href={redirectToSocial.linkedin} target="_blank">
                <Image
                  src={`/Assets/linkedin.png`}
                  alt="LinkedIn"
                  width={42}
                  height={39}
                />
              </Link>
              <Link href={redirectToSocial.instagram} target="_blank">
                <Image
                  src={"/Assets/instagram.png"}
                  alt="Instagram"
                  width={42}
                  height={39}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.FooterDownMob}>
        <div className="">
          <div className="">
            <div className={`${""} ${styles.FootIconImg}`}>
              <div className={styles.FooterIconimg1}>
                <Image
                  src={`/Assets/1.png`}
                  alt="Image1"
                  width={40}
                  height={40}
                />
                <Image
                  src={`/Assets/2.png`}
                  alt="Image2"
                  width={40}
                  height={40}
                />
                <Image
                  src={`/Assets/3.png`}
                  alt="Image3"
                  width={40}
                  height={40}
                />
              </div>
              <div className={styles.FooterIconimg1}>
                <Image
                  src={`/Assets/4.png`}
                  alt="Image4"
                  width={40}
                  height={40}
                />
                <Image
                  src={`/Assets/5.png`}
                  alt="Image5"
                  width={40}
                  height={40}
                />
                <Image
                  src={`/Assets/6.png`}
                  alt="Image6"
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <div className="" style={{ paddingLeft: "0px" }}>
              <p className={styles.FooterDownText}>
                2024 SWA Diamonds | All rights reserved
              </p>
            </div>

            <div className="">
              <p className={styles.FooterDownTextR}>
                Designed & developed by zinfog codelabs
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ContactInfo({ address, phone, email }) {
  return (
    <>
      <div className={styles.Address}>
        <SiMinutemailer size={22} color="#99C7CD" />
        <p className={`${styles.Links} ${styles.AddressText}`}>{address}</p>
      </div>
      <div className={styles.Address}>
        <FaPhoneAlt color="#99C7CD" size={15} />
        <p className={`${styles.Links} ${styles.AddressText}`}>
          Toll Free Number : {phone}
        </p>
      </div>
      <div className={styles.Address}>
        <HiOutlineMail color="#99C7CD" size={20} />
        <p className={`${styles.Links} ${styles.AddressText}`}>{email}</p>
      </div>
    </>
  );
}

function FooterBottom() {
  return (
    <div className={styles.FooterDown}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <p className={styles.FooterDownText}>
              2024 SWA Diamonds | All rights reserved
            </p>
          </div>
          <div className={`col-md-4 ${styles.FootIconImg}`}>
            {[1, 2, 3, 4, 6, 5].map((num) => (
              <Image
                key={num}
                className={styles.FooterIcons}
                src={`/Assets/${num}.png`}
                alt={`Image${num}`}
                width={40}
                height={40}
              />
            ))}
          </div>
          <div className="col-md-4">
            <p className={styles.FooterDownTextR}>
              <Link href="https://zinfog.com/" target="_blank">
                Designed & developed by zinfog codelabs
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
