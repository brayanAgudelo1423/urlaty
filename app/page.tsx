'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
    description: "Elegante anillo con diamante solitario de 1 quilate en oro blanco de 18k"
  },
  {
    id: 2,
    name: "Collar de Perlas",
    price: 899,
    category: "Collares",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
    description: "Collar de perlas cultivadas naturales con cierre de plata 925"
  },
  {
    id: 3,
    name: "Aretes de Esmeralda",
    price: 1599,
    category: "Aretes",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    description: "Aretes con esmeraldas colombianas y diamantes en oro amarillo"
  },
  {
    id: 4,
    name: "Pulsera de Oro Rosa",
    price: 749,
    category: "Pulseras",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
    description: "Pulsera tejida en oro rosa de 14k con detalles de circonitas"
  },
  {
    id: 5,
    name: "Anillo Compromiso Corona",
    price: 3299,
    category: "Anillos",
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500&h=500&fit=crop",
    description: "Diseño corona con diamante central y halo de brillantes"
  },
  {
    id: 6,
    name: "Collar Infinity Gold",
    price: 599,
    category: "Collares",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    description: "Collar símbolo infinito en oro de 10k con cadena ajustable"
  },
  {
    id: 7,
    name: "Aretes Diamante Clásicos",
    price: 1899,
    category: "Aretes",
    image: "https://images.unsplash.com/photo-1588444650733-4d6155e7c935?w=500&h=500&fit=crop",
    description: "Aretes tipo stud con diamantes certificados de 0.5ct"
  },
  {
    id: 8,
    name: "Pulsera Tennis Brillantes",
    price: 2199,
    category: "Pulseras",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=500&fit=crop",
    description: "Pulsera tennis con circonitas AAA en plata rodiada"
  },
  {
    id: 9,
    name: "Anillo Zafiro Azul",
    price: 1799,
    category: "Anillos",
    image: "https://images.unsplash.com/photo-1590408694841-3a8a63a4c5d1?w=500&h=500&fit=crop",
    description: "Zafiro azul natural rodeado de diamantes en oro blanco"
  }
];

const categories = ["Todos", "Anillos", "Collares", "Aretes", "Pulseras"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCartCount(total);
  };

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900">Elegancia Joyería</h1>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#catalogo" className="text-gray-700 hover:text-amber-600 transition">Catálogo</a>
              <a href="#sobre" className="text-gray-700 hover:text-amber-600 transition">Sobre Nosotros</a>
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-amber-600 transition">
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

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-amber-600 to-amber-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h2 className="text-5xl font-bold mb-4">Brilla con Elegancia</h2>
            <p className="text-xl mb-8">Descubre joyas únicas que cuentan tu historia. Calidad excepcional desde 1995.</p>
            <button className="bg-white text-amber-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105">
              Ver Colección
            </button>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">Nuestro Catálogo</h3>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">${product.price.toLocaleString()}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition font-medium transform hover:scale-105"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Sobre Elegancia Joyería</h3>
              <p className="text-gray-600 mb-4">
                Desde 1995, nos dedicamos a crear momentos inolvidables a través de joyas excepcionales. 
                Cada pieza es cuidadosamente seleccionada y diseñada para capturar la esencia de momentos especiales.
              </p>
              <p className="text-gray-600 mb-6">
                Trabajamos con los mejores materiales: oro de 10k, 14k y 18k, diamantes certificados, 
                y piedras preciosas naturales. Nuestra garantía de calidad respalde cada compra.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">30+</div>
                  <div className="text-sm text-gray-600">Años de Experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">10k+</div>
                  <div className="text-sm text-gray-600">Clientes Felices</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Garantía</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-100 p-6 rounded-lg">
                <svg className="w-12 h-12 text-amber-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h4 className="font-bold mb-2">Calidad Certificada</h4>
                <p className="text-sm text-gray-600">Todas nuestras joyas vienen con certificado de autenticidad</p>
              </div>
              <div className="bg-amber-100 p-6 rounded-lg mt-8">
                <svg className="w-12 h-12 text-amber-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="font-bold mb-2">Envío Rápido</h4>
                <p className="text-sm text-gray-600">Entrega segura en 24-48 horas</p>
              </div>
              <div className="bg-amber-100 p-6 rounded-lg">
                <svg className="w-12 h-12 text-amber-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h4 className="font-bold mb-2">Garantía Extendida</h4>
                <p className="text-sm text-gray-600">2 años de garantía en todas las piezas</p>
              </div>
              <div className="bg-amber-100 p-6 rounded-lg mt-8">
                <svg className="w-12 h-12 text-amber-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="font-bold mb-2">Atención 24/7</h4>
                <p className="text-sm text-gray-600">Soporte personalizado siempre disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-bold mb-4 text-amber-400">Elegancia Joyería</h5>
              <p className="text-gray-400 text-sm">Creando momentos inolvidables desde 1995</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Comprar</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-amber-400">Anillos</a></li>
                <li><a href="#" className="hover:text-amber-400">Collares</a></li>
                <li><a href="#" className="hover:text-amber-400">Aretes</a></li>
                <li><a href="#" className="hover:text-amber-400">Pulseras</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Ayuda</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-amber-400">Guía de Tallas</a></li>
                <li><a href="#" className="hover:text-amber-400">Envíos</a></li>
                <li><a href="#" className="hover:text-amber-400">Devoluciones</a></li>
                <li><a href="#" className="hover:text-amber-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Contacto</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>contacto@elegancia.com</li>
                <li>+1 (555) 123-4567</li>
                <li className="flex space-x-4 mt-4">
                  <a href="#" className="hover:text-amber-400">FB</a>
                  <a href="#" className="hover:text-amber-400">IG</a>
                  <a href="#" className="hover:text-amber-400">TW</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 Elegancia Joyería. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
