"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { fetchAliadaJoyeriaProducts, fetchGalleries, type AliadaJoyeriaProduct, type GalleriesData } from "@/lib/api";
// import dynamic from "next/dynamic";
// const PersonalizarPulsera = dynamic(() => import("./PersonalizarPulsera"), { ssr: false });
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface GalleryCartItem {
  id: string;
  name: string;
  image: string;
  optionLabel: string;
  quantity: number;
  imageNumber: number;
  type: "cadenas" | "dijes" | "herrajes" | "balineria";
}

export default function JoyeriaPage() {
  const router = useRouter();
  const [addedId, setAddedId] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"oro" | "plata">("oro");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  // Galería destacada (Personaliza tu cadena)
  const [cadenaGalleryOpen, setCadenaGalleryOpen] = useState(false);
  const [cadenaGalleryMode, setCadenaGalleryMode] = useState<'cadenas' | 'dijes'>('cadenas');
  const [cadenaGalleryIndex, setCadenaGalleryIndex] = useState(0);
  const [cadenaGalleryCart, setCadenaGalleryCart] = useState<GalleryCartItem[]>([]);
  // Personaliza tu pulsera
  const [pulseraGalleryOpen, setPulseraGalleryOpen] = useState(false);
  const [pulseraGalleryMode, setPulseraGalleryMode] = useState<'balineria' | 'herrajes' | 'dijes'>('balineria');
  const [pulseraGalleryIndex, setPulseraGalleryIndex] = useState(0);
  const [pulseraGalleryCart, setPulseraGalleryCart] = useState<GalleryCartItem[]>([]);
  // Balineria options
  const [selectedBalinOption, setSelectedBalinOption] = useState<number | null>(null);
  const [balinQuantity, setBalinQuantity] = useState<number>(1);
  // Filtro para oro laminado 18K
  const [oroFilter, setOroFilter] = useState<string>("");
  const [aliadaProducts, setAliadaProducts] = useState<AliadaJoyeriaProduct[]>([]);
  const [galleries, setGalleries] = useState<GalleriesData | null>(null);
  // const [showPersonalizar, setShowPersonalizar] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const withBasePath = (src: string) => {
    if (src.startsWith("http")) return src;
    const path = src.startsWith("/") ? src : `/${src}`;
    return encodeURI(basePath ? `${basePath}${path}` : path);
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

  useEffect(() => {
    fetchAliadaJoyeriaProducts().then(setAliadaProducts).catch(() => {});
    fetchGalleries().then(setGalleries).catch(() => {});
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
      id: 8,
      name: "combo cruz gucci",
      price: 200000,
      image:
        "/joyeria/cruz con gucci.jpeg",
      description: "cadena con dije y aretes gucci",
    },
    {
      id: 3,
      name: " Pulsera 3 carriles",
      price: 120000,
      image:
        "/joyeria/3k.jpeg",
      description: "3 carriles elegante",
    },
      // Nuevos topos laminados
      {
        id: 3001,
        name: "topos Virgen de guadalupe ref1",
        price: 150000,
        image: "/joyeria/oro laminado/to (1).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3002,
        name: "topos Oso ref1",
        price: 80000,
        image: "/joyeria/oro laminado/to (2).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3003,
        name: "topos Cangrejo ref1",
        price: 65000,
        image: "/joyeria/oro laminado/to (3).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3004,
        name: "topos Huella ref1",
        price: 65000,
        image: "/joyeria/oro laminado/to (4).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3005,
        name: "topos Hueso",
        price: 80000,
        image: "/joyeria/oro laminado/to (5).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3006,
        name: "topos Perro ref1",
        price: 45000,
        image: "/joyeria/oro laminado/to (6).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3007,
        name: "topos Cruz ref1",
        price: 60000,
        image: "/joyeria/oro laminado/to (7).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3008,
        name: "topos alas ref1",
        price: 85000,
        image: "/joyeria/oro laminado/to (8).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3009,
        name: "topos Cereza ref1",
        price: 70000,
        image: "/joyeria/oro laminado/to (9).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3010,
        name: "topos Caballo ref1",
        price: 90000,
        image: "/joyeria/oro laminado/to (10).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3011,
        name: "topos Cruz ref2",
        price: 60000,
        image: "/joyeria/oro laminado/to (11).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3012,
        name: "topos Cruz ref3 ",
        price: 55000,
        image: "/joyeria/oro laminado/to (12).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3013,
        name: "topos Cactus ref1",
        price: 49000,
        image: "/joyeria/oro laminado/to (13).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3014,
        name: "topos largones",
        price: 70000,
        image: "/joyeria/oro laminado/to (14).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3015,
        name: "topos Dino ref1",
        price: 49000,
        image: "/joyeria/oro laminado/to (15).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3016,
        name: "topos libelula ref1",
        price: 85000,
        image: "/joyeria/oro laminado/to (16).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3017,
        name: "topos Cruz ref4",
        price: 70000,
        image: "/joyeria/oro laminado/to (17).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
      {
        id: 3018,
        name: "topos Caballo pequeños ref2",
        price: 49000,
        image: "/joyeria/oro laminado/to (10).jpeg",
        description: "Oro laminado 18K, Elegantes para el uso diario",
      },
    {
      id: 5,
      name: "Combo aguila",
      price: 260000,
      image:
        "/joyeria/aguila comb.jpeg",
      description: "cadena, dije y aretes ",
    },
    {
      id: 10,
      name: "pulsera crucificada",
      price: 110000,
      image:
        "/joyeria/ComboPul.jpeg",
      description: "pulsera con dije crucificado ",
    },
    {
      id: 1,
      name: "Combo one dios",
      price: 310000,
      image:
        "/joyeria/combito.jpeg",
      description: "Combo pulsera, dos dijes y cadena",
    },
    {
      id: 7,
      name: "cadena virgen de guadalupe",
      price: 180000,
      image:
        "/joyeria/virgenVieja.jpeg",
      description: "cadena con dije de la virgen ",
    },
    {
      id: 2,
      name: "Pulsera RX grande",
      price: 185000,
      image:
        "/joyeria/rolex grande.jpeg",
      description: "Pulsera RX grande con balineria",
    },
    {
      id: 11,
      name: "combo virgen san miguel",
      price: 165000,
      image:
        "/joyeria/combo san.jpeg",
      description: "combo pareja de proteccion",
    },
    {
      id: 6,
      name: "pulsera san miguel",
      price: 105000,
      image:
        "/joyeria/pulsera sanVieja.jpeg",
      description: "Pulsera san miguel en oro laminado 18K.",
    },
    {
      id: 4,
      name: "Pulseras",
      price: 85000,
      image:
        "/joyeria/pulseras viej.jpeg",
      description: "Pulseras ",
    },
    {
      id: 9,
      name: "combo pulsera aretes",
      price: 170000,
      image:
        "/joyeria/comboViejo.jpeg",
      description: "pulsera diamantada con aretes ",
    },
    {
      id: 901,
      name: "cadena Lazo 50CM ref1 ",
      price: 299900,
      image:
        "/joyeria/oro laminado/cad (1).jpeg",
      description: "para darle stylo a tu presencia",
    },
    {
      id: 902,
      name: "cadena inter 60CM ref1 ",
      price: 260000,
      image:
        "/joyeria/oro laminado/cad (2).jpeg",
      description: "para darle stylo a tu presencia",
    },
    {
      id: 903,
      name: "cadena chinesca 50CM ref1",
      price: 540000,
      image:
        "/joyeria/oro laminado/cad (3).jpeg",
      description: "para darle stylo a tu presencia",
    },
    {
      id: 904,
      name: "cadena Militar 45CM REF1",
      price: 130000,
      image:
        "/joyeria/oro laminado/cad (4).jpeg",
      description: "para darle stylo a tu presencia",
    },
    {
      id: 905,
      name: "cadena Lazo 50CM ref2 ",
      price: 350000,
      image:
        "/joyeria/oro laminado/cad (5).jpeg",
      description: "para darle stylo a tu presencia",
    },
    {
      id: 906,
      name: "cadena Poli 50CM REF1",
      price: 260000,
      image:
        "/joyeria/oro laminado/cad (6).jpeg",
      description: "para darle stylo a tu presencia",
    },
    {
      id: 907,
      name: "cadena Chester 50CM REF1",
      price: 170000,
      image:
        "/joyeria/oro laminado/cad (7).jpeg",
      description: "para darle stylo a tu presencia",
    },
    {
      id: 908,
      name: "cadena Gucci 60CM REF1",
      price: 699000,
      image:
        "/joyeria/oro laminado/cad (8).jpeg",
      description: "para darle stylo a tu presencia",
    },
    {
      id: 909,
      name: "cadena Militar Gruesa 50CM REF2",
      price: 399000,
      image:
        "/joyeria/oro laminado/cad (9).jpeg",
      description: " 50CM sin dije.",
    },
    {
      id: 910,
      name: "cadena Avion REF1",
      price: 170000,
      image:
        "/joyeria/oro laminado/cad (10).jpeg",
      description: "para darle stylo a tu presencia",
    },
    {
      id: 911,
      name: "cadena virgen",
      price: 170000,
      image:
        "/joyeria/oro laminado/cad (11).jpeg",
      description: "para darle stylo a tu presencia",
    },
    {
      id: 912,
      name: "cadena chinesca Gruesa 60CM ref2",
      price: 680000,
      image:
        "/joyeria/oro laminado/cad (12).jpeg",
      description: "60 CM",
    },
    {
      id: 913,
      name: "cadena lazo gruesa  60CM ref2",
      price: 340000,
      image:
        "/joyeria/oro laminado/cad (13).jpeg",
      description: "para darle stylo a tu presencia",
    },
    {
      id: 21,
      name: "topos teddy",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro17.jpeg",
      description: "oro laminado 18K.",
    },
    {
      id: 22,
      name: "aretes van cleef",
      price: 120000,
      image:
        "/joyeria/oro laminado/orouno.jpeg",
      description: "oro laminado 18K",
    },
    {
      id: 23,
      name: "candongas",
      price: 85000,
      image:
        "/joyeria/oro laminado/orodos.jpeg",
      description: "Brillo elegante con acabado dorado.",
    },
    {
      id: 24,
      name: "candongas con circones",
      price: 110000,
      image:
        "/joyeria/oro laminado/orotres.jpeg",
      description: "Diseño minimalista en oro laminado.",
    },
    {
      id: 25,
      name: "topos alas",
      price: 85000,
      image:
        "/joyeria/oro laminado/orocuatro.jpeg",
      description: "oro laminado 18K",
    },
    {
      id: 26,
      name: "pulsera san benito",
      price: 190000,
      image:
        "/joyeria/oro laminado/oroseis.jpeg",
      description: "oro laminado 18k",
    },
    {
      id: 101,
      name: "topos mariposa",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro18.jpeg",
      description: "Oro laminado 18K",
    },
    {
      id: 200,
      name: "topos virgen del carmen",
      price: 90000,
      image:
        "/joyeria/oro laminado/100.jpeg",
      description: "Oro laminado 18K con acabado premium.",
    },
    {
      id: 201,
      name: "pareja cruz",
      price: 80000,
      image:
        "/joyeria/oro laminado/101.jpeg",
      description: "Oro laminado 18K con brillo duradero.",
    },
    {
      id: 202,
      name: "topos versace",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro45.jpeg",
      description: "Diseño elegante en oro laminado 18K.",
    },
    {
      id: 203,
      name: "anillo 3 carriles",
      price: 70000 ,
      image:
        "/joyeria/oro laminado/anillo3c.jpeg",
      description: "Acabado premium con tono dorado.",
    },
    {
      id: 204,
      name: "Anillo doble carril",
      price: 120000,
      image:
        "/joyeria/oro laminado/oro47.jpeg",
      description: "balines diamantados en oro laminado 18K.",
    },
    {
      id: 205,
      name: "combo intercalado anillo y pulsera ",
      price: 189900,
      image:
        "/joyeria/oro laminado/oro48.jpeg",
      description: "Estilo moderno en oro laminado 18K.",
    },
    {
      id: 206,
      name: "pulsera 3 carriles diamantada",
      price: 349900,
      image:
        "/joyeria/oro laminado/oro49.jpeg",
      description: "Detalle fino con brillo intenso.",
    },
    {
      id: 207,
      name: "pulsera gucci con dos dijes",
      price: 240000,
      image:
        "/joyeria/oro laminado/oro50.jpeg",
      description: "Diseño clasico en oro laminado.",
    },
    {
      id: 208,
      name: "pulsera para los bebes",
      price: 59900,
      image:
        "/joyeria/oro laminado/oro51.jpeg",
      description: "Pieza elegante para el bebe de la casa.",
    },
    {
      id: 209,
      name: "combo ref2 anillo y pulsera",
      price: 180000,
      image:
        "/joyeria/oro laminado/oro52.jpeg",
      description: "pulsera y anillo diamantado",
    },
    {
      id: 210,
      name: "pulsera neopreno con balines",
      price: 65000,
      image:
        "/joyeria/oro laminado/oro53.jpeg",
      description: "pulido en oro laminado neopreno",
    },
    {
      id: 211,
      name: "topos balin",
      price: 99900,
      image:
        "/joyeria/oro laminado/oro54.jpeg",
      description: "topo balin diamantado",
    },
    {
      id: 212,
      name: "topos virgen de guadalupe",
      price: 80000,
      image:
        "/joyeria/oro laminado/oro55.jpeg",
      description: "Brillo elegante.",
    },
    {
      id: 213,
      name: "topos gucci",
      price: 85000,
      image:
        "/joyeria/oro laminado/oro56.jpeg",
      description: "Estilo clasico oro laminado 18K.",
    },
    {
      id: 214,
      name: "topos pies",
      price: 85000,
      image:
        "/joyeria/oro laminado/oro57.jpeg",
      description: "muy bonito para uso diario.",
    },
    {
      id: 215,
      name: "topos RX",
      price: 85000,
      image:
        "/joyeria/oro laminado/oro58.jpeg",
      description: "topos moderno RX oro laminado 18K.",
    },
    {
      id: 216,
      name: "3 pulseras proteccion",
      price: 85000,
      image:
        "/joyeria/oro laminado/3ojo.jpeg",
      description: "familiar.",
    },
    {
      id: 217,
      name: "topos san miguel arcangel",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro60.jpeg",
      description: "Brillo premium para uso diario.",
    },
    {
      id: 218,
      name: "anillo intercalado",
      price: 45000,
      image:
        "/joyeria/oro laminado/oro61.jpeg",
      description: "anillo intercalado ",
    },
    {
      id: 219,
      name: "virgen de guadalupe roja",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro62.jpeg",
      description: "Oro laminado 18K con detalle clasico.",
    },
    {
      id: 220,
      name: "san miguel arcangel ",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro63.jpeg",
      description: "con balin liso",
    },
    {
      id: 221,
      name: "pulsera intercalada neopre",
      price: 149900,
      image:
        "/joyeria/oro laminado/oro64.jpeg",
      description: "Estilo moderno en oro laminado 18K.",
    },
    {
      id: 222,
      name: "virgen de guadalupe negra",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro65.jpeg",
      description: "Detalle fino con acabado brillante.",
    },
    {
      id: 223,
      name: "pulsera cruz",
      price: 89900,
      image:
        "/joyeria/oro laminado/oro66.jpeg",
      description: "Brillo duradero y estilo elegante.",
    },
    {
      id: 224,
      name: "cadena virgen",
      price: 149000,
      image:
        "/joyeria/oro laminado/oro67.jpeg",
      description: "muy bonita y apetecida",
    },
    {
      id: 225,
      name: "pareja neopreno",
      price: 49900,
      image:
        "/joyeria/oro laminado/oro68.jpeg",
      description: "Pieza elegante con acabado pulido.",
    },
    {
      id: 226,
      name: "pulsera ADN",
      price: 25000,
      image:
        "/joyeria/oro laminado/oro69.jpeg",
      description: "Oro laminado 18K con estilo clasico.",
    },
    {
      id: 227,
      name: "pulsera ojo",
      price: 30000,
      image:
        "/joyeria/oro laminado/oro70.jpeg",
      description: "Pieza fina con acabado dorado.",
    },
    {
      id: 228,
      name: "pulsera rosa",
      price: 59900,
      image:
        "/joyeria/oro laminado/oro71.jpeg",
      description: "para dama muy bonita",
    },
    {
      id: 229,
      name: "pulsera pareja",
      price: 130000,
      image:
        "/joyeria/oro laminado/oro72.jpeg",
      description: "idela para pareja.",
    },
    {
      id: 230,
      name: "pulsera full balines",
      price: 149000,
      image:
        "/joyeria/oro laminado/oro74.jpeg",
      description: "Diseño clasico con brillo sutil.",
    },
    {
      id: 231,
      name: "pulsera rosa ref2",
      price: 45000,
      image:
        "/joyeria/oro laminado/oro75.jpeg",
      description: "Pieza premium con tono dorado.",
    },
    {
      id: 232,
      name: "pulsera intercalada full balines",
      price: 99900,
      image:
        "/joyeria/oro laminado/oro76.jpeg",
      description: "Brillo intenso para un look elegante.",
    },
    {
      id: 233,
      name: "pareja ref3",
      price: 105000,
      image:
        "/joyeria/oro laminado/oro77.jpeg",
      description: "Acabado pulido con estilo moderno.",
    },
    {
      id: 234,
      name: "pulsera dije RX",
      price: 88000,
      image:
        "/joyeria/oro laminado/oro78.jpeg",
      description: "Pieza fina con brillo duradero.",
    },
    {
      id: 235,
      name: "pulsera balines #4",
      price: 80000,
      image:
        "/joyeria/oro laminado/oro79.jpeg",
      description: "acabado premium.",
    },
    {
      id: 236,
      name: "pareja full balines",
      price: 280000,
      image:
        "/joyeria/oro laminado/oro80.jpeg",
      description: "Diseño elegante en oro laminado.",
    },
    {
      id: 237,
      name: "tejido medio macrame",
      price: 75000,
      image:
        "/joyeria/oro laminado/oro81.jpeg",
      description: "Brillo sutil con acabado refinado.",
    },
    {
      id: 238,
      name: "pulsera dije aguila",
      price: 80000,
      image:
        "/joyeria/oro laminado/oro82.jpeg",
      description: "Oro laminado 18K con detalle clasico.",
    },
    {
      id: 239,
      name: "combo medio macra con pulsera y anillo",
      price: 70000,
      image:
        "/joyeria/oro laminado/oro83.jpeg",
      description: "combo muy apetecido.",
    },
    {
      id: 240,
      name: "topos san benito",
      price:90000,
      image:
        "/joyeria/oro laminado/oro84.jpeg",
      description: "Diseño moderno de proteccion.",
    },
    {
      id: 241,
      name: "topos coffee con circon",
      price: 84900,
      image:
        "/joyeria/oro laminado/oro85.jpeg",
      description: "Pieza elegante con acabado premium.",
    },
    {
      id: 242,
      name: "pulsera con herraje virgen",
      price: 55000,
      image:
        "/joyeria/oro laminado/oro86.jpeg",
      description: "Brillo intenso con estilo sofisticado.",
    },
    {
      id: 243,
      name: "candonga prem2",
      price: 11000,
      image:
        "/joyeria/oro laminado/oro87.jpeg",
      description: "Acabado pulido y brillo sutil.",
    },
    {
      id: 244,
      name: "candonga prem3",
      price: 65000,
      image:
        "/joyeria/oro laminado/oro88.jpeg",
      description: "Diseño clasico en oro laminado 18K.",
    },
    {
      id: 245,
      name: "candonga prem4",
      price: 75000,
      image:
        "/joyeria/oro laminado/oro89.jpeg",
      description: "Pieza fina con acabado dorado.",
    },
    {
      id: 102,
      name: "topos pez",
      price: 80000,
      image:
        "/joyeria/oro laminado/oro19.jpeg",
      description: "Oro laminado 18K con brillo duradero.",
    },
    {
      id: 103,
      name: "topos trebol",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro20.jpeg",
      description: "oro laminado 18K.",
    },
    {
      id: 104,
      name: "pulsera neopreno pareja",
      price: 85000,
      image:
        "/joyeria/oro laminado/oro21.jpeg",
      description: "pareja",
    },
    {
      id: 105,
      name: "pulsera ref 1",
      price: 85000,
      image:
        "/joyeria/oro laminado/oro22.jpeg",
      description: "Pieza fina con acabado brillante.",
    },
    {
      id: 106,
      name: "topos corona ",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro23.jpeg",
      description: "Estilo moderno en oro laminado 18K.",
    },
    {
      id: 107,
      name: "topos estrella de mar",
      price: 95000,
      image:
        "/joyeria/oro laminado/oro24.jpeg",
      description: "topos caballo de mar ",
    },
    {
      id: 108,
      name: "aretes carro",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro25.jpeg",
      description: "Diseño clasico en oro laminado.",
    },
    {
      id: 109,
      name: "pulsera diamantada",
      price: 165000,
      image:
        "/joyeria/oro laminado/oro26.jpeg",
      description: "oro laminado 18k",
    },
    {
      id: 110,
      name: "pulsera pareja cruz",
      price: 160000,
      image:
        "/joyeria/oro laminado/oro27.jpeg",
      description: "diamantado con herraje pareja",
    },
    {
      id: 111,
      name: "pulsera visionaria",
      price: 140000,
      image:
        "/joyeria/oro laminado/oro28.jpeg",
      description: "Acabado pulido en oro laminado.",
    },
    {
      id: 112,
      name: "pulsera avion ref1",
      price: 75000,
      image:
        "/joyeria/oro laminado/oro30.jpeg",
      description: "Diseño premium con tono dorado.",
    },
    {
      id: 113,
      name: "pulsera atletico nacional",
      price: 49900,
      image:
        "/joyeria/oro laminado/oro31.jpeg",
      description: "oro laminado 18K ",
    },
    {
      id: 114,
      name: "pulsera Once caldas",
      price: 49900,
      image:
        "/joyeria/oro laminado/oro32.jpeg",
      description: "Once caldas",
    },
    {
      id: 115,
      name: "pulsera con piedras",
      price: 22000,
      image:
        "/joyeria/oro laminado/oro33.jpeg",
      description: "oro laminado 18K con piedras",
    },
    {
      id: 116,
      name: "pulsera avion ref2",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro34.jpeg",
      description: "Acabado dorado con estilo moderno.",
    },
    {
      id: 117,
      name: "pulsera once caldas ref2",
      price: 38000,
      image:
        "/joyeria/oro laminado/oro35.jpeg",
      description: "Diseño ligero en oro laminado.",
    },
    {
      id: 118,
      name: "aretes con circon",
      price: 90000,
      image:
        "/joyeria/oro laminado/oro36.jpeg",
      description: "Brillo premium para uso diario.",
    },
    {
      id: 119,
      name: "candongas premium",
      price: 140000,
      image:
        "/joyeria/oro laminado/oro37.jpeg",
      description: "oro laminado 18k con circones premium",
    },
    {
      id: 120,
      name: "cadena gucci gruesa ref1",
      price: 390000,
      image:
        "/joyeria/oro laminado/oro38.jpeg",
      description: "Oro laminado 18K con detalle clasico.",
    },
    {
      id: 121,
      name: "cadena chinesca gruesa",
      price: 360000,
      image:
        "/joyeria/oro laminado/oro39.jpeg",
      description: "Acabado premium con brillo sutil.",
    },
    {
      id: 122,
      name: "pulsera avion ref3",
      price: 80000,
      image:
        "/joyeria/oro laminado/oro40.jpeg",
      description: "Estilo moderno en oro laminado 18K.",
    },
    {
      id: 123,
      name: "pulsera avion ref4",
      price: 85000,
      image:
        "/joyeria/oro laminado/oro41.jpeg",
      description: "Detalle fino en oro laminado 18K.",
    },
    {
      id: 124,
      name: "topos billante",
      price: 75000,
      image:
        "/joyeria/oro laminado/oro42.jpeg",
      description: "estilo elegante.",
    },
    {
      id: 125,
      name: "topos corazon",
      price: 85000,
      image:
        "/joyeria/oro laminado/oro43.jpeg",
      description: "oro laminado 18K con diseño romántico.",
    },
    {
      id: 126,
      name: "topos balin",
      price: 75000,
      image:
        "/joyeria/oro laminado/oro44.jpeg",
      description: "oro laminado 18K con diseño balin.",
    },
    {
      id: 127,
      name: "combo RX",
      price: 260000,
      image:
        "/joyeria/oro laminado/orocatorce.jpeg",
      description: "anillo y pulsera RX con acabado dorado.",
    },
    {
      id: 128,
      name: "topos alas",
      price: 90000,
      image:
        "/joyeria/oro laminado/orocuatro.jpeg",
      description: "Pieza fina con acabado dorado.",
    },
    {
      id: 129,
      name: "pareja macrame",
      price: 90000,
      image:
        "/joyeria/oro laminado/orodiesiseis.jpeg",
      description: "pareja macrame",
    },
    {
      id: 130,
      name: "diseño intercalado",
      price: 55000,
      image:
        "/joyeria/oro laminado/orodiez.jpeg",
      description: "balin rosa, diamantado y liso juntos",
    },
    {
      id: 131,
      name: "pulsera buda",
      price: 24500,
      image:
        "/joyeria/oro laminado/orodoce.jpeg",
      description: "Diseño clasico con brillo sutil.",
    },
    {
      id: 132,
      name: "candongas premium ref2",
      price: 99000,
      image:
        "/joyeria/oro laminado/orodos.jpeg",
      description: "Pieza premium con tono dorado.",
    },
    {
      id: 133,
      name: "pulsera angel",
      price: 55000,
      image:
        "/joyeria/oro laminado/oronueve.jpeg",
      description: "dama o niña, oro laminado 18K",
    },
    {
      id: 134,
      name: "pulsera avion ref5",
      price: 80000,
      image:
        "/joyeria/oro laminado/oroocho.jpeg",
      description: "vuela alto",
    },
    {
      id: 135,
      name: "avion ref6",
      price: 85000,
      image:
        "/joyeria/oro laminado/oroonce.jpeg",
      description: "Pieza fina con brillo duradero.",
    },
    {
      id: 136,
      name: "combo pulsera y anillo ref2",
      price: 180000,
      image:
        "/joyeria/oro laminado/oroquince.jpeg",
      description: "pulsera y anillo casi full balines",
    },
    {
      id: 137,
      name: "pulsera intercalada macrame",
      price: 95000,
      image:
        "/joyeria/oro laminado/orosiete.jpeg",
      description: "Diseño elegante en oro laminado.",
    },
    {
      id: 138,
      name: "topos  FE",
      price: 95000,
      image:
        "/joyeria/oro laminado/orotrece.jpeg",
      description: "Brillo sutil con acabado refinado.",
    },
    {
      id: 139,
      name: "3 pulseras familiar",
      price: 80000,
      image:
        "/joyeria/oro laminado/3normal.jpeg",
      description: "Oro laminado 18K con detalle clasico.",
    },
        {
      id: 140,
      name: "Cadena del ref2",
      price: 109900,
      image:
        "/joyeria/oro laminado/cadena1.jpeg",
      description: "Oro laminado 18K",
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
      name: "cadena Brillo",
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
      name: "cadena congruente",
      price: 90000,
      image:
        "/joyeria/plata/plata11.jpeg",
      description: "45 CM cadena plata ley 925.",
    },
        {
      id: 44,
      name: "cadena gruesa chiref",
      price: 320000,
      image:
        "/joyeria/plata/plata12.jpeg",
      description: "60 CM cadena plata ley 925.",
    },
        {
      id: 45,
      name: "cadena intrcalada",
      price: 260000,
      image:
        "/joyeria/plata/plata13.jpeg",
      description: "70 CM cadena plata ley 925.",
    },
        {
      id: 46,
      name: "cadena chinesca delgada",
      price: 175000,
      image:
        "/joyeria/plata/plata14.jpeg",
      description: "45 CM cadena plata ley 925.",
    },
        {
      id: 47,
      name: "cadena Especial delgada",
      price: 135000,
      image:
        "/joyeria/plata/plata15.jpeg",
      description: "50 CM cadena plata ley 925.",
    },
        {
          id: 48,
          name: "EARCUF ref 1",
          price: 55000,
          image:
            "/joyeria/plata/ore1.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 49,
          name: "EARCUF ref 2",
          price: 45000,
          image:
            "/joyeria/plata/ore2.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 50,
          name: "EARCUF ref 3",
          price: 55000,
          image:
            "/joyeria/plata/ore3.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 51,
          name: "EARCUF ref 4",
          price: 51000,
          image:
            "/joyeria/plata/ore4.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 52,
          name: "EARCUF ref 5",
          price: 50000,
          image:
            "/joyeria/plata/ore5.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 53,
          name: "EARCUF ref 6",
          price: 52500,
          image:
            "/joyeria/plata/ore6.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 54,
          name: "EARCUF ref 7",
          price: 57000,
          image:
            "/joyeria/plata/ore7.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 55,
          name: "EARCUF ref 8",
          price: 42500,
          image:
            "/joyeria/plata/ore8.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 56,
          name: "EARCUF ref 9",
          price: 69900,
          image:
            "/joyeria/plata/ore9.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 57,
          name: "EARCUF ref 10",
          price: 49900,
          image:
            "/joyeria/plata/ore10.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 58,
          name: "Juego Corona",
          price: 99900,
          image:
            "/joyeria/plata/jue1.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 59,
          name: "Juego mano Hamsa",
          price: 72000,
          image:
            "/joyeria/plata/jue2.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 60,
          name: "Juego Huella",
          price: 80000,
          image:
            "/joyeria/plata/jue3.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 61,
          name: "Juego angelito",
          price: 75000,
          image:
            "/joyeria/plata/jue4.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 62,
          name: "Juego cruz dorada",
          price: 99900,
          image:
            "/joyeria/plata/jue5.jpeg",
          description: "Plata ley 925 muy bonitas para lucir.",
        },
        {
          id: 63,
          name: "Juego virgen de guadalupe",
          price: 120000,
          image:
            "/joyeria/plata/jue6.jpeg",
          description: "Plata ley 925 combo completo.",
        },
        {
          id: 64,
          name: "Juego 15años",
          price: 180000,
          image:
            "/joyeria/plata/jue7.jpeg",
          description: "Plata ley 925 combo completo.",
        },
        {
          id: 65,
          name: "Juego Hada",
          price: 85000,
          image:
            "/joyeria/plata/jue8.jpeg",
          description: "Plata ley 925 combo completo.",
        },
        {
          id: 66,
          name: "Juego Avion",
          price: 120000,
          image:
            "/joyeria/plata/jue9.jpeg",
          description: "Plata ley 925 combo completo.",
        },
        {
          id: 67,
          name: "Juego Colibri",
          price: 80000,
          image:
            "/joyeria/plata/jue10.jpeg",
          description: "Plata ley 925 combo completo.",
        },
        {
          id: 68,
          name: "Juego elefante ref1",
          price: 75000,
          image:
            "/joyeria/plata/jue11.jpeg",
          description: "Plata ley 925 combo completo.",
        },
        {
          id: 69,
          name: "Juego elefante ref2",
          price: 85000,
          image:
            "/joyeria/plata/jue12.jpeg",
          description: "Plata ley 925 combo completo.",
        },
        {
          id: 70,
          name: "Juego van cleef",
          price: 150000,
          image:
            "/joyeria/plata/jue13.jpeg",
          description: "Plata ley 925 combo completo.",
        },
        {
          id: 71,
          name: "Juego van cleef ref2",
          price: 270000,
          image:
            "/joyeria/plata/jue14.jpeg",
          description: "Plata ley 925 combo completo.",
        },
        {
          id: 72,
          name: "Dije Avion",
          price: 60000,
          image:
            "/joyeria/plata/di1.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 73,
          name: "Dije trebol",
          price: 75000,
          image:
            "/joyeria/plata/di2.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 74,
          name: "Dije FE",
          price: 85000,
          image:
            "/joyeria/plata/di3.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 75,
          name: "Dije Angel",
          price: 70000,
          image:
            "/joyeria/plata/di4.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 76,
          name: "Dije Cruz ref1",
          price: 80000,
          image:
            "/joyeria/plata/di5.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 77,
          name: "Dije Oso ref1",
          price: 95000,
          image:
            "/joyeria/plata/di6.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 78,
          name: "Dije Niño ref1",
          price: 85000,
          image:
            "/joyeria/plata/di7.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 79,
          name: "Dije corazon ref1",
          price: 85000,
          image:
            "/joyeria/plata/di8.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 80,
          name: "Dije Cruz ref2",
          price: 110000,
          image:
            "/joyeria/plata/di9.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 81,
          name: "Dije Niño santo ref1",
          price: 110000,
          image:
            "/joyeria/plata/di10.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 82,
          name: "Dije Cruz ref3",
          price: 110000,
          image:
            "/joyeria/plata/di11.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 84,
          name: "Dije Niño santo ref2",
          price: 85000,
          image:
            "/joyeria/plata/di13.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 85,
          name: "Dije virgen",
          price: 115000,
          image:
            "/joyeria/plata/di14.jpeg",
          description: "Plata ley 925, para que lo luzcas en tus cadenas.",
        },
        {
          id: 86,
          name: "Cadena liviana lazo 40 CM",
          price: 170000,
          image:
            "/joyeria/plata/cad (1).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 87,
          name: "Cadena liviana re1 50CM",
          price: 160000,
          image:
            "/joyeria/plata/cad (2).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 88,
          name: "Cadena liviana cubana 50 CM",
          price: 150000,
          image:
            "/joyeria/plata/cad (3).jpeg",
          description: "Plata ley 925, 50CM",
        },
        {
          id: 89,
          name: "Cadena Delgada singapur 45CM",
          price: 120000,
          image:
            "/joyeria/plata/cad (4).jpeg",
          description: "Plata ley 925, 45CM",
        },
        {
          id: 90,
          name: "Cadena Del ref1 40CM",
          price: 170000,
          image:
            "/joyeria/plata/cad (5).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 91,
          name: "Dije Familia",
          price: 90000,
          image:
            "/joyeria/plata/dijefal.jpeg",
          description: "Plata ley 925",
        },
        {
          id: 92,
          name: "Cadena Del ref2 50CM",
          price: 180000,
          image:
            "/joyeria/plata/cad (7).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 93,
          name: "Cadena Balines Cristal Azul",
          price: 140000,
          image:
            "/joyeria/plata/cad (8).jpeg",
          description: "Plata ley 925, ",
        },
        {
          id: 94,
          name: "Cadena Del ref3 45CM",
          price: 145000,
          image:
            "/joyeria/plata/cad (9).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 95,
          name: "Cadena Liviana Lazo ref2",
          price: 170000,
          image:
            "/joyeria/plata/cad (10).jpeg",
          description: "Plata ley 925, 60CM",
        },
        {
          id: 96,
          name: "Cadena mediana ref1 60CM",
          price: 850000,
          image:
            "/joyeria/plata/cad (11).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 97,
          name: "Tobillera Hamsa",
          price: 159900,
          image:
            "/joyeria/plata/tob1 (1).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 98,
          name: "Tobillera Estrella",
          price: 150000,
          image:
            "/joyeria/plata/tob1 (2).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 99,
          name: "Tobillera Mariposa Hojas",
          price: 140000,
          image:
            "/joyeria/plata/tob1 (3).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 100,
          name: "Tobillera Corazon y Balin",
          price: 99900,
          image:
            "/joyeria/plata/tob1 (4).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 101,
          name: "Tobillera Cristal",
          price: 115000,
          image:
            "/joyeria/plata/tob1 (5).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 102,
          name: "Tobillera Ojos Turcos",
          price: 105000,
          image:
            "/joyeria/plata/tob1 (6).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 103,
          name: "Topos Corazon ref1",
          price: 99900,
          image:
            "/joyeria/plata/top (1).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 104,
          name: "Topos Oso ",
          price: 110000,
          image:
            "/joyeria/plata/top (2).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 105,
          name: "Topos Hada Microcircon",
          price: 80000,
          image:
            "/joyeria/plata/top (3).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 106,
          name: "Topos Conejita",
          price: 99900,
          image:
            "/joyeria/plata/top (4).jpeg",
          description: "Plata ley 925",
        },
        {
          id: 107,
          name: "Candonga ref1",
          price: 45000,
          image:
            "/joyeria/plata/top (5).jpeg",
          description: "Plata ley 925",
        },

  ];

  // API es fuente principal: si hay productos oro/plata del backend, se usan; si no, fallback estático
  const goldItemsDisplay = useMemo(() => {
    const fromApi = aliadaProducts.filter((p) => p.category === "oro");
    if (fromApi.length > 0) return fromApi;
    return goldItems;
  }, [aliadaProducts]);

  const silverItemsDisplay = useMemo(() => {
    const fromApi = aliadaProducts.filter((p) => p.category === "plata");
    if (fromApi.length > 0) return fromApi;
    return silverItems;
  }, [aliadaProducts]);

  const mergeGallery = useMemo(() => (staticList: Product[], sectionKey: keyof GalleriesData) => {
    if (!galleries || !Array.isArray(galleries[sectionKey])) return staticList;
    const fromApi = galleries[sectionKey];
    const overrides = new Map(fromApi.map((p) => [p.id, p]));
    return staticList.map((p) => {
      const over = overrides.get(p.id);
      if (over) return { ...p, ...over };
      return p;
    });
  }, [galleries]);

  // Arrays de galería definidos antes de los useMemo que los usan
  const goldGalleryExtras: Product[] = [
    { id: 5001, name: "cadena", price: 0, image: "/joyeria/oro laminado/gal (1).jpeg", description: "Pregunta por tu cadena: son ediciones limitadas, mas economicas y muy apetecidas." },
    { id: 5002, name: "cadena", price: 0, image: "/joyeria/oro laminado/gal (2).jpeg", description: "Pregunta por tu cadena: son ediciones limitadas, mas economicas y muy apetecidas." },
    { id: 5003, name: "cadena", price: 0, image: "/joyeria/oro laminado/gal (3).jpeg", description: "Pregunta por tu cadena: son ediciones limitadas, mas economicas y muy apetecidas." },
    { id: 5004, name: "cadena", price: 0, image: "/joyeria/oro laminado/gal (4).jpeg", description: "Pregunta por tu cadena: son ediciones limitadas, mas economicas y muy apetecidas." },
    { id: 5005, name: "cadena", price: 0, image: "/joyeria/oro laminado/gal (5).jpeg", description: "Pregunta por tu cadena: son ediciones limitadas, mas economicas y muy apetecidas." },
    { id: 5006, name: "cadena", price: 0, image: "/joyeria/oro laminado/gal (6).jpeg", description: "Pregunta por tu cadena: son ediciones limitadas, mas economicas y muy apetecidas." },
    { id: 5007, name: "cadena", price: 0, image: "/joyeria/oro laminado/gal (7).jpeg", description: "Pregunta por tu cadena: son ediciones limitadas, mas economicas y muy apetecidas." },
    { id: 5008, name: "cadena", price: 0, image: "/joyeria/oro laminado/gal (8).jpeg", description: "Pregunta por tu cadena: son ediciones limitadas, mas economicas y muy apetecidas." },
    { id: 5009, name: "cadena", price: 0, image: "/joyeria/oro laminado/gal (9).jpeg", description: "Pregunta por tu cadena: son ediciones limitadas, mas economicas y muy apetecidas." },
    { id: 5010, name: "cadena", price: 0, image: "/joyeria/oro laminado/gal (10).jpeg", description: "Pregunta por tu cadena: son ediciones limitadas, mas economicas y muy apetecidas." },
  ];
  const dijGalleryExtras: Product[] = [
    { id: 6001, name: "dije Bolsa de Dinero", price: 0, image: "/joyeria/oro laminado/dij (1).jpeg", description: "Dije oro laminado 18K." },
    { id: 6002, name: "dije RX ref1", price: 0, image: "/joyeria/oro laminado/dij (2).jpeg", description: "Dije oro laminado 18K." },
    { id: 6003, name: "dije Tijeras ", price: 0, image: "/joyeria/oro laminado/dij (3).jpeg", description: "Dije oro laminado 18K." },
    { id: 6004, name: "dije RX ref2", price: 0, image: "/joyeria/oro laminado/dij (4).jpeg", description: "Dije oro laminado 18K." },
    { id: 6005, name: "dije Sagrada Familia", price: 0, image: "/joyeria/oro laminado/dij (5).jpeg", description: "Dije oro laminado 18K." },
    { id: 6006, name: "dije Caballo ref1", price: 0, image: "/joyeria/oro laminado/dij (6).jpeg", description: "Dije oro laminado 18K." },
    { id: 6007, name: "dije Caballo ref2", price: 0, image: "/joyeria/oro laminado/dij (7).jpeg", description: "Dije oro laminado 18K." },
    { id: 6008, name: "dije Video Juegos", price: 0, image: "/joyeria/oro laminado/dij (8).jpeg", description: "Dije oro laminado 18K." },
    { id: 6009, name: "dije Virgen de guadalupe pequeño", price: 0, image: "/joyeria/oro laminado/dij (9).jpeg", description: "Dije oro laminado 18K." },
    { id: 6010, name: "dije Virgen de guadalupe grande", price: 0, image: "/joyeria/oro laminado/dij (10).jpeg", description: "Dije oro laminado 18K." },
    { id: 6011, name: "dije RX ref2", price: 0, image: "/joyeria/oro laminado/dij (11).jpeg", description: "Dije oro laminado 18K." },
    { id: 6012, name: "dije Atletico Nacional", price: 0, image: "/joyeria/oro laminado/dij (12).jpeg", description: "Dije oro laminado 18K." },
    { id: 6013, name: "dije San miguel Arcangel", price: 0, image: "/joyeria/oro laminado/dij (13).jpeg", description: "Dije oro laminado 18K." },
    { id: 6014, name: "dije RX grande ref3", price: 0, image: "/joyeria/oro laminado/dij (14).jpeg", description: "Dije oro laminado 18K." },
    { id: 6015, name: "dije virgen de guadalupe ref3", price: 0, image: "/joyeria/oro laminado/dij (15).jpeg", description: "Dije oro laminado 18K." },
    { id: 6016, name: "dije San benito ref1", price: 0, image: "/joyeria/oro laminado/dij (16).jpeg", description: "Dije oro laminado 18K." },
    { id: 6017, name: "dije Sagrada Familia ref2", price: 0, image: "/joyeria/oro laminado/dij (17).jpeg", description: "Dije oro laminado 18K." },
    { id: 6018, name: "dije Cruz ref1", price: 0, image: "/joyeria/oro laminado/dij (18).jpeg", description: "Dije oro laminado 18K." },
    { id: 6019, name: "dije virgen del carmen ref1", price: 0, image: "/joyeria/oro laminado/dij (19).jpeg", description: "Dije oro laminado 18K." },
    { id: 6020, name: "dije Rostro de dios ref1", price: 0, image: "/joyeria/oro laminado/dij (20).jpeg", description: "Dije oro laminado 18K." },
    { id: 6021, name: "dije Corazon ref1", price: 0, image: "/joyeria/oro laminado/dij (21).jpeg", description: "Dije oro laminado 18K." },
    { id: 6022, name: "dije Cruz ref2", price: 0, image: "/joyeria/oro laminado/dij (22).jpeg", description: "Dije oro laminado 18K." },
    { id: 6023, name: "dije Oso ref1", price: 0, image: "/joyeria/oro laminado/dij (23).jpeg", description: "Dije oro laminado 18K." },
    { id: 6024, name: "dije Oso ref2", price: 0, image: "/joyeria/oro laminado/dij (24).jpeg", description: "Dije oro laminado 18K." },
    { id: 6025, name: "dije RX ref3", price: 0, image: "/joyeria/oro laminado/dij (25).jpeg", description: "Dije oro laminado 18K." },
    { id: 6026, name: "dije Caballo ref3", price: 0, image: "/joyeria/oro laminado/dij (26).jpeg", description: "Dije oro laminado 18K." },
    { id: 6027, name: "dije mini cruz ref1", price: 0, image: "/joyeria/oro laminado/dij (27).jpeg", description: "Dije oro laminado 18K." },
    { id: 6028, name: "dije Recordatorio ref1", price: 0, image: "/joyeria/oro laminado/dij (28).jpeg", description: "Dije oro laminado 18K." },
    { id: 6029, name: "dije Virgen del Carmen ref2", price: 0, image: "/joyeria/oro laminado/dij (29).jpeg", description: "Dije oro laminado 18K." },
    { id: 6030, name: "dije Van Cleef ref1", price: 0, image: "/joyeria/oro laminado/dij (30).jpeg", description: "Dije oro laminado 18K." },
  ];
  const pulperDijes = [
    { id: 10001, name: "Niña Patin", price: 0, image: "/joyeria/oro laminado/dijespulseras (1).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10002, name: "Cactus", price: 0, image: "/joyeria/oro laminado/dijespulseras (2).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10003, name: "Estrella ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (3).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10004, name: "Mariposa ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (4).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10005, name: "Luna ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (5).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10006, name: "Niño ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (6).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10007, name: "Virgen de guadalupe pequeña ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (7).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10008, name: "Virgen de guadalupe ref2", price: 0, image: "/joyeria/oro laminado/dijespulseras (8).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10009, name: "flecha", price: 0, image: "/joyeria/oro laminado/dijespulseras (9).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10010, name: "estrella ref2", price: 0, image: "/joyeria/oro laminado/dijespulseras (10).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10011, name: "esmeralda", price: 0, image: "/joyeria/oro laminado/dijespulseras (11).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10012, name: "Corazon ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (12).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10013, name: "Circon", price: 0, image: "/joyeria/oro laminado/dijespulseras (13).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10014, name: "Caballo ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (14).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10015, name: "Avion ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (15).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10016, name: "Ganster", price: 0, image: "/joyeria/oro laminado/dijespulseras (16).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10017, name: "San miguel", price: 0, image: "/joyeria/oro laminado/dijespulseras (17).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10018, name: "Oso ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (18).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10019, name: "Bolsa de dinero", price: 0, image: "/joyeria/oro laminado/dijespulseras (19).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10020, name: "Atelitico Nacional", price: 0, image: "/joyeria/oro laminado/dijespulseras (20).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10021, name: "Van Cleef", price: 0, image: "/joyeria/oro laminado/dijespulseras (21).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10022, name: "RX ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (22).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10023, name: "Caballo ref2", price: 0, image: "/joyeria/oro laminado/dijespulseras (23).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10024, name: "San Benito ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (24).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10025, name: "Virgen del Carmen ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (25).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10026, name: "RX ref2", price: 0, image: "/joyeria/oro laminado/dijespulseras (26).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10027, name: "Cruz ref1", price: 0, image: "/joyeria/oro laminado/dijespulseras (27).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10028, name: "Virgen del carmen ref2", price: 0, image: "/joyeria/oro laminado/dijespulseras (28).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10029, name: "RX grande ref3", price: 0, image: "/joyeria/oro laminado/dijespulseras (29).jpeg", description: "Dije para pulsera oro laminado 18K." },
    { id: 10030, name: "Rostro jesus ref.pul", price: 0, image: "/joyeria/oro laminado/dijespulseras (30).jpeg", description: "Dije para pulsera oro laminado 18K." },
  ];
  const pulseraBalineria = [
    { id: 5101, name: "Balineria lisa", price: 0, image: "/joyeria/oro laminado/bali (1).jpeg", description: "Muestra de pulsera oro laminado 18K." },
    { id: 5102, name: "balineria Rosa", price: 0, image: "/joyeria/oro laminado/bali (2).jpeg", description: "Muestra de pulsera oro laminado 18K." },
    { id: 5103, name: "Balineria Diamantada", price: 0, image: "/joyeria/oro laminado/bali (3).jpeg", description: "Muestra de pulsera oro laminado 18K." },
  ];
  const herrajesPulsera = [
    { id: 8001, name: "Herraje Versace", price: 0, image: "/joyeria/oro laminado/herraje (1).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8002, name: "Herraje San Benito", price: 0, image: "/joyeria/oro laminado/herraje (2).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8003, name: "Herraje Caballo ref1", price: 0, image: "/joyeria/oro laminado/herraje (3).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8004, name: "Herraje Timon ref1", price: 0, image: "/joyeria/oro laminado/herraje (4).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8005, name: "Herraje Virgen del Carmen", price: 0, image: "/joyeria/oro laminado/herraje (5).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8006, name: "Herraje San Benito pequeño ref2", price: 0, image: "/joyeria/oro laminado/herraje (6).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8007, name: "Herraje Bolsa de dinero", price: 0, image: "/joyeria/oro laminado/herraje (7).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8008, name: "Herraje Virgen de Guadalupe", price: 0, image: "/joyeria/oro laminado/herraje (8).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8009, name: "Herrajen ref1 virgen", price: 0, image: "/joyeria/oro laminado/herraje (9).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8010, name: "Herraje Sagrada Familia", price: 0, image: "/joyeria/oro laminado/herraje (10).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8011, name: "Herraje San Miguel", price: 0, image: "/joyeria/oro laminado/herraje (11).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8012, name: "Herraje Sagrada Familia ref2", price: 0, image: "/joyeria/oro laminado/herraje (12).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8013, name: "Herraje Rolex ref1", price: 0, image: "/joyeria/oro laminado/herraje (13).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8014, name: "Herraje Rolex ref2", price: 0, image: "/joyeria/oro laminado/herraje (14).jpeg", description: "Herraje para pulsera oro laminado 18K." },
    { id: 8015, name: "Herraje LV", price: 0, image: "/joyeria/oro laminado/herraje (15).jpeg", description: "Herraje para pulsera oro laminado 18K." },
  ];

  const goldGalleryExtrasDisplay = useMemo(() => mergeGallery(goldGalleryExtras, "cadena_cadenas"), [mergeGallery, goldGalleryExtras]);
  const dijGalleryExtrasDisplay = useMemo(() => mergeGallery(dijGalleryExtras, "cadena_dijes"), [mergeGallery, dijGalleryExtras]);
  const pulseraBalineriaDisplay = useMemo(() => mergeGallery(pulseraBalineria, "pulsera_balineria"), [mergeGallery, pulseraBalineria]);
  const herrajesPulseraDisplay = useMemo(() => mergeGallery(herrajesPulsera, "pulsera_herrajes"), [mergeGallery, herrajesPulsera]);
  const pulperDijesDisplay = useMemo(() => mergeGallery(pulperDijes, "pulsera_dijes"), [mergeGallery, pulperDijes]);

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

  const presPreviewImages = [
    "/joyeria/oro laminado/pres (1).jpeg",
    "/joyeria/oro laminado/pres (2).jpeg",
    "/joyeria/oro laminado/pres (3).jpeg",
    "/joyeria/oro laminado/pres (4).jpeg",
    "/joyeria/oro laminado/pres (5).jpeg",
    "/joyeria/oro laminado/pres (6).jpeg",
  ];
  // Galería destacada (Personaliza tu cadena) — con datos editables desde API
  const cadenaGalleryItems = cadenaGalleryMode === 'cadenas' ? goldGalleryExtrasDisplay : dijGalleryExtrasDisplay;
  const cadenaActiveGalleryItem = cadenaGalleryItems[cadenaGalleryIndex];
  const goToPrevCadenaImage = () => {
    setCadenaGalleryIndex((prev) =>
      cadenaGalleryItems.length ? (prev - 1 + cadenaGalleryItems.length) % cadenaGalleryItems.length : 0
    );
  };
  const goToNextCadenaImage = () => {
    setCadenaGalleryIndex((prev) =>
      cadenaGalleryItems.length ? (prev + 1) % cadenaGalleryItems.length : 0
    );
  };
  // Filtro de pulseras/dijes/herrajes — con datos editables desde API
  let pulseraGalleryItems: { id: number; name: string; price: number; image: string; description: string }[] = [];
  if (pulseraGalleryMode === 'balineria') {
    pulseraGalleryItems = pulseraBalineriaDisplay;
  } else if (pulseraGalleryMode === 'herrajes') {
    pulseraGalleryItems = herrajesPulseraDisplay;
  } else if (pulseraGalleryMode === 'dijes') {
    pulseraGalleryItems = pulperDijesDisplay;
  }
  // Aquí puedes agregar más filtros si tienes un filtro externo (por ejemplo, por tipo de pulsera o por nombre)
  const pulseraActiveGalleryItem = pulseraGalleryItems[pulseraGalleryIndex];
  const goToPrevPulseraImage = () => {
    setPulseraGalleryIndex((prev) =>
      pulseraGalleryItems.length ? (prev - 1 + pulseraGalleryItems.length) % pulseraGalleryItems.length : 0
    );
  };
  const goToNextPulseraImage = () => {
    setPulseraGalleryIndex((prev) =>
      pulseraGalleryItems.length ? (prev + 1) % pulseraGalleryItems.length : 0
    );
  };


  // Eliminado getGalleryOptions, ahora las opciones están hardcodeadas en cada modal
  // Agregar item a galería destacada (cadena)
  const addCadenaGalleryItem = (optionLabel?: string) => {
    if (!cadenaActiveGalleryItem) return;
    const imageNumber = cadenaGalleryIndex + 1;
    let label = optionLabel;
    const type: 'cadenas' | 'dijes' = cadenaGalleryMode;
    let nameToShow = label;
    if (!label) {
      if (cadenaGalleryMode === 'cadenas') {
        label = 'Cadena';
        nameToShow = `Cadena (Foto ${imageNumber})`;
      } else if (cadenaGalleryMode === 'dijes') {
        label = cadenaActiveGalleryItem.name;
        nameToShow = `Dije ${cadenaActiveGalleryItem.name} (Foto ${imageNumber})`;
      } else {
        label = cadenaActiveGalleryItem.name;
        nameToShow = `${cadenaActiveGalleryItem.name} (Foto ${imageNumber})`;
      }
    } else {
      if (cadenaGalleryMode === 'dijes') {
        nameToShow = `Dije ${label} (Foto ${imageNumber})`;
      } else {
        nameToShow = `${label} (Foto ${imageNumber})`;
      }
    }
    const key = `${cadenaActiveGalleryItem.image}::${label}::${cadenaGalleryMode}`;
    setCadenaGalleryCart((prev) => {
      const existing = prev.find((item) => item.id === key);
      if (existing) {
        return prev.map((item) =>
          item.id === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: key,
          name: nameToShow!,
          image: cadenaActiveGalleryItem.image,
          optionLabel: nameToShow!,
          quantity: 1,
          imageNumber,
          type,
        },
      ];
    });
  };
  // Agregar item a galería de pulsera (herrajes)
  const addPulseraGalleryItem = (optionLabel?: string) => {
    if (!pulseraActiveGalleryItem) return;
    const imageNumber = pulseraGalleryIndex + 1;
    let label = optionLabel;
    const type: 'balineria' | 'herrajes' | 'dijes' = pulseraGalleryMode;
    let nameToShow = label;
    if (!label) {
      if (pulseraGalleryMode === 'dijes') {
        label = pulseraActiveGalleryItem.name;
        nameToShow = `Dije ${pulseraActiveGalleryItem.name} (Foto ${imageNumber})`;
      } else if (pulseraGalleryMode === 'herrajes') {
        label = pulseraActiveGalleryItem.name;
        nameToShow = ` ${pulseraActiveGalleryItem.name} (Foto ${imageNumber})`;
      } else {
        label = 'Balineria';
        nameToShow = label;
      }
    } else if (pulseraGalleryMode === 'dijes') {
      nameToShow = `Dije ${label} (Foto ${imageNumber})`;
    } else if (pulseraGalleryMode === 'herrajes') {
      nameToShow = `Herraje ${label} (Foto ${imageNumber})`;
    }
    const key = `${pulseraActiveGalleryItem.image}::${label}::${pulseraGalleryMode}`;
    setPulseraGalleryCart((prev) => {
      const existing = prev.find((item) => item.id === key);
      if (existing) {
        return prev.map((item) =>
          item.id === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: key,
          name: nameToShow!,
          image: pulseraActiveGalleryItem.image,
          optionLabel: nameToShow!,
          quantity: 1,
          imageNumber,
          type,
        },
      ];
    });
  };

  const removeCadenaGalleryItem = (id: string) => {
    setCadenaGalleryCart((prev) => prev.filter((item) => item.id !== id));
  };
  const removePulseraGalleryItem = (id: string) => {
    setPulseraGalleryCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCadenaGalleryQuantity = (id: string, nextQuantity: number) => {
    if (nextQuantity <= 0) {
      removeCadenaGalleryItem(id);
      return;
    }
    setCadenaGalleryCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item
      )
    );
  };
  const updatePulseraGalleryQuantity = (id: string, nextQuantity: number) => {
    if (nextQuantity <= 0) {
      removePulseraGalleryItem(id);
      return;
    }
    setPulseraGalleryCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item
      )
    );
  };

  const clearCadenaGalleryCart = () => setCadenaGalleryCart([]);
  const clearPulseraGalleryCart = () => setPulseraGalleryCart([]);

  const normalizePhone = (value: string) => value.replace(/\D/g, "");
  const galleryCheckoutPhone = "3009870850";
  const buildCadenaGalleryMessage = () => {
    const lines = cadenaGalleryCart
      .map(
        (item) => {
          const optionText = item.type === 'dijes' ? `Dije ${item.optionLabel}` : item.optionLabel;
          return `- ${item.name} (${optionText}, Imagen ${item.imageNumber}) x${item.quantity}`;
        }
      )
      .join("\n");
    return [
      "Hola, quiero cotizar estas opciones de la galeria de cadenas:",
      "",
      "Productos seleccionados:",
      lines,
      "",
      `Total de seleccionados: ${cadenaGalleryCart.length}`,
    ].join("\n");
  };
  const buildPulseraGalleryMessage = () => {
    const lines = pulseraGalleryCart
      .map(
        (item) => {
          let optionText = item.optionLabel;
          if (item.type === 'dijes') optionText = `Dije ${item.optionLabel}`;
          if (item.type === 'herrajes') optionText = `Herraje ${item.optionLabel}`;
          if (item.type === 'balineria') optionText = `Balineria ${item.optionLabel}`;
          return `- ${item.name} (${optionText}, Imagen ${item.imageNumber}) x${item.quantity}`;
        }
      )
      .join("\n");
    return [
      "Hola, quiero cotizar estas opciones de la galeria de pulsera:",
      "",
      "Productos seleccionados:",
      lines,
      "",
      `Total de seleccionados: ${pulseraGalleryCart.length}`,
    ].join("\n");
  };
  const handleCadenaGalleryCheckout = () => {
    if (typeof window === "undefined" || cadenaGalleryCart.length === 0) {
      return;
    }
    const rawPhone = normalizePhone(galleryCheckoutPhone);
    const phone = rawPhone.length === 10 ? `57${rawPhone}` : rawPhone;
    const message = buildCadenaGalleryMessage();
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const handlePulseraGalleryCheckout = () => {
    if (typeof window === "undefined" || pulseraGalleryCart.length === 0) {
      return;
    }
    const rawPhone = normalizePhone(galleryCheckoutPhone);
    const phone = rawPhone.length === 10 ? `57${rawPhone}` : rawPhone;
    const message = buildPulseraGalleryMessage();
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col items-start">
            <button
              type="button"
              onClick={handleBack}
              className="text-amber-300 hover:text-amber-200"
            >
              ← Volver
            </button>
            <div className="w-full text-center mt-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-amber-200">
                Joyería
              </h1>
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="h-px w-10 bg-amber-500/70" />
                <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-300/90">
                  Detalles que trascienden
                </p>
                <span className="h-px w-10 bg-amber-500/70" />
              </div>
              <p className="text-zinc-300 mt-3 max-w-2xl mx-auto leading-relaxed">
                Descubre joyas en oro laminado 18K y plata ley 925. En las pulseras puedes elegir el color del hilo que prefieras. Encuentra mas estilos en nuestro Instagram y, si deseas personalizar una pieza o tienes alguna duda, escribe a nuestra linea de atencion.
              </p>
            </div>
          </div>
          <Link
            href="/cart/"
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
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Oro laminado 18K
              </h2>
              <p className="text-zinc-300 mt-2 text-sm sm:text-base">
                Piezas premium con acabado dorado y brillo intenso.
              </p>
              {/* Filtros oro laminado 18K */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['cadenas', 'pulseras', 'anillo', 'dije', 'candongas', 'combos', 'topos-aretes', 'pareja', 'virgen'].map((filtro) => (
                  <button
                    key={filtro}
                    type="button"
                    onClick={() => setOroFilter(filtro)}
                    className={`rounded-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold shadow border border-amber-400 transition-all duration-200 tracking-wide uppercase ${
                      oroFilter === filtro
                        ? 'bg-amber-400 text-black border-amber-400 shadow-md scale-105'
                        : 'bg-black/80 border-amber-400 text-amber-200 hover:bg-amber-500/10 hover:text-amber-300 hover:border-amber-300'
                    }`}
                    style={{letterSpacing: '0.04em', minWidth: '80px'}}
                  >
                    {filtro === 'topos-aretes' ? 'Topos y Aretes' : filtro.charAt(0).toUpperCase() + filtro.slice(1)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setOroFilter("")}
                  className={`rounded-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold shadow border border-amber-400 transition-all duration-200 tracking-wide uppercase ${
                    oroFilter === ""
                      ? 'bg-zinc-800 text-white border-amber-400 shadow-md scale-105'
                      : 'bg-black/80 border-amber-400 text-amber-200 hover:bg-amber-500/10 hover:text-amber-300 hover:border-amber-300'
                  }`}
                  style={{letterSpacing: '0.04em', minWidth: '80px'}}
                >
                  Todos
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {/* Card estilo joyería blanco y dorado filtrado */}
                            {/* Card de lujo y personalización de pulseras eliminado */}

              {/* Galeria destacada solo en Todos y cadenas */}
              {(oroFilter === "" || oroFilter === "cadenas") && (
                <div className="col-span-2 rounded-2xl border border-amber-500/40 bg-linear-to-b from-zinc-900/70 to-zinc-950/80 p-7 sm:p-8 min-h-50 sm:min-h-55 flex flex-col items-center justify-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:border-amber-400/70 hover:shadow-[0_12px_50px_rgba(217,119,6,0.15)] transition">
                  <span className="text-[11px] uppercase tracking-[0.35em] text-white/90">
                    Galeria destacada
                  </span>
                  <span className="mt-3 h-px w-12 bg-amber-500/40" />
                  <span className="mt-3 text-sm sm:text-base text-amber-200/90 font-semibold max-w-md">
                    Personaliza tu cadena para que te salga en precios mucho mas menores, desde los 80.000 y con dijes desde los 130.000 en adelante
                  </span>
                  <div className="mt-4 w-full max-w-xs">
                    <p className="text-xs sm:text-sm text-zinc-300">
                      Muestras de personalizacion: asi podria quedar tu cadena.
                    </p>
                    <div className="mt-2 grid grid-cols-3 gap-1.5">
                      {presPreviewImages.map((src, index) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => {
                            setSelectedImage(src);
                          }}
                          className="relative aspect-square rounded-md overflow-hidden border border-amber-500/10 hover:border-amber-400/60 transition"
                          aria-label="Abrir muestra de personalizacion"
                        >
                          <Image src={withBasePath(src)} alt="Muestra de personalizacion" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCadenaGalleryIndex(0);
                      setCadenaGalleryOpen(true);
                    }}
                    className="mt-5 inline-flex items-center justify-center rounded-full border border-amber-400/80 px-5 py-2 text-sm sm:text-base font-semibold text-amber-200 hover:border-amber-300 hover:text-amber-100 transition"
                  >
                    Ver galeria de cadenas
                  </button>
                </div>
              )}
              {/* Personaliza tu pulsera SIEMPRE visible, independiente de filtro */}
              <div className="col-span-2 rounded-2xl border border-amber-500/40 bg-linear-to-b from-zinc-900/70 to-zinc-950/80 p-7 sm:p-8 min-h-50 sm:min-h-55 flex flex-col items-center justify-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:border-amber-400/70 hover:shadow-[0_12px_50px_rgba(217,119,6,0.15)] transition">
                <span className="text-[11px] uppercase tracking-[0.35em] text-white/90">
                  Personaliza tu pulsera
                </span>
                <span className="mt-3 h-px w-12 bg-amber-500/40" />
                <span className="mt-3 text-sm sm:text-base text-amber-200/90 font-semibold max-w-md">
                  Personaliza tu pulsera para que te salga en precios mucho más bajos, desde los 30.000 y con dijes desde los 50.000 en adelante
                </span>
                <div className="mt-4 w-full max-w-xs">
                  <p className="text-xs sm:text-sm text-zinc-300">
                    Muestras de personalización: así podría quedar tu pulsera.
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                    {[
                      "/joyeria/oro laminado/muespul (1).jpeg",
                      "/joyeria/oro laminado/muespul (2).jpeg",
                      "/joyeria/oro laminado/muespul (3).jpeg"
                    ].map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => {
                          setSelectedImage(src);
                        }}
                        className="relative aspect-square rounded-md overflow-hidden border border-amber-500/10 hover:border-amber-400/60 transition"
                        aria-label="Abrir muestra de pulsera"
                      >
                        <Image src={withBasePath(src)} alt="Muestra de pulsera" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                  {/* ...existing code... */}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPulseraGalleryIndex(0);
                    setPulseraGalleryOpen(true);
                  }}
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-amber-400/80 px-5 py-2 text-sm sm:text-base font-semibold text-amber-200 hover:border-amber-300 hover:text-amber-100 transition"
                >
                  Ver galería de pulseras
                </button>
              </div>
              {goldItemsDisplay
                .filter((item) => {
                  if (oroFilter === "") return true;
                  const name = item.name.toLowerCase();
                  if (oroFilter === "cadenas") return name.includes("cadena");
                  if (oroFilter === "pulseras") return name.includes("pulsera");
                  if (oroFilter === "combos") return name.includes("combo");
                  if (oroFilter === "topos-aretes") return name.startsWith("topos") || name.startsWith("arete");
                  return name.startsWith(oroFilter);
                })
                .map((item) => (
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
                        <span className="text-base sm:text-lg text-amber-300 font-semibold">
                          {item.price > 0 ? `$${item.price.toLocaleString("es-CO")}` : "Consultar"}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="rounded-full bg-amber-500 text-black px-3 py-1.5 text-xs sm:text-sm font-semibold hover:bg-amber-400 transition flex items-center gap-2"
                        >
                            {addedId === item.id ? "✓" : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h12a1 1 0 001-1v-1a1 1 0 00-1-1H7zm0 0V6m0 7a1 1 0 001 1h8a1 1 0 001-1" />
                                </svg>
                                <span>Agregar</span>
                              </>
                            )}
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
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Plata ley 925
              </h2>
              <p className="text-zinc-300 mt-2 text-sm sm:text-base">
                Diseños elegantes con brillo natural y alta durabilidad.
              </p>
              <p className="mt-4 text-amber-200/90 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
                A partir de dos unidades recibiras un descuento
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {silverItemsDisplay.map((item) => (
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
                      <span className="text-base sm:text-lg text-amber-300 font-semibold">
                        {item.price > 0 ? `$${item.price.toLocaleString("es-CO")}` : "Consultar"}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="rounded-full bg-amber-500 text-black px-3 py-1.5 text-xs sm:text-sm font-semibold hover:bg-amber-400 transition flex items-center gap-2"
                      >
                        {addedId === item.id ? "✓" : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h12a1 1 0 001-1v-1a1 1 0 00-1-1H7zm0 0V6m0 7a1 1 0 001 1h8a1 1 0 001-1" />
                            </svg>
                            <span>Agregar</span>
                          </>
                        )}
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

      {/* Modal galería destacada (Personaliza tu cadena) */}
      {cadenaGalleryOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-4"
          onClick={() => setCadenaGalleryOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[85vh] bg-zinc-950/95 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl overflow-y-auto gallery-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-amber-500/10">
              <div className="flex-1 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-amber-200">
                  Galeria de cadenas en Oro laminado 18K
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Selecciona una imagen para ampliarla.
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCadenaGalleryMode('cadenas');
                      setCadenaGalleryIndex(0);
                    }}
                    className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition ${
                      cadenaGalleryMode === 'cadenas'
                        ? 'bg-amber-500 text-black'
                        : 'border border-amber-500/40 text-amber-200 hover:border-amber-300'
                    }`}
                  >
                    Cadenas
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCadenaGalleryMode('dijes');
                      setCadenaGalleryIndex(0);
                    }}
                    className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition ${
                      cadenaGalleryMode === 'dijes'
                        ? 'bg-amber-500 text-black'
                        : 'border border-amber-500/40 text-amber-200 hover:border-amber-300'
                    }`}
                  >
                    Dijes
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center rounded-full border border-amber-500/30 px-3 py-1 text-xs text-amber-200/90">
                  {cadenaGalleryItems.length} fotos
                </span>
                <button
                  onClick={() => setCadenaGalleryOpen(false)}
                  className="bg-black/80 border border-amber-500/40 text-white rounded-full w-9 h-9 flex items-center justify-center hover:text-amber-400 transition"
                  aria-label="Cerrar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-4">
              {cadenaActiveGalleryItem && (
                <div className="rounded-2xl border border-amber-500/20 bg-black/60 overflow-hidden">
                  <div className="relative h-65 sm:h-90 lg:h-105">
                    <button
                      type="button"
                      onClick={goToPrevCadenaImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 border border-amber-500/30 text-amber-200 hover:text-amber-100 hover:border-amber-400 transition"
                      aria-label="Anterior"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={goToNextCadenaImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 border border-amber-500/30 text-amber-200 hover:text-amber-100 hover:border-amber-400 transition"
                      aria-label="Siguiente"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(cadenaActiveGalleryItem.image);
                      }}
                      className="absolute inset-0"
                      aria-label="Abrir imagen"
                    >
                      <Image
                        src={withBasePath(cadenaActiveGalleryItem.image)}
                        alt={cadenaActiveGalleryItem.name}
                        fill
                        className="object-contain"
                      />
                    </button>
                  </div>
                  <div className="px-4 py-3 bg-zinc-950/60 border-t border-amber-500/10">
                    <p className="text-sm sm:text-base font-semibold text-amber-200 text-center">
                      {cadenaActiveGalleryItem.name}
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 text-center">
                      {cadenaActiveGalleryItem.description}
                    </p>
                    <div className="mt-4">
                      <p className="text-xs sm:text-sm text-zinc-300 text-center">
                        Selecciona una opcion para agregar al carrito de la galeria
                      </p>
                      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                        {cadenaGalleryMode === 'dijes' ? (
                          <button
                            type="button"
                            onClick={() => addCadenaGalleryItem()}
                            className="rounded-full border border-amber-500/40 px-4 py-1 text-xs sm:text-sm text-amber-200 hover:border-amber-300 hover:text-amber-100 transition"
                          >
                            Agregar
                          </button>
                        ) : (
                          (() => {
                            const isFoto5 = cadenaGalleryIndex === 4;
                            const options = isFoto5
                              ? ["Cadena 1", "Cadena 2", "Cadena 3", "Cadena 4", "Cadena 5"]
                              : ["Cadena 1", "Cadena 2", "Cadena 3", "Cadena 4", "Cadena 5", "Cadena 6"];
                            return options.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => addCadenaGalleryItem(option)}
                                className="rounded-full border border-amber-500/40 px-3 py-1 text-xs sm:text-sm text-amber-200 hover:border-amber-300 hover:text-amber-100 transition"
                              >
                                {option}
                              </button>
                            ));
                          })()
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 rounded-2xl border border-amber-500/40 bg-black p-4 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Image
                    src={withBasePath("/joyeria/logo.png")}
                    alt="Urlaty Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-amber-200">
                      Carrito de cadenas
                    </p>
                    <p className="text-[11px] text-amber-200/70">Solo para la galeria</p>
                  </div>
                </div>
                <span className="text-xs text-amber-200/90">{cadenaGalleryCart.length} seleccionadas</span>
              </div>
              {cadenaGalleryCart.length === 0 ? (
                <p className="text-xs sm:text-sm text-amber-200/70 mt-3">
                  Aun no has agregado opciones.
                </p>
              ) : (
                <div className="mt-3 grid gap-2">
                  {cadenaGalleryCart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-lg border border-amber-500/30 bg-black/80 p-2"
                    >
                      <div className="relative h-12 w-12 rounded-md overflow-hidden border border-amber-500/10">
                        <Image src={withBasePath(item.image)} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-amber-200 font-semibold">
                          {item.optionLabel}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateCadenaGalleryQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 rounded-full border border-amber-500/40 text-amber-200 hover:border-amber-300 hover:text-amber-100 transition flex items-center justify-center text-[10px]"
                        >
                          -
                        </button>
                        <span className="text-xs font-semibold w-5 text-center text-amber-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCadenaGalleryQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 rounded-full border border-amber-500/40 text-amber-200 hover:border-amber-300 hover:text-amber-100 transition flex items-center justify-center text-[10px]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCadenaGalleryItem(item.id)}
                        className="text-xs text-amber-300 hover:text-amber-100 transition"
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleCadenaGalleryCheckout}
                  className="w-full sm:flex-1 bg-amber-500 text-black py-2 rounded-full hover:bg-amber-400 transition text-sm font-semibold"
                >
                  Cotiza tu cadena personalizada
                </button>
                <button
                  type="button"
                  onClick={clearCadenaGalleryCart}
                  className="w-full sm:flex-1 border border-amber-500 text-amber-200 py-2 rounded-full hover:bg-amber-500/10 transition text-sm font-semibold"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto max-h-[44vh] pr-1">
              {cadenaGalleryItems.map((item, index) => (
                <button
                  key={`cadena-${item.id}`}
                  type="button"
                  onClick={() => {
                    setSelectedImage(item.image);
                  }}
                  className={`relative h-28 sm:h-32 bg-black rounded-xl overflow-hidden border transition ${
                    item.id === cadenaActiveGalleryItem?.id
                      ? "border-amber-400/80 shadow-[0_0_0_1px_rgba(245,158,11,0.45)]"
                      : "border-amber-500/10 hover:border-amber-500/40 hover:shadow-[0_0_0_1px_rgba(245,158,11,0.25)]"
                  }`}
                >
                  <span className="absolute left-2 top-2 z-10 rounded-full bg-black/80 border border-amber-400/60 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                    {index + 1}
                  </span>
                  <Image src={withBasePath(item.image)} alt={item.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Modal galería de personaliza tu pulsera (balineria, herrajes, dijes) */}
      {pulseraGalleryOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-4"
          onClick={() => setPulseraGalleryOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[85vh] bg-zinc-950/95 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl overflow-y-auto gallery-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-amber-500/10">
              <div className="flex-1 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-amber-200">
                  Galeria de pulsera en Oro laminado 18K
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Selecciona una imagen para ampliarla.
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPulseraGalleryMode('balineria');
                      setPulseraGalleryIndex(0);
                    }}
                    className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition ${
                      pulseraGalleryMode === 'balineria'
                        ? 'bg-amber-500 text-black'
                        : 'border border-amber-500/40 text-amber-200 hover:border-amber-300'
                    }`}
                  >
                    Balineria
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPulseraGalleryMode('herrajes');
                      setPulseraGalleryIndex(0);
                    }}
                    className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition ${
                      pulseraGalleryMode === 'herrajes'
                        ? 'bg-amber-500 text-black'
                        : 'border border-amber-500/40 text-amber-200 hover:border-amber-300'
                    }`}
                  >
                    Herrajes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPulseraGalleryMode('dijes');
                      setPulseraGalleryIndex(0);
                    }}
                    className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition ${
                      pulseraGalleryMode === 'dijes'
                        ? 'bg-amber-500 text-black'
                        : 'border border-amber-500/40 text-amber-200 hover:border-amber-300'
                    }`}
                  >
                    Dijes
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center rounded-full border border-amber-500/30 px-3 py-1 text-xs text-amber-200/90">
                  {pulseraGalleryItems.length} fotos
                </span>
                <button
                  onClick={() => setPulseraGalleryOpen(false)}
                  className="bg-black/80 border border-amber-500/40 text-white rounded-full w-9 h-9 flex items-center justify-center hover:text-amber-400 transition"
                  aria-label="Cerrar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-4">
              {pulseraActiveGalleryItem && (
                <div className="rounded-2xl border border-amber-500/20 bg-black/60 overflow-hidden">
                  <div className="relative h-65 sm:h-90 lg:h-105">
                    <button
                      type="button"
                      onClick={goToPrevPulseraImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 border border-amber-500/30 text-amber-200 hover:text-amber-100 hover:border-amber-400 transition"
                      aria-label="Anterior"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={goToNextPulseraImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 border border-amber-500/30 text-amber-200 hover:text-amber-100 hover:border-amber-400 transition"
                      aria-label="Siguiente"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(pulseraActiveGalleryItem.image);
                      }}
                      className="absolute inset-0"
                      aria-label="Abrir imagen"
                    >
                      <Image
                        src={withBasePath(pulseraActiveGalleryItem.image)}
                        alt={pulseraActiveGalleryItem.name}
                        fill
                        className="object-contain"
                      />
                    </button>
                  </div>
                  <div className="px-4 py-3 bg-zinc-950/60 border-t border-amber-500/10">
                    <p className="text-sm sm:text-base font-semibold text-amber-200 text-center">
                      {pulseraActiveGalleryItem.name}
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 text-center">
                      {pulseraActiveGalleryItem.description}
                    </p>
                    <div className="mt-4">
                      <p className="text-xs sm:text-sm text-zinc-300 text-center">
                        Selecciona una opcion para agregar al carrito de la galeria
                      </p>
                      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                        {(pulseraGalleryMode === 'dijes' || pulseraGalleryMode === 'herrajes') ? (
                          <button
                            type="button"
                            onClick={() => addPulseraGalleryItem()}
                            className="rounded-full border border-amber-500/40 px-4 py-1 text-xs sm:text-sm text-amber-200 hover:border-amber-300 hover:text-amber-100 transition"
                          >
                            Agregar
                          </button>
                        ) : (
                          (() => {
                            let options = ["Balin 3 liso ", "Balin 4 liso", "Balin 5 liso", "Balin 6 liso", "Balin 7 liso", "Balin 8 liso"];
                            if (pulseraActiveGalleryItem) {
                              const name = pulseraActiveGalleryItem.name.toLowerCase();
                              if (name.includes("rosa")) {
                                options = ["Balin 3 rosa", "Balin 4 rosa", "Balin 5 rosa", "Balin 6 rosa", "Balin 7 rosa", "Balin 8 rosa"];
                              } else if (name.includes("diamantada")) {
                                options = ["Balin 3 Diamantado", "Balin 4 Diamantado", "Balin 5 Diamantado", "Balin 6 Diamantado", "Balin 7 Diamantado", "Balin 8 Diamantado"];
                              }
                            }
                            return options.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => addPulseraGalleryItem(option)}
                                className="rounded-full border border-amber-500/40 px-3 py-1 text-xs sm:text-sm text-amber-200 hover:border-amber-300 hover:text-amber-100 transition"
                              >
                                {option}
                              </button>
                            ));
                          })()
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 rounded-2xl border border-amber-500/40 bg-black p-4 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Image
                    src={withBasePath("/joyeria/logo.png")}
                    alt="Urlaty Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-amber-200">
                      Carrito de pulsera
                    </p>
                    <p className="text-[11px] text-amber-200/70">Solo para la galeria</p>
                  </div>
                </div>
                <span className="text-xs text-amber-200/90">{pulseraGalleryCart.length} seleccionadas</span>
              </div>
              {pulseraGalleryCart.length === 0 ? (
                <p className="text-xs sm:text-sm text-amber-200/70 mt-3">
                  Aun no has agregado opciones.
                </p>
              ) : (
                <div className="mt-3 grid gap-2">
                  {pulseraGalleryCart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-lg border border-amber-500/30 bg-black/80 p-2"
                    >
                      <div className="relative h-12 w-12 rounded-md overflow-hidden border border-amber-500/10">
                        <Image src={withBasePath(item.image)} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-amber-200 font-semibold">
                          {item.optionLabel}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updatePulseraGalleryQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 rounded-full border border-amber-500/40 text-amber-200 hover:border-amber-300 hover:text-amber-100 transition flex items-center justify-center text-[10px]"
                        >
                          -
                        </button>
                        <span className="text-xs font-semibold w-5 text-center text-amber-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updatePulseraGalleryQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 rounded-full border border-amber-500/40 text-amber-200 hover:border-amber-300 hover:text-amber-100 transition flex items-center justify-center text-[10px]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePulseraGalleryItem(item.id)}
                        className="text-xs text-amber-300 hover:text-amber-100 transition"
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handlePulseraGalleryCheckout}
                  className="w-full sm:flex-1 bg-amber-500 text-black py-2 rounded-full hover:bg-amber-400 transition text-sm font-semibold"
                >
                  Cotiza tu pulsera personalizada
                </button>
                <button
                  type="button"
                  onClick={clearPulseraGalleryCart}
                  className="w-full sm:flex-1 border border-amber-500 text-amber-200 py-2 rounded-full hover:bg-amber-500/10 transition text-sm font-semibold"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto max-h-[44vh] pr-1">
              {pulseraGalleryItems.map((item, index) => (
                <button
                  key={`pulsera-${item.id}`}
                  type="button"
                  onClick={() => {
                    setSelectedImage(item.image);
                  }}
                  className={`relative h-28 sm:h-32 bg-black rounded-xl overflow-hidden border transition ${
                    item.id === pulseraActiveGalleryItem?.id
                      ? "border-amber-400/80 shadow-[0_0_0_1px_rgba(245,158,11,0.45)]"
                      : "border-amber-500/10 hover:border-amber-500/40 hover:shadow-[0_0_0_1px_rgba(245,158,11,0.25)]"
                  }`}
                >
                  <span className="absolute left-2 top-2 z-10 rounded-full bg-black/80 border border-amber-400/60 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                    {index + 1}
                  </span>
                  <Image src={withBasePath(item.image)} alt={item.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal para imagen grande */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-100 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-3xl max-h-[75vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-black/80 border border-amber-500/40 text-white rounded-full w-9 h-9 flex items-center justify-center hover:text-amber-400 transition z-101"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {selectedImage && (
              <Image
                src={withBasePath(selectedImage)}
                alt="Imagen ampliada"
                width={1000}
                height={700}
                className="object-contain w-full h-full rounded-lg"
                unoptimized
              />
            )}
          </div>
        </div>
      )}

      {/* Botón flotante Instagram */}
      <a
        href="https://www.instagram.com/urlaty_handles?igsh=cmg4bmFpeWM0OGU4"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 left-6 z-50 flex items-center gap-3 group"
      >
        <div className="bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
          <FaInstagram className="w-7 h-7 text-white" />
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-medium text-gray-800 whitespace-nowrap">Instagram de la tienda</p>
        </div>
      </a>

      {/* Botón flotante WhatsApp */}
      <a
        href="https://wa.me/3009870850?text=Hola"
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
