import type { Metadata } from "next";
import { Playfair_Display, EB_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorEmbers from "@/components/ui/CursorEmbers";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const garamond = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <html lang="en" className={`${playfair.variable} ${garamond.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CursorEmbers />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
