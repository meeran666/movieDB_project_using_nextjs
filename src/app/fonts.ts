import localFont from "next/font/local";
import { Lato, Oswald } from "next/font/google";

export const LatoFont = Lato({
  subsets: ["latin"],
  weight: "700",
});
export const OswaldFont = Oswald({
  subsets: ["latin"],
  weight: "400",
});
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
