// Datos de Costa Rica que comparten el sitio (formularios) y el panel.

export const COSTA_RICA_PROVINCES = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón",
] as const;

export type CostaRicaProvince = (typeof COSTA_RICA_PROVINCES)[number];
