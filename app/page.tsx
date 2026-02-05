"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

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
    name: "Anillo demo",
    price: 2499,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&h=900&fit=crop",
    description:
      "Elegante anillo con diamante solitario de 1 quilate en oro blanco de 18k.",
  },
  {
    id: 2,
    name: "Collar de Perlas",
    price: 899,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&h=900&fit=crop",
    description:
      "Collar de perlas cultivadas naturales con cierre de plata 925.",
  },
  {
    id: 3,
    name: "Aretes de Esmeralda",
    price: 1599,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&h=900&fit=crop",
    description:
      "Aretes con esmeraldas colombianas y diamantes en oro amarillo.",
  },
  {
    id: 4,
    name: "Pulsera de Oro Rosa",
    price: 749,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&h=900&fit=crop",
    description:
      "Pulsera tejida en oro rosa de 14k con detalles de circonitas.",
  },
  {
    id: 5,
    name: "Anillo Compromiso Corona",
    price: 3299,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=900&h=900&fit=crop",
    description:
      "Diseño corona con diamante central y halo de brillantes.",
  },
  {
    id: 6,
    name: "Collar Infinity Gold",
    price: 599,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&h=900&fit=crop",
    description:
      "Collar símbolo infinito en oro de 10k con cadena ajustable.",
  },
  {
    id: 7,
    name: "Aretes Diamante Clásicos",
    price: 1899,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1588444650733-4d6155e7c935?w=900&h=900&fit=crop",
    description:
      "Aretes tipo stud con diamantes certificados de 0.5ct.",
  },
  {
    id: 8,
    name: "Pulsera Tennis Brillantes",
    price: 2199,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&h=900&fit=crop",
    description:
      "Pulsera tennis con circonitas AAA en plata rodiada.",
  },
  {
    id: 9,
    name: "Anillo Zafiro Azul",
    price: 1799,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1590408694841-3a8a63a4c5d1?w=900&h=900&fit=crop",
    description:
      "Zafiro azul natural rodeado de diamantes en oro blanco.",
  },
  {
    id: 10,
    name: "Collar Luna Dorada",
    price: 459,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&h=900&fit=crop",
    description:
      "Dije lunar en oro de 10k con cadena fina y elegante.",
  },
  {
    id: 11,
    name: "Aretes Gota de Cristal",
    price: 329,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&h=900&fit=crop",
    description:
      "Aretes con cristales tallados y baño en oro.",
  },
  {
    id: 12,
    name: "Pulsera Estelar",
    price: 699,
    category: "Joyería",
    image:
      "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=900&h=900&fit=crop",
    description:
      "Pulsera con charms de estrellas y detalles en plata 925.",
  },
];

const categories = ["Joyería"];

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

