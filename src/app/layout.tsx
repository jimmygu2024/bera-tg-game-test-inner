'use client';

import { useEffect } from "react";
import "./globals.css";
import TelegramProvider from "@/context/telegram";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    async function loadPlugin() {
      if (typeof window !== 'undefined') {
        const VConsole = await import('vconsole');
        new VConsole.default();
      }
    }
    loadPlugin();
  }, []);

  return (
    <html lang="en">
      <body>
        <TelegramProvider>
          {children}
        </TelegramProvider>
      </body>
    </html>
  );
}
