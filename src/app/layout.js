import { Lato, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

import CountryProvider from "@/providers/country-provider";
import AuthProvider from "@/providers/auth-provider";
import DataProvider from "@/providers/data-provider";
import QueryProvider from "@/providers/query-provider";
import { AddressProvider } from "@/providers/address-provider";
import { CheckoutProvider } from "@/providers/checkout-provider";
import { OrderProvider } from "@/providers/order-provider";
import { CartProvider } from "@/providers/cart-provider";
import { TrialProvider } from "@/providers/trial-provider";
import { TrackOrderProvider } from "@/providers/trackorder-provider";

/* REMOVE TEMPORARILY */
/* 
import Header from "@/components/tryHeader/page";
import TFooter from "@/components/tryfooter/page";
*/

const lato = Lato({
  weight: ["400", "700"],
  variable: "--font-lato",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-gilroy",
});

const britishCastilla = localFont({
  src: [
    {
      path: "../../public/fonts/British_Castilla.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-britishCastilla",
});

const BrittanySign = localFont({
  src: [
    {
      path: "../../public/fonts/BrittanySignature.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-BrittanySign",
});

export const metadata = {
  title: "SWA Diamonds | Website Under Maintenance",

  description:
    "SWA Diamonds website is temporarily under maintenance. We’ll be back shortly with an enhanced luxury jewellery shopping experience.",

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-scrollbar">

      <head>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8XNJ195QEF"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8XNJ195QEF');
          `}
        </Script>

      </head>

      <body
        className={`${lato.variable} ${gilroy.variable} ${playfair.variable} ${britishCastilla.variable} ${BrittanySign.variable} no-scrollbar bg-black text-white`}
      >

        <QueryProvider>
          <AuthProvider>
            <CountryProvider>
              <DataProvider>
                <AddressProvider>
                  <CheckoutProvider>
                    <OrderProvider>
                      <CartProvider>
                        <TrialProvider>
                          <TrackOrderProvider>

                            {/* HEADER REMOVED */}
                            {/* FOOTER REMOVED */}

                            {children}

                          </TrackOrderProvider>
                        </TrialProvider>
                      </CartProvider>
                    </OrderProvider>
                  </CheckoutProvider>
                </AddressProvider>
              </DataProvider>
            </CountryProvider>
          </AuthProvider>
        </QueryProvider>

      </body>
    </html>
  );
}
