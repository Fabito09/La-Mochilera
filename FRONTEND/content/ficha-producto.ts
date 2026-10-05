// FICHA DE PRODUCTO — textos comunes a todas las botas.
// Se editan acá sin tocar el diseño.

import { brandInfo } from "@/content/marca";

export interface Review {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  text: string;
}

export const careInstructions = [
  "Limpie el polvo con un cepillo de cerdas suaves después de cada uso.",
  "Si se mojan, déjelas secar a temperatura ambiente, lejos del sol directo y de fuentes de calor.",
  "Hidrate el cuero liso con crema o cera cada uno o dos meses; en nubuck, use un cepillo de goma y un protector específico.",
  "Guárdelas en un lugar ventilado y, si puede, con hormas de madera para conservar la forma.",
];

// PROVISIONAL: reemplazar por la política real de garantía y reparaciones.
export const warrantyText =
  "Para consultas sobre garantía, cambios o reparaciones, escríbanos por WhatsApp y le ayudamos a resolverlo.";

export const shippingText = `${brandInfo.shipping}. También puede probárselas en nuestro ${brandInfo.showroom.name}: ${brandInfo.showroom.schedule.toLowerCase()}.`;

/**
 * Reseñas por código de producto. PROVISIONAL: vacío hasta tener reseñas
 * reales (o hasta conectar una plataforma de reseñas).
 * Ejemplo: CME01: [{ author: "Ana", rating: 5, date: "2026-03-10", text: "..." }]
 */
export const productReviews: Record<string, Review[]> = {};