const aliados = [
  { title: "Gafas", href: "/aliadas/gafas" },
  { title: "Bolsos", href: "/aliadas/bolsos" },
  { title: "Joyería", href: "/aliadas/joyeria" },
  { title: "Tennis", href: "/aliadas/tennis" },
  { title: "Chanclas", href: "/aliadas/chanclas" },
  { title: "Correas", href: "/aliadas/correas" },
  { title: "Billeteras", href: "/aliadas/billeteras" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Joyería");
  const [cartCount, setCartCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce(
      (sum: number, item: { quantity: number }) => sum + item.quantity,
      0
    );
    setCartCount(total);
  };

  useEffect(() => {
    const loadCart = () => {
      updateCartCount();
    };
    loadCart();
  }, []);

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

  const filteredProducts = products.filter((p) => p.category === selectedCategory);

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
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black sticky top-0 z-50 !bg-black">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image 
                src={`${process.env.NODE_ENV === 'production' ? '/urlaty' : ''}/joyeria/logo.png.jpg`}
                alt="Urlaty Logo" 
                width={50} 
                height={50} 
                className="object-contain"
              />
              <h1 className="text-2xl font-bold text-white">Urlaty_Handless</h1>
            </div>
            <Link
              href="/cart"
              className="relative p-2 text-zinc-200 hover:text-amber-400 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden bg-black min-h-[500px] sm:min-h-[600px]">
        {/* Imagen de fondo difuminada */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop&q=80"
            alt="Background"
            fill
            className="object-cover opacity-30 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl text-white">
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-amber-300">
              Colección con tiendas aliadas
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4">
              Brilla con piezas que cuentan tu historia
            </h2>
            <p className="text-lg mt-4 text-zinc-200">
              descubre la magia de brillar y tener accesorios que te haras sentir unico.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#catalogo"
                className="bg-amber-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-amber-400 transition"
              >
                Ver catálogo
              </a>
              <a
                href="#estilos"
                className="border border-amber-400/60 text-amber-100 px-6 py-3 rounded-full font-semibold hover:bg-amber-400/10 transition"
              >
                Ver estilos
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-zinc-950/80 rounded-2xl p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Tiendas aliadas</h3>
              <p className="text-zinc-300 mt-2">
                Explora productos complementarios en nuestras marcas aliadas.
              </p>
            </div>
            <Link
              href="#catalogo"
              className="text-amber-300 hover:text-amber-200 font-medium"
            >
              Ver catálogo principal →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {aliados.map((aliado) => (
              <Link
                key={aliado.title}
                href={aliado.href}
                className="rounded-full border border-amber-500/30 bg-black/60 px-4 py-3 text-center text-sm font-semibold text-white hover:border-amber-400 hover:text-amber-200 transition"
              >
                {aliado.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="estilos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-white">Muchos estilos para ti</h3>
          <p className="text-zinc-300 mt-2">
            Explora diferentes estilos y encuentra el que se adapte a tu esencia.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style) => (
            <div
              key={style.title}
              className="bg-zinc-900/80 border border-amber-500/20 p-6 rounded-xl shadow-lg hover:shadow-amber-500/20 transition"
            >
              <h4 className="text-xl font-semibold text-white">{style.title}</h4>
              <p className="text-zinc-300 mt-3 text-sm">{style.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-white">Catálogo</h3>
          <p className="text-zinc-300 mt-2">
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
                  ? "bg-amber-500 text-black shadow-lg"
                  : "bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900/80 border border-amber-500/20 rounded-lg shadow-lg overflow-hidden hover:shadow-amber-500/20 transition"
            >
              <div className="relative h-40 sm:h-48 bg-black cursor-pointer" onClick={() => setSelectedImage(product.image)}>
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                <span className="absolute top-2 right-2 bg-amber-500 text-black text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  {product.category}
                </span>
              </div>
              <div className="p-3">
                <h4 className="text-sm sm:text-base font-bold text-white mb-1 line-clamp-1">{product.name}</h4>
                <p className="text-zinc-300 text-xs mb-2 line-clamp-1">
                  {product.description}
                </p>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-amber-400">
                    ${product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-amber-500 text-black px-3 py-1.5 text-xs sm:text-sm rounded-full hover:bg-amber-400 transition font-medium"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white">Sobre Urlaty</h3>
            <p className="text-zinc-300 mt-4">
              creamos joyas que acompañan historias únicas. Trabajamos con
              materiales premium y diseños exclusivos.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">30k</div>
                <div className="text-sm text-zinc-300">Productos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">10k+</div>
                <div className="text-sm text-zinc-300">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">100%</div>
                <div className="text-sm text-zinc-300">Garantía</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["Calidad certificada", "Envío rápido", "Garantía extendida", "Atención 24/7"].map(
              (item) => (
                <div key={item} className="bg-zinc-900/80 border border-amber-500/20 p-6 rounded-lg">
                  <h4 className="font-semibold text-white">{item}</h4>
                  <p className="text-sm text-zinc-300 mt-2">
                    Tu compra es 100% certificada, segura, rapida y asesorada
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Botones flotantes lado izquierdo */}
      <div className="fixed bottom-6 left-6 flex flex-col gap-4 z-40">
        <a 
          href="https://wa.me/?text=Hola" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition"
        >
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.935 1.24l-.339-.16-3.54 1.27 1.27-3.54-.16-.339A9.9 9.9 0 005.064 3.051c2.47-.003 4.99.542 7.351 1.64 2.36 1.099 4.454 2.742 6.115 4.74 1.66 1.998 2.708 4.508 2.711 7.097 0 5.424-4.39 9.814-9.814 9.814-2.505 0-4.905-.93-6.75-2.632l-.34-.255-3.66 1.32 1.32-3.66-.254-.34A9.865 9.865 0 015.064 21.88c5.424 0 9.814-4.39 9.814-9.814 0-2.62-.998-5.09-2.811-7.01-1.813-1.922-4.290-3.101-6.918-3.248z"/>
          </svg>
        </a>
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

      <footer className="bg-gray-900 text-white py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-bold text-amber-400">Elegancia Handless</h5>
            <p className="text-gray-400 text-sm mt-2">
              Creando momentos inolvidables.
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
            <h5 className="font-bold mb-2">Contacto de soporte</h5>
            <p className="text-sm text-gray-400">3216974633</p>
            <p className="text-sm text-gray-400"> (+57)3009902243</p>
          </div>
        </div>
      </footer>

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
