// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Yog Kulam - Best Yoga Training Institute",
  description: "Transform your Yoga Passion into Profession",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}