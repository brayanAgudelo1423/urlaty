"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const persistCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    persistCart(updatedCart);
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    persistCart(updatedCart);
  };

  const clearCart = () => {
    persistCart([]);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  // Calcular envío: $50 por cada tienda/categoría única
  const uniqueCategories = new Set(cartItems.map(item => item.category));
  const shipping = uniqueCategories.size > 0 ? uniqueCategories.size * 50 : 0;
  
  const tax = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black/90 border-b border-amber-500/30 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h1 className="text-lg sm:text-2xl font-bold text-white">Elegancia Joyería</h1>
            </Link>
            <Link href="/#catalogo" className="text-zinc-200 hover:text-amber-400 transition text-sm sm:text-base">
              ← Volver
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Carrito de compras</h2>

        {cartItems.length === 0 ? (
          <div className="max-w-md mx-auto bg-zinc-900/80 border border-amber-500/20 rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white">Tu carrito está vacío</h3>
            <p className="text-zinc-300 mt-2 mb-4 text-sm">Agrega productos para continuar.</p>
            <Link
              href="/#catalogo"
              className="inline-block bg-amber-500 text-black px-6 py-2 rounded-full hover:bg-amber-400 transition font-medium text-sm"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-zinc-900/80 border border-amber-500/20 rounded-lg shadow-lg overflow-hidden hover:shadow-amber-500/20 transition">
                  <div className="relative h-32 sm:h-40 bg-black">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute top-1.5 right-1.5 bg-amber-500 text-black text-[9px] px-1.5 py-0.5 rounded-full font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5 line-clamp-1">{item.name}</h3>
                    <p className="text-[10px] text-zinc-300 mb-1.5 line-clamp-1">
                      Cantidad: {item.quantity}
                    </p>
                    <div className="flex justify-between items-center gap-1 mb-1.5">
                      <span className="text-sm sm:text-base font-bold text-amber-400">
                        ${item.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center space-x-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black transition flex items-center justify-center font-bold text-[10px]"
                        >
                          -
                        </button>
                        <span className="text-xs font-semibold w-5 text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black transition flex items-center justify-center font-bold text-[10px]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition font-medium text-[9px]"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={clearCart}
                className="w-full py-2.5 text-red-400 hover:text-red-300 transition font-medium text-sm text-center"
              >
                Vaciar carrito
              </button>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-zinc-900/80 border border-amber-500/20 rounded-lg shadow-lg p-4 sticky top-20">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">Resumen</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-amber-400">
                      ${total.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-amber-500 text-black py-3 rounded-full hover:bg-amber-400 transition font-semibold text-sm">
                  Proceder al pago
                </button>
                <Link
                  href="/#catalogo"
                  className="block text-center mt-2.5 border border-amber-500 text-amber-300 py-2 rounded-full hover:bg-amber-500/10 transition font-medium text-sm"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
