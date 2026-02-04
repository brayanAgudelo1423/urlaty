import Link from "next/link";

export default function TennisPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-amber-300 hover:text-amber-200">← Volver</Link>
        <h1 className="text-3xl sm:text-4xl font-bold mt-6">Tennis</h1>
        <p className="text-zinc-300 mt-3">Sneakers premium con detalles metálicos y confort.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Urban", "Sport Luxe", "Minimal", "Edición Gold"].map((item) => (
            <div key={item} className="rounded-xl border border-amber-500/20 bg-zinc-900/80 p-5">
              <h2 className="text-xl font-semibold text-white">{item}</h2>
              <p className="text-sm text-zinc-300 mt-2">Estilos exclusivos con acabado premium.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
