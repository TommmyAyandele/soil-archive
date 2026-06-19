import type { Metadata } from "next";
import { Instrument_Serif, Source_Serif_4, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Soil Archive — African History, Documented",
  description:
    "A public digital archive housing suppressed African voices, histories, and justice stories. Collection 001: The Ogoni Nine.",
  openGraph: {
    title: "The Soil Archive",
    description: "African history, documented. A living record of resistance and memory.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${sourceSerif4.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
      </body>
    </html>
  );
}
