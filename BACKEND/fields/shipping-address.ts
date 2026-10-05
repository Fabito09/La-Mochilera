import type { Condition, Field } from "payload";
import { COSTA_RICA_PROVINCES } from "@/lib/costa-rica";

/**
 * Dirección de envío en Costa Rica. La usan los pedidos y la cuenta de cada
 * cliente (para no volver a escribirla en cada compra).
 */
export function shippingAddressFields(condition?: Condition): Field[] {
  return [
    {
      type: "row",
      admin: { condition },
      fields: [
        {
          name: "province",
          label: "Provincia",
          type: "select",
          options: COSTA_RICA_PROVINCES.map((value) => ({ label: value, value })),
        },
        { name: "canton", label: "Cantón", type: "text" },
        { name: "district", label: "Distrito", type: "text" },
      ],
    },
    {
      name: "address",
      label: "Dirección exacta (otras señas)",
      type: "textarea",
      admin: { condition },
    },
  ];
}
