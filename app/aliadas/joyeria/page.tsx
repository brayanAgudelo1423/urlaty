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

export default function JoyeriaPage() {
  const router = useRouter();
  const [addedId, setAddedId] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"oro" | "plata">("oro");
  const assetBasePath = process.env.NODE_ENV === "production" ? "/urlaty" : "";
  const withBasePath = (src: string) => {
    if (src.startsWith("http")) {
      return src;
    }
    if (src.startsWith(assetBasePath)) {
      return encodeURI(src);
    }
    return encodeURI(`${assetBasePath}${src}`);
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

  const goldItems: Product[] = [
    {
      id: 21,
      name: "Anillo Eclipse",
      price: 520000,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&h=900&fit=crop",
      description: "Oro laminado 18K con zirconias brillantes.",
    },
    {
      id: 22,
      name: "Collar Aura",
      price: 430000,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&h=900&fit=crop",
      description: "Dije con baño en oro y cadena fina.",
    },
    {
      id: 23,
      name: "Aretes Prisma",
      price: 310000,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&h=900&fit=crop",
      description: "Brillo elegante con acabado dorado.",
    },
    {
      id: 24,
      name: "Pulsera Nova",
      price: 360000,
      image:
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&h=900&fit=crop",
      description: "Diseño minimalista en oro laminado.",
    },
    {
      id: 25,
      name: "Cadena Sol",
      price: 480000,
      image:
        "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=900&h=900&fit=crop",
      description: "Cadena fina con brillo premium.",
    },
    {
      id: 26,
      name: "Dije Luna",
      price: 290000,
      image:
        "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=900&h=900&fit=crop",
      description: "Dije delicado con baño en oro.",
    },
  ];

  const silverItems: Product[] = [
    {
      id: 31,
      name: "pulsera chinesca",
      price: 150000,
      image:
        "/joyeria/plata/plataUno.jpeg",
      description: " 19 CM, Plata ley 925 con brillo sutil.",
    },
    {
      id: 32,
      name: "Pulsera chinesca", 
      price: 140000,
      image:
        "/joyeria/plata/plataDos.jpeg",
      description: " 18 CM,Pulsera liviana en plata 925.",
    },
    {
      id: 33,
      name: "pulsera proteccion",
      price: 250000,
      image:
        "/joyeria/plata/plataTres.jpeg",
      description: "19 cm, plata 925.",
    },
    {
      id: 34,
      name: "dije san miguel",
      price: 70000,
      image:
        "/joyeria/plata/plataCuatro.jpeg",
      description: "Dije para cadena.",
    },
    {
      id: 35,
      name: "dije san virgen de guadalupe",
      price: 70000,
      image:
        "/joyeria/plata/plataCinco.jpeg",
      description: "Dije en plata 925 con detalle fino.",
    },
    {
      id: 36,
      name: "cadena delagada especial",
      price: 220000,
      image:
        "/joyeria/plata/plataSeis.jpeg",
      description: "Cadena 50 CM ",
    },
    {
      id: 37,
      name: "Cadena liviana",
      price: 160000,
      image:
        "/joyeria/plata/plataSiete.jpeg",
      description: "Cadena 60 CM en plata ley 925.",
    },
    {
      id: 38,
      name: "Pulsera Brillo",
      price: 210000,
      image:
        "/joyeria/plata/plataocho.jpeg",
      description: "Pulsera clasica con acabado brillante.",
    },
    {
      id: 39,
      name: "pulsera oro plata",
      price: 140000,
      image:
        "/joyeria/plata/plataNueve.jpeg",
      description: "pulsera con neopreno, oro plata",
    },
    {
      id: 40,
      name: "pulsera Espejo",
      price: 310000,
      image:
        "/joyeria/plata/plataDiez.jpeg",
      description: " 19 CM pulsera con brillo sutil.",
    },
    {
      id: 41,
      name: "Pulsera Trenza especial",
      price: 300000,
      image:
        "/joyeria/plata/plataOnce.jpeg",
      description: " 18 CM Diseño trenzado en plata 925.",
    },
    {
      id: 42,
      name: "cadena Especial",
      price: 210000,
      image:
        "/joyeria/plata/plataDoce.jpeg",
      description: "60 CM cadena plata ley 925.",
    },
    {
      id: 43,
      name: "Anillo Perla",
      price: 180000000,
      image:
        "/joyeria/plata/plataUno.jpeg",
      description: "Anillo fino con estilo minimalista.",
    },
    {
      id: 44,
      name: "Pulsera Minimal",
      price: 200000,
      image:
        "/joyeria/plata/plataDos.jpeg",
      description: "Pulsera ligera para uso diario.",
    },
    {
      id: 45,
      name: "Cadena Boreal",
      price: 270000,
      image:
        "/joyeria/plata/plataTres.jpeg",
      description: "Cadena elegante en plata 925.",
    },
    {
      id: 46,
      name: "Pulsera Aura",
      price: 220000,
      image:
        "/joyeria/plata/plataCuatro.jpeg",
      description: "Pulsera con acabado pulido.",
    },
  ];

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: Product & { quantity: number }) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, category: "Joyería" });
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
            <button
              type="button"
              onClick={handleBack}
              className="text-amber-300 hover:text-amber-200"
            >
              ← Volver
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold mt-3">Joyería</h1>
            <p className="text-zinc-300 mt-2">
              Piezas exclusivas en oro, plata y piedras preciosas.
            </p>
          </div>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center rounded-full border border-amber-500/40 px-5 py-2 text-amber-200 hover:bg-amber-500/10"
          >
            Ver carrito
          </Link>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setSelectedCategory("plata")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === "plata"
                  ? "bg-zinc-800 text-zinc-200"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Plata ley 925
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("oro")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === "oro"
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Oro laminado 18K
            </button>
          </div>

          {selectedCategory === "oro" && (
          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Oro laminado 18K</h2>
            <p className="text-zinc-300 mt-2 text-sm">Piezas premium con acabado dorado y brillo intenso.</p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {goldItems.map((item) => (
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
          )}

          {selectedCategory === "plata" && (
          <div className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Plata ley 925</h2>
            <p className="text-zinc-300 mt-2 text-sm">Diseños elegantes con brillo natural y alta durabilidad.</p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {silverItems.map((item) => (
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
          )}
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
