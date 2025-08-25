import { Lato, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CountryProvider from "@/providers/country-provider";
import AuthProvider from "@/providers/auth-provider";
import DataProvider from "@/providers/data-provider";
import Footer from "@/components/footer/footer";
import QueryProvider from "@/providers/query-provider";
import { AddressProvider } from "@/providers/address-provider";
import { CheckoutProvider } from "@/providers/checkout-provider";
import { OrderProvider } from "@/providers/order-provider";
import { CartProvider } from "@/providers/cart-provider";
import Header from "@/components/header/header";
import { TrialProvider } from "@/providers/trial-provider";
import { TrackOrderProvider } from "@/providers/trackorder-provider";

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

export const metadata = {
  title: "Swa diamonds- Buy Natural Diamond Jewellery Online",
  description:
    "Swa Diamonds is a top-rated multinational diamond jewellery brand in India and the UAE, offering certified natural diamonds at wholesale prices. With 350+ stores across Kerala, South India, and a growing presence pan India.",
  keywords: [
    "diamond dealers in Kerala",
    "diamond jewellery in kerala",
    "diamond wholesale price in kerala",
  ],
  alternates: {
    canonical: "https://www.swadiamonds.com/",
  },
  openGraph: {
    title: "Swa diamonds- Buy Natural Diamond Jewellery Online",
    description:
      "Swa Diamonds is a top-rated multinational diamond jewellery brand in India and the UAE, offering certified natural diamonds at wholesale prices. With 350+ stores across Kerala, South India, and a growing presence pan India",
    url: "https://www.swadiamonds.com",
    siteName: "Swa Diamonds",
    images: [
      {
        url: "https://www.swadiamonds.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swa diamonds- Buy Natural Diamond Jewellery Online",
    description:
      "Swa Diamonds is a top-rated multinational diamond jewellery brand in India and the UAE, offering certified natural diamonds at wholesale prices. With 350+ stores across Kerala, South India, and a growing presence pan India",
    images: ["https://www.swadiamonds.com/twitter-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-scrollbar">
      <head>
        {/* <Script
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
        </Script> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DEZ9FMDN04"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DEZ9FMDN04');
          `}
        </Script>
      </head>
      <body
        className={`${lato.variable} ${gilroy.variable} ${playfair.variable} no-scrollbar`}
        // className={`${lato.variable} ${gilroy.variable} ${playfair.variable} antialiased`}
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
                            <Header />
                            {children}
                          </TrackOrderProvider>
                        </TrialProvider>
                      </CartProvider>
                    </OrderProvider>
                    <Footer />
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
