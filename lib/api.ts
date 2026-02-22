const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

export function getApiUrl(): string {
  return API_URL;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export type TipoFilter = "cadenas" | "pulseras" | "combos" | "topos-aretes" | "otros";

export interface AliadaJoyeriaProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: "oro" | "plata";
  tipo?: TipoFilter;
}

export interface GalleryProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export type GallerySectionKey =
  | "cadena_cadenas"
  | "cadena_dijes"
  | "pulsera_balineria"
  | "pulsera_herrajes"
  | "pulsera_dijes";

export interface GalleriesData {
  cadena_cadenas: GalleryProduct[];
  cadena_dijes: GalleryProduct[];
  pulsera_balineria: GalleryProduct[];
  pulsera_herrajes: GalleryProduct[];
  pulsera_dijes: GalleryProduct[];
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error cargando productos");
  return res.json();
}

export async function fetchAliadaJoyeriaProducts(): Promise<AliadaJoyeriaProduct[]> {
  const res = await fetch(`${API_URL}/api/aliada-joyeria/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchGalleries(): Promise<GalleriesData> {
  const res = await fetch(`${API_URL}/api/aliada-joyeria/galleries`, { cache: "no-store" });
  if (!res.ok) return getEmptyGalleries();
  return res.json();
}

function getEmptyGalleries(): GalleriesData {
  return {
    cadena_cadenas: [],
    cadena_dijes: [],
    pulsera_balineria: [],
    pulsera_herrajes: [],
    pulsera_dijes: [],
  };
}

export async function updateGalleryProduct(
  section: GallerySectionKey,
  productId: number,
  data: { description?: string; image?: string; price?: number; name?: string },
  token: string
): Promise<GalleryProduct> {
  const res = await fetch(`${API_URL}/api/aliada-joyeria/galleries/${section}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Error actualizando");
  }
  return res.json();
}

export async function login(username: string, password: string): Promise<{ token: string }> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Error de login");
  }
  return res.json();
}

/** Subir una foto desde galería/dispositivo. Devuelve la URL pública de la imagen. */
export async function uploadPhoto(file: File, token: string): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Error subiendo foto");
  }
  const data = await res.json();
  return data.url;
}

export async function updateProduct(
  productId: number,
  data: { description?: string; image?: string; price?: number; name?: string },
  token: string
): Promise<Product> {
  const res = await fetch(`${API_URL}/api/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Error actualizando producto");
  }
  return res.json();
}

export async function updateAliadaJoyeriaProduct(
  productId: number,
  data: { description?: string; image?: string; price?: number; name?: string; category?: "oro" | "plata"; tipo?: TipoFilter },
  token: string
): Promise<AliadaJoyeriaProduct> {
  const res = await fetch(`${API_URL}/api/aliada-joyeria/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Error actualizando producto");
  }
  return res.json();
}
