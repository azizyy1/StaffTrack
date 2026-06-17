import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "PointagePro",
  description: "Application de pointage numérique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
              <body>
          <Navbar />
          <Toaster position="top-right" />
          {children}
        </body>
    </html>
  );
}