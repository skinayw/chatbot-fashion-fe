import type { Metadata } from "next";
import "@fontsource-variable/instrument-sans";
import "@fontsource/instrument-serif";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asisten Toko Fashion",
  description: "Asisten virtual untuk produk, stok, ukuran, pengiriman, dan penukaran.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}