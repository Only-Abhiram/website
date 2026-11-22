import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Poppins , Lexend, DM_Sans ,Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Footer from '@/lib/components/footer'
import SpotifyEmbed from '@/lib/components/spotify'
import Navbar from "@/lib/components/navbar"
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Required for Poppins
  variable: "--font-poppins",
});
const dmSans = Source_Serif_4 ({
  subsets: ["latin"],
  variable: "--font-dmsans",
});
export const metadata: Metadata = {
  title: "Abhiram Goud",
  description: "A Backend   Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${dmSans.variable} h-full antialiased`}
    >

      <body  className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* <PageLoader > */}
        <Navbar></Navbar>
          {children}
          {/* </PageLoader > */}
          
          <SpotifyEmbed></SpotifyEmbed>
          <Footer></Footer>
      </body>
    </html>
  );
}
