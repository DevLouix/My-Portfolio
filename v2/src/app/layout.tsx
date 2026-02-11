import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ModalProvider } from "@/contexts/Modal";
import { ModalComponent } from "@/components/Modal";
import MainProvider from "@/providers/MainProvider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Louix",
  description:
    "A Creative Technologist specializing in web, application, software, game, and 3D development, dedicated to integrating innovation and creativity across diverse digital platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MainProvider>
          <ModalProvider>
            <ModalComponent />
            {children}
          </ModalProvider>
        </MainProvider>
      </body>
    </html>
  );
}
