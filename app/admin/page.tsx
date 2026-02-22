"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  fetchProducts,
  fetchAliadaJoyeriaProducts,
  fetchGalleries,
  login,
  updateProduct,
  updateAliadaJoyeriaProduct,
  updateGalleryProduct,
  uploadPhoto,
  type Product,
  type AliadaJoyeriaProduct,
  type GalleryProduct,
  type GalleriesData,
  type GallerySectionKey,
  type TipoFilter,
} from "@/lib/api";

const TIPO_OPTIONS: { value: "" | TipoFilter; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "cadenas", label: "Cadenas" },
  { value: "pulseras", label: "Pulseras" },
  { value: "combos", label: "Combos" },
  { value: "topos-aretes", label: "Topos / Aretes" },
  { value: "otros", label: "Otros" },
];

const GALLERY_SECTION_LABELS: Record<GallerySectionKey, string> = {
  cadena_cadenas: "Personaliza tu cadena — Cadenas",
  cadena_dijes: "Personaliza tu cadena — Dijes",
  pulsera_balineria: "Personaliza tu pulsera — Balinería",
  pulsera_herrajes: "Personaliza tu pulsera — Herrajes",
  pulsera_dijes: "Personaliza tu pulsera — Dijes",
};

const TOKEN_KEY = "urlaty_admin_token";

function ProductEditor({
  product,
  editForm,
  setEditForm,
  onSave,
  onCancel,
  onUploadPhoto,
  uploadLoading,
}: {
  product: Product;
  editForm: { name: string; description: string; image: string; price: number };
  setEditForm: React.Dispatch<React.SetStateAction<{ name: string; description: string; image: string; price: number }>>;
  onSave: () => void;
  onCancel: () => void;
  onUploadPhoto: (file: File) => void;
  uploadLoading: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Nombre</label>
        <input
          value={editForm.name}
          onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-sm text-white"
        />
      </div>
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Descripción</label>
        <input
          value={editForm.description}
          onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-sm text-white"
        />
      </div>
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Foto</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUploadPhoto(file);
            e.target.value = "";
          }}
        />
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={uploadLoading}
            onClick={() => fileInputRef.current?.click()}
            className="bg-amber-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-amber-500 disabled:opacity-50"
          >
            {uploadLoading ? "Subiendo…" : "Subir desde galería"}
          </button>
          <input
            value={editForm.image}
            onChange={(e) => setEditForm((f) => ({ ...f, image: e.target.value }))}
            placeholder="URL o sube una foto"
            className="flex-1 min-w-[120px] bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-sm text-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Precio</label>
        <input
          type="number"
          value={editForm.price || ""}
          onChange={(e) => setEditForm((f) => ({ ...f, price: Number(e.target.value) || 0 }))}
          className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-sm text-white"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="bg-amber-500 text-black px-4 py-1.5 rounded text-sm font-medium hover:bg-amber-400"
        >
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="bg-zinc-700 text-white px-4 py-1.5 rounded text-sm hover:bg-zinc-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

