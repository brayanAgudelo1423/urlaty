"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function JoyeriaPage() {
  const router = useRouter();
  const [addedId, setAddedId] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"oro" | "plata">("oro");
  const assetBasePath = process.env.NODE_ENV === "production" ? "/urlaty" : "";
  const withBasePath = (src: string) => {
    if (src.startsWith("http")) {
      return src;
    }
    if (src.startsWith(assetBasePath)) {
      return encodeURI(src);
    }
    return encodeURI(`${assetBasePath}${src}`);
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
      price: 90000,
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
      price: 120000,
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
            href="/cart"
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
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {goldItems.map((item) => (
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
                        className="rounded-full bg-amber-500 text-black px-3 py-1.5 text-xs sm:text-sm font-semibold hover:bg-amber-400 transition"
                      >
                        {addedId === item.id ? "✓" : "Agregar"}
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
              {silverItems.map((item) => (
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
                        className="rounded-full bg-amber-500 text-black px-3 py-1.5 text-xs sm:text-sm font-semibold hover:bg-amber-400 transition"
                      >
                        {addedId === item.id ? "✓" : "Agregar"}
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

      {/* Modal para imagen grande */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-3xl max-h-[75vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-black/80 border border-amber-500/40 text-white rounded-full w-9 h-9 flex items-center justify-center hover:text-amber-400 transition z-[101]"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={withBasePath(selectedImage ?? "")}
              alt="Imagen ampliada"
              width={1000}
              height={700}
              className="object-contain w-full h-full rounded-lg"
            />
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
        <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
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
