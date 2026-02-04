import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elegancia Joyería - Joyas Exclusivas",
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
      <body className="antialiased bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
