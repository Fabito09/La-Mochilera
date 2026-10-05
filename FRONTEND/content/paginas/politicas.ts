// POLÍTICAS — garantía, envíos y devoluciones.
//
// PROVISIONAL: todo este archivo es un borrador redactado sin plazos ni
// montos para no prometer nada que el cliente no haya definido. Cuando La
// Mochilera confirme sus políticas, se reemplazan los textos y se cambia
// `isDraft` a false para quitar el aviso de borrador.

import { brandInfo } from "@/content/marca";
import type { InfoPageContent } from "@/lib/page-content";

export const warrantyPage: InfoPageContent = {
  eyebrow: "Ayuda",
  title: "Garantía y reparaciones",
  intro:
    "Una bota de cuero bien hecha está pensada para durar años. Si algo no está bien, queremos saberlo y resolverlo.",
  metaDescription:
    "Garantía y reparaciones de las botas de cuero La Mochilera: cómo hacer un reclamo y cuidar su par para que dure años.",
  isDraft: true,
  image: {
    src: "/brand/detalles/costura.webp",
    alt: "Doble costura en el talón de una bota de cuero color miel",
  },
  sections: [
    {
      heading: "Qué cubre la garantía",
      paragraphs: [
        "La garantía cubre defectos de fabricación: costuras que se sueltan, despegues de suela o fallas en herrajes y cierres que no se deban al uso normal.",
      ],
      bullets: [
        "Costuras que se abren sin haber sufrido un esfuerzo anormal.",
        "Despegue de la suela o del tacón.",
        "Fallas en ojalillos, cierres o herrajes.",
      ],
    },
    {
      heading: "Qué no cubre",
      bullets: [
        "El desgaste normal de la suela y del cuero por el uso.",
        "Daños por contacto prolongado con agua, calor directo o productos químicos.",
        "Arreglos o modificaciones hechas por terceros.",
        "Las marcas, arrugas y cambios de tono propios del cuero, que son parte de su carácter.",
      ],
    },
    {
      heading: "Cómo hacer un reclamo",
      paragraphs: [
        `Escríbanos por WhatsApp al ${brandInfo.whatsapp.label} con fotos del problema y el comprobante de compra. Revisamos cada caso y le proponemos la mejor solución: reparación, cambio o devolución, según corresponda.`,
      ],
    },
    {
      heading: "Reparaciones",
      paragraphs: [
        "Un par de cuero se puede recuperar muchas veces. Si sus botas necesitan un ajuste, un cambio de cordones o una revisión general, consúltenos y le indicamos las opciones disponibles.",
      ],
    },
  ],
};

export const shippingPage: InfoPageContent = {
  eyebrow: "Ayuda",
  title: "Envíos y devoluciones",
  intro: `${brandInfo.shipping}. También puede probarse sus botas en nuestro ${brandInfo.showroom.name}, con cita previa.`,
  metaDescription:
    "Envíos a toda Costa Rica, showroom en San Pedro con cita previa y cambios de talla de las botas La Mochilera.",
  isDraft: true,
  sections: [
    {
      heading: "Envíos",
      paragraphs: [
        "Enviamos a todo el país. El costo y el tiempo de entrega dependen de la zona y se confirman al coordinar su compra por WhatsApp.",
      ],
    },
    {
      heading: "Retiro y prueba en el showroom",
      paragraphs: [
        `Si prefiere probárselas antes, visítenos en el ${brandInfo.showroom.name}. Atendemos ${brandInfo.showroom.schedule.toLowerCase()}: escríbanos para reservar su horario.`,
      ],
    },
    {
      heading: "Cambios de talla",
      paragraphs: [
        "Si la talla no le queda, puede cambiarla por otra del mismo modelo, siempre que las botas estén sin uso, limpias y en su empaque original. Coordine el cambio por WhatsApp.",
        "Recuerde que las botas de cuero suelen calzar una talla más grande que el calzado común. Antes de comprar, revise la guía de tallas.",
      ],
    },
    {
      heading: "Devoluciones",
      paragraphs: [
        "Si el producto llegó con un defecto o no es el que pidió, escríbanos con fotos y lo resolvemos con un cambio o la devolución de su dinero.",
      ],
    },
  ],
};
