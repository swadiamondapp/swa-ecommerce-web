// app/components/Footer/Footer.tsx
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SiMinutemailer } from "react-icons/si"
import { FaPhoneAlt } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import { Accordion, AccordionTab } from "primereact/accordion"
import { getCategories } from '../../api/categories' // Implement this to fetch categories
import styles from './Footer.module.css'

async function Footer() {
  const data = await getCategories()
  const { category: catgSet = [], tags: occation = [] } = data?.results?.data || {}
  
  const redirectToSocial = {
    facebook: 'https://www.facebook.com/swadiamonds/',
    linkedin: 'https://in.linkedin.com/company/swa-diamonds',
    instagram: 'https://www.instagram.com/swadiamonds/'
  }

  return (
    <div>
      <div className={styles.Footer}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Image 
                className={styles.Logo} 
                src="/assets/swaLogo.png"
                alt="Logo"
                width={150}
                height={50}
              />
              <p className={styles.LogoText}>
                Concept of SWA Diamonds came into being from CAPESTONE Ventures
                Pvt Ltd, a leading name in wholesale diamond jewellers market...
              </p>
            </div>

            <div className="col-md-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <h1 className={styles.Title}>General info</h1>
                    <div className={styles.Links}>
                      <Link href="/fa/questions">FAQ</Link>
                      <Link href="/about-us">About us</Link>
                      <Link href="/privacy/policy">Privacy policy</Link>
                      <Link href="/return/policy">Return policy</Link>
                      <Link href="/terms/condition">Terms & conditions</Link>
                      <Link href="/product/outlets">Outlets</Link>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <h1 className={styles.Title}>Quick links</h1>
                    {catgSet.slice(0, 8).map((item) => (
                      <Link 
                        href={`/new/arrivals?category=${item.id}`}
                        key={item.id}
                        className={styles.Links}
                      >
                        {item.category.charAt(0).toUpperCase() + 
                         item.category.slice(1).toLowerCase()}
                      </Link>
                    ))}
                  </div>

                  <div className="col-md-4">
                    <div className={styles.Link}>
                      {occation.slice(0, 8).map((item) => {
                        const tag = item.tag || ""
                        const capitalizedTag = tag.charAt(0).toUpperCase() + 
                                            tag.slice(1).toLowerCase()
                        
                        return (
                          <Link
                            href={`/new/arrivals?occasion=${item.id}`}
                            key={item.id} 
                            className={styles.Links}
                          >
                            {capitalizedTag}
                          </Link>
                        )
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

              <p className={`${styles.Title} ${styles.FollowUs}`}>
                Follow us on
              </p>
              <div className={styles.Icons}>
                {Object.entries(redirectToSocial).map(([platform, url]) => (
                  <Link key={platform} href={url} target="_blank">
                    <Image
                      src={`/assets/${platform}.png`}
                      alt={platform}
                      width={30}
                      height={30}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <MobileFooter 
        catgSet={catgSet}
        occation={occation}
        redirectToSocial={redirectToSocial}
      />

      <FooterBottom />
    </div>
  )
}

function ContactInfo({ address, phone, email }) {
  return (
    <>
      <div className={styles.Address}>
        <SiMinutemailer size={22} color="#99C7CD" />
        <p className={styles.AddressText}>{address}</p>
      </div>
      <div className={styles.Address}>
        <FaPhoneAlt color="#99C7CD" size={15} />
        <p className={styles.AddressText}>
          Toll Free Number : {phone}
        </p>
      </div>
      <div className={styles.Address}>
        <HiOutlineMail color="#99C7CD" size={20} />
        <p className={styles.AddressText}>{email}</p>
      </div>
    </>
  )
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
            {[1,2,3,4,6,5].map((num) => (
              <Image
                key={num}
                className={styles.FooterIcons}
                src={`/assets/${num}.png`}
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
  )
}

export default Footer