import { Inter } from "next/font/google";
import "../styles/globals.scss";
import {
  Allura,
  Roboto_Mono,
  Londrina_Outline,
  Lemonada,
  Montserrat_Alternates,
  Libre_Franklin,
} from "next/font/google";
import TopNavBar from "@/components/frontend/TopNavBar";
import Script from "next/script";
const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-allura",
});
const montserrat_Alternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-Montserrat_Alternates",
});
const libre_Franklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-Libre_Franklin",
});
const lemonada = Lemonada({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lemonada",
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-mono",
});
const londrinaoutline = Londrina_Outline({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-londrina-outline",
});

export const metadata = {
  title: "SHA&RI",
  description: "Generated by create next app",
  icons: [{ rel: "icon", url: "/logoSHARI.jpg" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="google-analytics">
          {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-9J6HVY4E09');`}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3489691346477126"
          crossorigin="anonymous"
        ></Script>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9J6HVY4E09"
        ></Script>
        <Script
          src="https://static.elfsight.com/platform/platform.js"
          data-use-service-core
          defer
        ></Script>
      </head>

      <meta name="description" content="Generated by create next app" />

      <body
        className={`${allura.variable} ${montserrat_Alternates.variable} ${robotoMono.variable} ${londrinaoutline.variable}  ${lemonada.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
