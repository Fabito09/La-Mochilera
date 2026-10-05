// Mismo formato que el catálogo de la marca: ₡49,900
const thousandsFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function formatPriceInColones(amount: number): string {
  return `₡${thousandsFormatter.format(amount)}`;
}
