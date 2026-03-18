import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Torno Metal Everton Lopes | Peças para Plantadeiras",
  description:
    "Fabricante direto de peças para plantadeiras Semeato, Vence Tudo e outras marcas. +150 referências em estoque. Preço de fábrica para revendas e oficinas. Lagoa Vermelha, RS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
