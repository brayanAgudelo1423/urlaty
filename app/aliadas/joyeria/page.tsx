"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function JoyeriaPage() {
  const [addedId, setAddedId] = useState<number | null>(null);
  const items: Product[] = [
    {
      id: 21,
      name: "Anillo Eclipse",
      price: 520,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&h=900&fit=crop",
      description: "Oro blanco y zirconias con brillo intenso.",
    },
    {
      id: 22,
      name: "Collar Aura",
      price: 430,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&h=900&fit=crop",
      description: "Dije con baño en oro y cadena fina.",
    },
    {
      id: 23,
      name: "Aretes Prisma",
      price: 310,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&h=900&fit=crop",
      description: "Brillo elegante y liviano.",
    },
    {
      id: 24,
      name: "Pulsera Nova",
      price: 360,
      image:
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&h=900&fit=crop",
      description: "Diseño minimalista premium.",
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
            <Link href="/" className="text-amber-300 hover:text-amber-200">
              ← Volver
            </Link>
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

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-amber-500/20 bg-zinc-900/80 overflow-hidden"
            >
              <div className="relative h-48 sm:h-56 bg-black">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-zinc-300 mt-1">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-amber-300 font-semibold">${item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="rounded-full bg-amber-500 text-black px-4 py-2 text-sm font-semibold hover:bg-amber-400 transition"
                  >
                    {addedId === item.id ? "Agregado" : "Agregar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
