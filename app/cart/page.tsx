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
  const shipping = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.16;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900">Elegancia Joyería</h1>
            </Link>
            <Link href="/#catalogo" className="text-gray-700 hover:text-amber-600 transition">
              ← Volver al catálogo
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Carrito de compras</h2>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-700">Tu carrito está vacío</h3>
            <p className="text-gray-500 mt-2 mb-6">Agrega productos para continuar.</p>
            <Link
              href="/#catalogo"
              className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition font-medium"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-xl font-bold text-amber-600 mt-2">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
                    >
                      <span>-</span>
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
                    >
                      <span>+</span>
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button
                onClick={clearCart}
                className="w-full py-3 text-red-600 hover:text-red-700 transition font-medium"
              >
                Vaciar carrito
              </button>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Resumen</h3>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="font-semibold">${shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (16%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-amber-600">
                      ${total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-amber-600 text-white py-3 rounded-full hover:bg-amber-700 transition font-semibold">
                  Proceder al pago
                </button>
                <Link
                  href="/#catalogo"
                  className="block text-center mt-3 border border-amber-600 text-amber-600 py-2 rounded-full hover:bg-amber-50 transition font-medium"
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
