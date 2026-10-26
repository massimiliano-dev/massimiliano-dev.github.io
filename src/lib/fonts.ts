import { Big_Shoulders, Public_Sans } from "next/font/google";

// Big Shoulders 800 per il display, Public Sans per il testo (direction sheet di tasteskill).
export const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-big-shoulders",
  display: "swap",
});

export const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-public-sans",
  display: "swap",
});
