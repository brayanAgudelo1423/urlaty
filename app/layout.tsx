import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carritro de Joyería - URLATY y tiendas aliadas ",
  description:
    "Descubre nuestra exclusiva colección de joyas de alta calidad. Anillos, collares, aretes y más.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}
