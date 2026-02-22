"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function BolsosPage() {
  const router = useRouter();
  const [addedId, setAddedId] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const withBasePath = (src: string) => {
    if (src.startsWith("http")) return src;
    const path = src.startsWith("/") ? src : `/${src}`;
    return encodeURI(basePath ? `${basePath}${path}` : path);
  };

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

  const handleBack = () => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.history.length > 1) {
      router.back();
      return;
    }
    if (document.referrer) {
      window.location.href = document.referrer;
      return;
    }
    router.push("/");
  };

  const items: Product[] = [
     { id: 50, name: "Tula de la caja original", price: 0, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.34 PM (1).jpeg", description: "Pequeño pero impactante." },
    { id: 51, name: "Caja Original", price: 0, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.34 PM (2).jpeg", description: "Caja original, depende el bolso" },
    { id: 11, name: "Bolso Fresa Coach", price: 130000, image: "/bolsos/uno.jpeg", description: "bolso con caja original" },
    { id: 12, name: "Bolso estrellitas Coach ", price: 120000, image: "/bolsos/dos.jpeg", description: "Elegante." },
    { id: 13, name: "Bolso Coach Elegantes", price: 130000, image: "/bolsos/tres.jpeg", description: "Correa premium, con caja original." },
    { id: 14, name: "Bolso Coach cereza", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.22 PM.jpeg", description: "Perfecto para convinar." },
    { id: 15, name: "Elegancia Premium Coach", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.23 PM (1).jpeg", description: "Diseño exclusivo." },
    { id: 16, name: "Bolso cereza Rosado", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.23 PM (2).jpeg", description: "Para buenas ocasiones." },
    { id: 17, name: "Sofisticado Lujo Coach", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.23 PM (3).jpeg", description: "perfecto para lucir." },
    { id: 18, name: "Coach Sencillo", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.24 PM (1).jpeg", description: "Pequeño pero elegante." },
    { id: 19, name: "Bolso Elegante", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.24 PM (2).jpeg", description: "Uso diario o formal." },
    { id: 20, name: "Bolso Coach Azul cielo", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.24 PM.jpeg", description: "Comodidad y estilo con caja original" },
    { id: 21, name: "Bolsos Coach", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.25 PM (1).jpeg", description: "el color que elija con su caja original" },
    { id: 22, name: " Bolso Coach Cafe", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.25 PM (2).jpeg", description: "Detalles exraordinarios." },
    { id: 23, name: "Bolso Coach Rosado", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.25 PM (3).jpeg", description: "Máxima calidad." },
    { id: 24, name: "Bolso Elegante", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.25 PM.jpeg", description: "Textura suave." },
    { id: 25, name: "Bolso Noche", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.26 PM (1).jpeg", description: "Para ocasiones especiales." },
    { id: 26, name: "Bolso Sofisticado", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.26 PM (2).jpeg", description: "Estilo único." },
    { id: 27, name: "Clásica", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.26 PM.jpeg", description: "Diseño unico." },
    { id: 28, name: "Elegancia", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.27 PM (1).jpeg", description: "Pequeño y exclusivo." },
    { id: 29, name: "Bolso Coffe", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.27 PM (2).jpeg", description: "Nueva colección." },
    { id: 30, name: "Bolso Exclusivo", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.27 PM (3).jpeg", description: "Limitado." },
    { id: 31, name: "Bolso Blanco Coach", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.27 PM.jpeg", description: "muy especiales." },
    { id: 32, name: "Bolso Coach Vino tinto", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.28 PM.jpeg", description: "Para todas las ocasiones." },
    { id: 33, name: "Bolso Coach Tote Moderno", price: 140000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.29 PM (1).jpeg", description: "Diseño robusto y espacioso." },
    { id: 34, name: "Bolso diamantado coach", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.29 PM (2).jpeg", description: "Para cualquier estilo." },
    { id: 35, name: "Bolso Premium Rosado ", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.29 PM.jpeg", description: "bolso muy femenino." },
    { id: 36, name: "Bolso negro", price: 110000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.30 PM (1).jpeg", description: "Sencillo." },
    { id: 37, name: "Bolso muy elegante doble ", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.30 PM (2).jpeg", description: "Con detalles muy bonitos." },
    { id: 38, name: "Bolso Practico", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.30 PM (3).jpeg", description: "Hermoso y práctico." },
    { id: 39, name: "Bolso Noche elegante", price: 144900, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.30 PM.jpeg", description: "Para eventos elegantes." },
    { id: 40, name: "Bolso besos Coach", price: 140000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.31 PM (1).jpeg", description: "Destella con estilo." },
    { id: 41, name: "Bolso Chic Coach", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.31 PM (2).jpeg", description: "Lo último en moda." },
    { id: 42, name: "Bolso Coach especial", price: 160000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.31 PM.jpeg", description: "Calidad excepcional." },
    { id: 43, name: "Bolso Coach", price: 185000 , image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.32 PM (1).jpeg", description: "Perfecto para salidas." },
    { id: 44, name: "Bolso Coach negro grande", price: 185000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.32 PM (2).jpeg", description: "bolso tendencia." },
    { id: 45, name: "Bolso Coach ten Lujo", price: 185000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.32 PM (3).jpeg", description: "Premium absoluto." },
    { id: 46, name: "Bolso coach super elegante", price: 195000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.32 PM.jpeg", description: "Con brillantes." },
    { id: 47, name: "Bolso Coach Rosado", price: 180000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.33 PM (1).jpeg", description: "Bolso rosado espacioso." },
    { id: 48, name: "Tote combo Exclusiva", price: 199900, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.33 PM (2).jpeg", description: "Edición limitada." },
    { id: 49, name: "Bolso Coach moderno", price: 190000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.33 PM.jpeg", description: "De buen gusto." },
    { id: 52, name: "Bolso clasico moderno", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.34 PM (3).jpeg", description: "bolso muy clasico hermoso." },
    { id: 53, name: "Bolso snoopy", price: 120000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.34 PM.jpeg", description: "Moderna y sofisticada." },
    { id: 54, name: "Bolso Premium corazon", price: 130000, image: "/bolsos/WhatsApp Image 2026-02-02 at 5.31.35 PM (1).jpeg", description: "hermosa silueta" },
  ];

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: Product & { quantity: number }) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, category: "Bolsos" });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col items-start">
            <button
              type="button"
              onClick={handleBack}
              className="text-amber-300 hover:text-amber-200"
            >
              ← Volver
            </button>
            <div className="w-full text-center mt-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-amber-200">
                Bolsos
              </h1>
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="h-px w-10 bg-amber-500/70" />
                <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-300/90">
                  Lujo que se siente
                </p>
                <span className="h-px w-10 bg-amber-500/70" />
              </div>
              <p className="text-zinc-300 mt-3 max-w-2xl mx-auto leading-relaxed">
                Bolsos de lujo con detalles dorados y otros mas.
              </p>
            </div>
          </div>
          <Link
            href="/cart/"
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
                <Image src={withBasePath(item.image)} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-1">{item.name}</h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-1">{item.description}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-base sm:text-lg text-amber-300 font-semibold">${item.price.toLocaleString("es-CO")}</span>
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
          <div className="relative w-full max-w-3xl max-h-[75vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-black/80 border border-amber-500/40 text-white rounded-full w-9 h-9 flex items-center justify-center hover:text-amber-400 transition z-[101]"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={withBasePath(selectedImage ?? "")}
              alt="Imagen ampliada"
              width={1000}
              height={700}
              className="object-contain w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Botón flotante WhatsApp */}
      <a
        href="https://wa.me/3009870850?text=Hola"
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
