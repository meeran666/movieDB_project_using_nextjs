import localFont from "next/font/local";

export const GerardSky = localFont({
  src: [
    {
      path: "../../public/fonts/HighTowerTextRegular.ttf",

      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-gerard-sky",
  display: "swap",
});
