// Estados de un pedido. Los usan el panel (al cambiarlos) y "Mi cuenta" (al
// mostrárselos al cliente).

export const ORDER_STATUSES = [
  { label: "Pendiente de pago", value: "pendiente" },
  { label: "Pagado", value: "pagado" },
  { label: "Enviado", value: "enviado" },
  { label: "Entregado", value: "entregado" },
  { label: "Cancelado", value: "cancelado" },
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number]["value"];

export function orderStatusLabel(status: string): string {
  return ORDER_STATUSES.find((candidate) => candidate.value === status)?.label ?? status;
}
