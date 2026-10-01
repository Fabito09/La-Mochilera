// GUÍA DE TALLAS — del catálogo "Campaña 1 | 2026" (pág. 10).
// PROVISIONAL: la pág. 5 del catálogo usa otra equivalencia (US 5 = EU 38);
// hay que confirmar cuál es la correcta.

export interface SizeEquivalence {
  us: number;
  eu: number;
  cm: number;
}

export const sizeGuideTable: SizeEquivalence[] = [
  { us: 6, eu: 39, cm: 24 },
  { us: 7, eu: 40, cm: 25 },
  { us: 8, eu: 41, cm: 26 },
  { us: 9, eu: 42, cm: 27 },
  { us: 10, eu: 43, cm: 28 },
  { us: 11, eu: 44, cm: 29 },
  { us: 12, eu: 45, cm: 30 },
];

export const sizeGuideNotice =
  "Por su horma, las botas de cuero calzan una talla más grande que el calzado común: un botín talla 40 puede equivaler a un 41 de otro estilo de zapato.";

export const footMeasuringSteps = [
  "Colóquese cerca de una pared.",
  "Apoye el pie contra la pared, en perpendicular.",
  "Mida en línea recta desde el talón hasta el dedo más largo.",
  "Busque en la tabla la longitud de su pie más largo, en centímetros.",
];