function AliadaEditor({
  product,
  editForm,
  setEditForm,
  onSave,
  onCancel,
  onUploadPhoto,
  uploadLoading,
}: {
  product: AliadaJoyeriaProduct;
  editForm: { name: string; description: string; image: string; price: number; category: "oro" | "plata"; tipo: TipoFilter | "" };
  setEditForm: React.Dispatch<React.SetStateAction<{ name: string; description: string; image: string; price: number; category: "oro" | "plata"; tipo: TipoFilter | "" }>>;
  onSave: () => void;
  onCancel: () => void;
  onUploadPhoto: (file: File) => void;
  uploadLoading: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Nombre</label>
        <input
          value={editForm.name}
          onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-sm text-white"
        />
      </div>
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Descripción</label>
        <input
          value={editForm.description}
          onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-sm text-white"
        />
      </div>
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Foto</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUploadPhoto(file);
            e.target.value = "";
          }}
        />
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={uploadLoading}
            onClick={() => fileInputRef.current?.click()}
            className="bg-amber-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-amber-500 disabled:opacity-50"
          >
            {uploadLoading ? "Subiendo…" : "Subir desde galería"}
          </button>
          <input
            value={editForm.image}
            onChange={(e) => setEditForm((f) => ({ ...f, image: e.target.value }))}
            placeholder="URL o sube una foto"
            className="flex-1 min-w-[120px] bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-sm text-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Precio</label>
        <input
          type="number"
          value={editForm.price || ""}
          onChange={(e) => setEditForm((f) => ({ ...f, price: Number(e.target.value) || 0 }))}
          className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-sm text-white"
        />
      </div>
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Categoría (Oro laminado 18K / Plata ley 925)</label>
        <select
          value={editForm.category}
          onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value as "oro" | "plata" }))}
          className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-sm text-white"
        >
          <option value="oro">Oro laminado 18K</option>
          <option value="plata">Plata ley 925</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Tipo (filtro en tienda)</label>
        <select
          value={editForm.tipo}
          onChange={(e) => setEditForm((f) => ({ ...f, tipo: e.target.value as TipoFilter | "" }))}
          className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-sm text-white"
        >
          {TIPO_OPTIONS.map((o) => (
            <option key={o.value || "t"} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="bg-amber-500 text-black px-4 py-1.5 rounded text-sm font-medium hover:bg-amber-400"
        >
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="bg-zinc-700 text-white px-4 py-1.5 rounded text-sm hover:bg-zinc-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [aliadaProducts, setAliadaProducts] = useState<AliadaJoyeriaProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; description: string; image: string; price: number }>({
    name: "",
    description: "",
    image: "",
    price: 0,
  });
  const [aliadaEditingId, setAliadaEditingId] = useState<number | null>(null);
  const [aliadaEditForm, setAliadaEditForm] = useState<{
    name: string;
    description: string;
    image: string;
    price: number;
    category: "oro" | "plata";
    tipo: TipoFilter | "";
  }>({ name: "", description: "", image: "", price: 0, category: "oro", tipo: "" });
  const [aliadaCategoryFilter, setAliadaCategoryFilter] = useState<"oro" | "plata">("oro");
  const [aliadaTipoFilter, setAliadaTipoFilter] = useState<"" | TipoFilter>("");
  const [saveError, setSaveError] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"principal" | "aliada" | "galerias">("principal");
  const [gallerySection, setGallerySection] = useState<GallerySectionKey>("cadena_cadenas");
  const [galleries, setGalleries] = useState<GalleriesData | null>(null);
  const [galleryEditingId, setGalleryEditingId] = useState<number | null>(null);
  const [galleryEditForm, setGalleryEditForm] = useState<{ name: string; description: string; image: string; price: number }>({
    name: "", description: "", image: "", price: 0,
  });

  useEffect(() => {
    const t = typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null;
    setToken(t);
  }, []);

  useEffect(() => {
    if (!token) {
      setLoadingProducts(false);
      return;
    }
    let cancelled = false;
    setLoadingProducts(true);
    Promise.all([fetchProducts(), fetchAliadaJoyeriaProducts(), fetchGalleries()])
      .then(([main, aliada, gal]) => {
        if (!cancelled) {
          setProducts(main);
          setAliadaProducts(aliada);
          setGalleries(gal);
        }
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingProducts(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    try {
      const { token: t } = await login(username, password);
      sessionStorage.setItem(TOKEN_KEY, t);
      setToken(t);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Error de login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditForm({
      name: p.name,
      description: p.description,
      image: p.image,
      price: p.price,
    });
    setAliadaEditingId(null);
    setSaveError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSaveError("");
  };

  const saveEdit = async () => {
    if (editingId === null || !token) return;
    setSaveError("");
    try {
      const updated = await updateProduct(
        editingId,
        {
          name: editForm.name,
          description: editForm.description,
          image: editForm.image,
          price: editForm.price,
        },
        token
      );
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setEditingId(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Error al guardar");
    }
  };

  const handleUploadPhoto = (file: File) => {
    if (!token) return;
    setUploadLoading(true);
    uploadPhoto(file, token)
      .then((url) => {
        if (editingId !== null) setEditForm((f) => ({ ...f, image: url }));
        if (aliadaEditingId !== null) setAliadaEditForm((f) => ({ ...f, image: url }));
        if (galleryEditingId !== null) setGalleryEditForm((f) => ({ ...f, image: url }));
      })
      .catch(() => setSaveError("Error subiendo foto"))
      .finally(() => setUploadLoading(false));
  };

  const startAliadaEdit = (p: AliadaJoyeriaProduct) => {
    setAliadaEditingId(p.id);
    setAliadaEditForm({
      name: p.name,
      description: p.description,
      image: p.image,
      price: p.price,
      category: p.category,
      tipo: p.tipo || "",
    });
    setEditingId(null);
    setSaveError("");
  };

  const cancelAliadaEdit = () => {
    setAliadaEditingId(null);
    setSaveError("");
  };

  const saveAliadaEdit = async () => {
    if (aliadaEditingId === null || !token) return;
    setSaveError("");
    try {
      const updated = await updateAliadaJoyeriaProduct(
        aliadaEditingId,
        {
          name: aliadaEditForm.name,
          description: aliadaEditForm.description,
          image: aliadaEditForm.image,
          price: aliadaEditForm.price,
          category: aliadaEditForm.category,
          tipo: aliadaEditForm.tipo || undefined,
        },
        token
      );
      setAliadaProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setAliadaEditingId(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Error al guardar");
    }
  };

  const aliadaFiltered = aliadaProducts.filter((p) => {
    if (p.category !== aliadaCategoryFilter) return false;
    if (!aliadaTipoFilter) return true;
    if (aliadaTipoFilter === "otros") return !p.tipo || p.tipo === "otros";
    return p.tipo === aliadaTipoFilter;
  });

  const startGalleryEdit = (p: GalleryProduct) => {
    setGalleryEditingId(p.id);
    setGalleryEditForm({ name: p.name, description: p.description, image: p.image, price: p.price });
    setEditingId(null);
    setAliadaEditingId(null);
    setSaveError("");
  };

  const cancelGalleryEdit = () => {
    setGalleryEditingId(null);
    setSaveError("");
  };

  const saveGalleryEdit = async () => {
    if (galleryEditingId === null || !token || !galleries) return;
    setSaveError("");
    try {
      const updated = await updateGalleryProduct(
        gallerySection,
        galleryEditingId,
        {
          name: galleryEditForm.name,
          description: galleryEditForm.description,
          image: galleryEditForm.image,
          price: galleryEditForm.price,
        },
        token
      );
      setGalleries((prev) => {
        if (!prev) return null;
        const list = [...prev[gallerySection]];
        const idx = list.findIndex((p) => p.id === updated.id);
        if (idx >= 0) list[idx] = updated;
        return { ...prev, [gallerySection]: list };
      });
      setGalleryEditingId(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Error al guardar");
    }
  };

  if (token === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-zinc-900 border border-amber-500/30 rounded-xl p-6">
          <h1 className="text-xl font-bold text-amber-400 mb-4">Admin Urlaty</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block text-sm text-zinc-300 mb-1">Usuario</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-zinc-300 mb-1">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-white"
              />
            </div>
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-500 text-black py-2 rounded font-medium hover:bg-amber-400 disabled:opacity-50"
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
          <Link href="/" className="block mt-4 text-sm text-amber-400 hover:text-amber-300">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-amber-500/30 py-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
          <h1 className="text-xl font-bold text-amber-400">Panel Admin — Urlaty</h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-amber-400 hover:text-amber-300">
              Ver tienda
            </Link>
            <Link href="/aliadas/joyeria/" className="text-sm text-amber-400 hover:text-amber-300">
              Tienda aliada Joyería
            </Link>
            <button onClick={handleLogout} className="text-sm text-zinc-400 hover:text-white">
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {saveError && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded text-red-300 text-sm">
            {saveError}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6 border-b border-zinc-700 pb-2">
          <button
            onClick={() => setActiveTab("principal")}
            className={`px-4 py-2 rounded text-sm font-medium ${activeTab === "principal" ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
          >
            Catálogo principal
          </button>
          <button
            onClick={() => setActiveTab("aliada")}
            className={`px-4 py-2 rounded text-sm font-medium ${activeTab === "aliada" ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
          >
            Tienda aliada — Joyería
          </button>
          <button
            onClick={() => setActiveTab("galerias")}
            className={`px-4 py-2 rounded text-sm font-medium ${activeTab === "galerias" ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
          >
            Personaliza cadena / pulsera
          </button>
        </div>

        {loadingProducts ? (
          <p className="text-zinc-400">Cargando productos…</p>
        ) : activeTab === "galerias" ? (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {(Object.keys(GALLERY_SECTION_LABELS) as GallerySectionKey[]).map((sec) => (
                <button
                  key={sec}
                  onClick={() => { setGallerySection(sec); setGalleryEditingId(null); }}
                  className={`px-3 py-1.5 rounded text-sm ${gallerySection === sec ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
                >
                  {GALLERY_SECTION_LABELS[sec]}
                </button>
              ))}
            </div>
            {galleries && (
              <ul className="space-y-4">
                {galleries[gallerySection].map((product) => (
                  <li key={product.id} className="bg-zinc-900/80 border border-amber-500/20 rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-28 h-28 bg-zinc-800 rounded overflow-hidden shrink-0">
                      <Image
                        src={product.image.startsWith("http") ? product.image : product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized={product.image.startsWith("http")}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white mb-1">{product.name}</h3>
                      {galleryEditingId === product.id ? (
                        <ProductEditor
                          product={{ ...product, category: "" }}
                          editForm={galleryEditForm}
                          setEditForm={setGalleryEditForm}
                          onSave={saveGalleryEdit}
                          onCancel={cancelGalleryEdit}
                          onUploadPhoto={handleUploadPhoto}
                          uploadLoading={uploadLoading}
                        />
                      ) : (
                        <>
                          <p className="text-zinc-400 text-sm mb-1">{product.description}</p>
                          <p className="text-amber-400 font-medium mb-2">${product.price.toLocaleString("es-CO")}</p>
                          <button onClick={() => startGalleryEdit(product)} className="text-amber-400 text-sm hover:text-amber-300">
                            Editar
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : activeTab === "principal" ? (
          <ul className="space-y-6">
            {products.map((product) => (
              <li
                key={product.id}
                className="bg-zinc-900/80 border border-amber-500/20 rounded-lg p-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="relative w-full sm:w-32 h-32 bg-zinc-800 rounded overflow-hidden shrink-0">
                  <Image
                    src={product.image.startsWith("http") ? product.image : product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized={product.image.startsWith("http")}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white mb-2">{product.name}</h3>
                  {editingId === product.id ? (
                    <ProductEditor
                      product={product}
                      editForm={editForm}
                      setEditForm={setEditForm}
                      onSave={saveEdit}
                      onCancel={cancelEdit}
                      onUploadPhoto={handleUploadPhoto}
                      uploadLoading={uploadLoading}
                    />
                  ) : (
                    <>
                      <p className="text-zinc-400 text-sm mb-1">{product.description}</p>
                      <p className="text-amber-400 font-medium mb-2">
                        ${product.price.toLocaleString("es-CO")}
                      </p>
                      <button
                        onClick={() => startEdit(product)}
                        className="text-amber-400 text-sm hover:text-amber-300"
                      >
                        Editar nombre, descripción, foto y precio
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-zinc-400 text-sm">Oro laminado 18K / Plata ley 925:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setAliadaCategoryFilter("oro")}
                  className={`px-4 py-2 rounded text-sm font-medium ${aliadaCategoryFilter === "oro" ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
                >
                  Oro laminado 18K
                </button>
                <button
                  onClick={() => setAliadaCategoryFilter("plata")}
                  className={`px-4 py-2 rounded text-sm font-medium ${aliadaCategoryFilter === "plata" ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
                >
                  Plata ley 925
                </button>
              </div>
              <span className="text-zinc-400 text-sm ml-2">Tipo:</span>
              <select
                value={aliadaTipoFilter}
                onChange={(e) => setAliadaTipoFilter((e.target.value || "") as "" | TipoFilter)}
                className="bg-zinc-800 border border-zinc-600 rounded px-3 py-2 text-sm text-white"
              >
                {TIPO_OPTIONS.map((o) => (
                  <option key={o.value || "t"} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <ul className="space-y-6">
            {aliadaFiltered.map((product) => (
              <li
                key={product.id}
                className="bg-zinc-900/80 border border-amber-500/20 rounded-lg p-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="relative w-full sm:w-32 h-32 bg-zinc-800 rounded overflow-hidden shrink-0">
                  <Image
                    src={product.image.startsWith("http") ? product.image : product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized={product.image.startsWith("http")}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white mb-2">{product.name}</h3>
                  <span className="text-xs text-zinc-500 capitalize">{product.category}</span>
                  {aliadaEditingId === product.id ? (
                    <AliadaEditor
                      product={product}
                      editForm={aliadaEditForm}
                      setEditForm={setAliadaEditForm}
                      onSave={saveAliadaEdit}
                      onCancel={cancelAliadaEdit}
                      onUploadPhoto={handleUploadPhoto}
                      uploadLoading={uploadLoading}
                    />
                  ) : (
                    <>
                      <p className="text-zinc-400 text-sm mb-1">{product.description}</p>
                      <p className="text-amber-400 font-medium mb-2">
                        ${product.price.toLocaleString("es-CO")}
                      </p>
                      <button
                        onClick={() => startAliadaEdit(product)}
                        className="text-amber-400 text-sm hover:text-amber-300"
                      >
                        Editar nombre, descripción, foto y precio
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
          </>
        )}
      </main>
    </div>
  );
}
