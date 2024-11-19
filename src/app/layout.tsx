"use client";
import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { GlobalProvider } from "./context/GlobalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
