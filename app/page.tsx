"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Anillo de Diamante Solitario",
    price: 2499,
    category: "Anillos",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&h=900&fit=crop",
    description:
      "Elegante anillo con diamante solitario de 1 quilate en oro blanco de 18k.",
  },
  {
    id: 2,
    name: "Collar de Perlas",
    price: 899,
    category: "Collares",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&h=900&fit=crop",
    description:
      "Collar de perlas cultivadas naturales con cierre de plata 925.",
  },
  {
    id: 3,
    name: "Aretes de Esmeralda",
    price: 1599,
    category: "Aretes",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&h=900&fit=crop",
    description:
      "Aretes con esmeraldas colombianas y diamantes en oro amarillo.",
  },
  {
    id: 4,
    name: "Pulsera de Oro Rosa",
    price: 749,
    category: "Pulseras",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&h=900&fit=crop",
    description:
      "Pulsera tejida en oro rosa de 14k con detalles de circonitas.",
  },
  {
    id: 5,
    name: "Anillo Compromiso Corona",
    price: 3299,
    category: "Anillos",
    image:
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=900&h=900&fit=crop",
    description:
      "Diseño corona con diamante central y halo de brillantes.",
  },
  {
    id: 6,
    name: "Collar Infinity Gold",
    price: 599,
    category: "Collares",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&h=900&fit=crop",
    description:
      "Collar símbolo infinito en oro de 10k con cadena ajustable.",
  },
  {
    id: 7,
    name: "Aretes Diamante Clásicos",
    price: 1899,
    category: "Aretes",
    image:
      "https://images.unsplash.com/photo-1588444650733-4d6155e7c935?w=900&h=900&fit=crop",
    description:
      "Aretes tipo stud con diamantes certificados de 0.5ct.",
  },
  {
    id: 8,
    name: "Pulsera Tennis Brillantes",
    price: 2199,
    category: "Pulseras",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&h=900&fit=crop",
    description:
      "Pulsera tennis con circonitas AAA en plata rodiada.",
  },
  {
    id: 9,
    name: "Anillo Zafiro Azul",
    price: 1799,
    category: "Anillos",
    image:
      "https://images.unsplash.com/photo-1590408694841-3a8a63a4c5d1?w=900&h=900&fit=crop",
    description:
      "Zafiro azul natural rodeado de diamantes en oro blanco.",
  },
  {
    id: 10,
    name: "Collar Luna Dorada",
    price: 459,
    category: "Collares",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&h=900&fit=crop",
    description:
      "Dije lunar en oro de 10k con cadena fina y elegante.",
  },
  {
    id: 11,
    name: "Aretes Gota de Cristal",
    price: 329,
    category: "Aretes",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&h=900&fit=crop",
    description:
      "Aretes con cristales tallados y baño en oro.",
  },
  {
    id: 12,
    name: "Pulsera Estelar",
    price: 699,
    category: "Pulseras",
    image:
      "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=900&h=900&fit=crop",
    description:
      "Pulsera con charms de estrellas y detalles en plata 925.",
  },
];

const categories = ["Todos", "Anillos", "Collares", "Aretes", "Pulseras"];

const styles = [
  {
    title: "Minimalista",
    description: "Líneas limpias y elegantes para un look diario sofisticado.",
  },
  {
    title: "Vintage",
    description: "Inspiración clásica con detalles únicos y románticos.",
  },
  {
    title: "Glamour",
    description: "Piezas protagonistas con brillo intenso para eventos especiales.",
  },
  {
    title: "Boho Chic",
    description: "Texturas orgánicas y símbolos naturales con estilo libre.",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce(
      (sum: number, item: { quantity: number }) => sum + item.quantity,
      0
    );
    setCartCount(total);
  };

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: Product) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900">Elegancia Joyería</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#catalogo"
                className="text-gray-700 hover:text-amber-600 transition"
              >
                Ver catálogo
              </a>
              <a
                href="#estilos"
                className="text-gray-700 hover:text-amber-600 transition"
              >
                Ver estilos
              </a>
              <Link
                href="/cart"
                className="relative p-2 text-gray-700 hover:text-amber-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl text-white">
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-amber-200">
              Colección 2026
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4">
              Brilla con piezas que cuentan tu historia
            </h2>
            <p className="text-lg mt-4 text-amber-100">
              Joyas diseñadas para momentos únicos: compromiso, celebración y estilo diario.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#catalogo"
                className="bg-white text-amber-700 px-6 py-3 rounded-full font-semibold hover:bg-amber-50 transition"
              >
                Ver catálogo
              </a>
              <a
                href="#estilos"
                className="border border-white/60 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition"
              >
                Ver estilos
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="estilos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-gray-900">Muchos estilos para ti</h3>
          <p className="text-gray-600 mt-2">
            Explora diferentes estilos y encuentra el que se adapte a tu esencia.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style) => (
            <div
              key={style.title}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <h4 className="text-xl font-semibold text-gray-900">{style.title}</h4>
              <p className="text-gray-600 mt-3 text-sm">{style.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-gray-900">Catálogo</h3>
          <p className="text-gray-600 mt-2">
            Selecciona una categoría para encontrar tu joya perfecta.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-amber-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <div className="relative h-64 bg-gray-100">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                <span className="absolute top-4 right-4 bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {product.category}
                </span>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">
                    ${product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-amber-600 text-white px-5 py-2 rounded-full hover:bg-amber-700 transition font-medium"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900">Sobre Elegancia Joyería</h3>
            <p className="text-gray-600 mt-4">
              Desde 1995, creamos joyas que acompañan historias únicas. Trabajamos con
              materiales premium y diseños exclusivos.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">30+</div>
                <div className="text-sm text-gray-600">Años</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">10k+</div>
                <div className="text-sm text-gray-600">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">100%</div>
                <div className="text-sm text-gray-600">Garantía</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["Calidad certificada", "Envío rápido", "Garantía extendida", "Atención 24/7"].map(
              (item) => (
                <div key={item} className="bg-amber-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900">{item}</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Tu compra está respaldada por nuestro equipo experto.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-bold text-amber-400">Elegancia Joyería</h5>
            <p className="text-gray-400 text-sm mt-2">
              Creando momentos inolvidables desde 1995.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-2">Explorar</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#catalogo" className="hover:text-amber-400">Catálogo</a>
              </li>
              <li>
                <a href="#estilos" className="hover:text-amber-400">Estilos</a>
              </li>
              <li>
                <Link href="/cart" className="hover:text-amber-400">Carrito</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Contacto</h5>
            <p className="text-sm text-gray-400">contacto@elegancia.com</p>
            <p className="text-sm text-gray-400">+1 (555) 123-4567</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
