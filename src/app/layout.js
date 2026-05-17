import { Lato, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

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
  title: "SWA Diamonds - Maintenance",
  description: "Website under maintenance",
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

        {/* Maintenance Page Only */}
        {children}

      </body>
    </html>
  );
}
