// app/layout.tsx
import type { Metadata } from "next";
import { AuthProvider } from "./context/authContext";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "HomeKart",
  description: "Artisanal collective shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body> MUST be directly under <html> */}
      <body className="antialiased">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
