// Las fechas del contenido son "AAAA-MM-DD" (medianoche UTC). Se formatean en
// UTC para que en Costa Rica (UTC-6) no se muestre el día anterior.
const longDateFormatter = new Intl.DateTimeFormat("es-CR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatLongDate(isoDate: string): string {
  return longDateFormatter.format(new Date(isoDate));
}
