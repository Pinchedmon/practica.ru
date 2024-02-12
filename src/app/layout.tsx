import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from '@/lib/themeProvider'

import "./globals.css";
import Provider from "@/lib/sessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Practica.ru",
  description: "Site for practica in university",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
