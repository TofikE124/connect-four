import { PanelProvider } from "@/providers/PanelProvider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.scss";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Connect 4 | Menu",
  description: "Connect 4 By Tofik Elias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <PanelProvider>{children}</PanelProvider>
      </body>
    </html>
  );
}
