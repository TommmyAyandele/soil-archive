import type { Metadata } from "next";
import { Fraunces, Alegreya, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorEmbers from "@/components/ui/CursorEmbers";

/* Fraunces: optical-size serif, editorial, strong personality */
const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Alegreya: warm humanist serif, excellent long-form readability */
const alegreya = Alegreya({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Space Grotesk: geometric grotesque with character for UI labels */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Soil Archive — African Voices, Recovered",
  description:
    "A public digital archive housing suppressed African voices, histories, and justice stories. Collection 001: The Ogoni Nine.",
  openGraph: {
    title: "The Soil Archive",
    description: "African voices, recovered. A living record of resistance and memory.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${alegreya.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CursorEmbers />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
