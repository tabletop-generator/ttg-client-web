import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import { AuthProvider } from "@/context/auth-provider";
import { Suspense } from "react";
import Dock from "@/components/dock";
import { ToastProvider } from "@/context/toast-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tabletop Generator",
  description: "Create assets for your tabletop game sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <AuthProvider>
            <ToastProvider>
              <div className="flex min-h-screen flex-col">
                <Nav />
                <main className="mx-auto mb-12 flex w-full max-w-7xl grow flex-col gap-12 px-4 py-8">
                  {children}
                </main>
                <Dock />
              </div>
            </ToastProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
