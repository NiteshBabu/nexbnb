import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexBnB - Feels Like Home 🏠",
  description: "Book your stay!",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className + " px-10 mx-auto"}>{children}</body>
    </html>
  );
};

export default RootLayout;
