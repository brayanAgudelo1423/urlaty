"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function CorreasPage() {
  const [addedId, setAddedId] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const items: Product[] = [
    {
      id: 51,
      name: "Clásica Gold",
      price: 95,
      image:
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=900&h=900&fit=crop",
      description: "Hebilla dorada premium y cuero suave.",
    },
    {
      id: 52,
      name: "Piel Luxe",
      price: 130,
      image:
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=900&h=900&fit=crop",
      description: "Cuero genuino y acabados finos.",
    },
    {
      id: 53,
      name: "Tejida Noir",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&h=900&fit=crop",
      description: "Textura elegante y resistente.",
    },
    {
      id: 54,
      name: "Edición Gold",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&h=900&fit=crop",
      description: "Diseño exclusivo limitado.",
    },
  ];

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: Product & { quantity: number }) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, category: "Correas" });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link href="/" className="text-amber-300 hover:text-amber-200">
              ← Volver
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mt-3">Correas</h1>
            <p className="text-zinc-300 mt-2">Correas premium con hebillas doradas.</p>
          </div>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center rounded-full border border-amber-500/40 px-5 py-2 text-amber-200 hover:bg-amber-500/10"
          >
            Ver carrito
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-amber-500/20 bg-zinc-900/80 overflow-hidden"
            >
              <div className="relative h-40 sm:h-48 bg-black cursor-pointer" onClick={() => setSelectedImage(item.image)}>
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-1">{item.name}</h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-1">{item.description}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-base sm:text-lg text-amber-300 font-semibold">${item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="rounded-full bg-amber-500 text-black px-3 py-1.5 text-xs sm:text-sm font-semibold hover:bg-amber-400 transition"
                  >
                    {addedId === item.id ? "✓" : "Agregar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón flecha lado derecho */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={scrollToTop}
          className="relative w-14 h-14 flex items-center justify-center bg-black rounded-full shadow-lg hover:shadow-amber-500/50 transition"
        >
          <svg className="absolute w-14 h-14" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(217, 119, 6, 0.3)" strokeWidth="2" />
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="#d97706"
              strokeWidth="2"
              strokeDasharray={`${163.36 * (scrollProgress / 100)} 163.36`}
              style={{ transition: "stroke-dasharray 0.1s ease" }}
            />
          </svg>
          <svg className="w-7 h-7 text-amber-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Modal para imagen grande */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition z-[101]"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Imagen ampliada"
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Botón flotante WhatsApp */}
      <a
        href="https://wa.me/?text=Hola"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3 group"
      >
        <div className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110">
          <FaWhatsapp className="w-7 h-7 text-white" />
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-medium text-gray-800 whitespace-nowrap">¿En qué podemos ayudarte?</p>
        </div>
      </a>
    </div>
  );
}
