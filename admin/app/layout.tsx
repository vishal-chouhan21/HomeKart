import type { Metadata } from "next";
import "./globals.css";
import AdminShell from "./components/AdminShell";
import { AuthProvider } from "./context/authContext";

export const metadata: Metadata = {
  title: "Admin Console",
  description: "Management portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <AuthProvider>
          <AdminShell>{children}</AdminShell>
        </AuthProvider>
      </body>
    </html>
  );
}
