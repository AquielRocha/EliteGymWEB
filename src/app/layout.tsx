"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import localFont from "next/font/local";
import Planofundo from "../../public/background.png";
import "./globals.css";
import { ContextWrapper } from "@/contexts/ContextWrapper";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

// Carregue apenas a fonte que você quer
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} antialiased`}  // Aplique apenas a fonte que você quer
        style={{
          backgroundImage: `url(${Planofundo.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >    <AuthProvider>

        <QueryClientProvider client={queryClient}>
          <ContextWrapper>{children}</ContextWrapper>
        </QueryClientProvider>
        <Toaster />
        </AuthProvider>


      </body>
    </html>
  );
}
