// AYUDA — preguntas frecuentes, guía de tallas y contacto.

import { brandInfo } from "@/content/marca";
import type { InfoPageContent } from "@/lib/page-content";

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqPage = {
  eyebrow: "Ayuda",
  title: "Preguntas frecuentes",
  intro: "Lo que más nos consultan sobre compras, tallas, envíos y cuidado de las botas.",
  metaDescription:
    "Preguntas frecuentes sobre cómo comprar, tallas, envíos, showroom y cuidado de las botas de cuero La Mochilera.",
};

export const faqItems: FaqItem[] = [
  {
    question: "¿Cómo compro?",
    answer: `Elija su modelo y talla en la tienda y escríbanos por WhatsApp al ${brandInfo.whatsapp.label}. Le confirmamos disponibilidad, costo de envío y forma de pago.`,
  },
  {
    question: "¿Hacen envíos?",
    answer: `Sí, ${brandInfo.shipping.toLowerCase()}. El costo y el tiempo de entrega dependen de la zona y se confirman al coordinar la compra.`,
  },
  {
    question: "¿Puedo probármelas antes de comprar?",
    answer: `Claro. Visítenos en el ${brandInfo.showroom.name}: atendemos ${brandInfo.showroom.schedule.toLowerCase()}.`,
  },
  {
    question: "¿Cómo elijo mi talla?",
    answer:
      "Por su horma, las botas de cuero calzan una talla más grande que el calzado común. Mida su pie y compárelo con nuestra guía de tallas; si duda entre dos, escríbanos y le ayudamos.",
  },
  {
    question: "¿De qué están hechas las botas?",
    answer:
      "De cuero vacuno 100% natural, en acabados Crazy Horse, Nubuck, Napa, Antique, Duna y Crazy honey, con suelas sintéticas antideslizantes.",
  },
  {
    // PROVISIONAL: confirmar medios de pago aceptados.
    question: "¿Qué formas de pago aceptan?",
    answer: "Las formas de pago disponibles se confirman al coordinar su compra por WhatsApp.",
  },
  {
    question: "¿Puedo cambiar la talla?",
    answer:
      "Sí, siempre que las botas estén sin uso, limpias y en su empaque original. Coordine el cambio por WhatsApp.",
  },
  {
    question: "¿Cómo cuido mis botas?",
    answer:
      "Cepíllelas después de usarlas, hidrate el cuero cada uno o dos meses y déjelas secar lejos del calor si se mojan. En la guía de cuidado encontrará el detalle para cada tipo de cuero.",
  },
];

export const sizeGuidePage = {
  eyebrow: "Ayuda",
  title: "Guía de tallas",
  intro:
    "Encuentre su talla en dos minutos: mida su pie y compárelo con la tabla. Si duda entre dos tallas, escríbanos.",
  metaDescription:
    "Tabla de tallas US, EU y centímetros de las botas La Mochilera y cómo medir su pie correctamente.",
};

export const contactPage: InfoPageContent = {
  eyebrow: "Contacto",
  title: "Hablemos",
  intro:
    "Le asesoramos con la talla, el modelo o el cuidado de sus botas. La forma más rápida de comunicarse es por WhatsApp.",
  metaDescription:
    "Contacte a La Mochilera por WhatsApp o visite el showroom en San Pedro con cita previa. Envíos a toda Costa Rica.",
  image: {
    src: "/brand/fotos/botas-duo-vertical.webp",
    alt: "Bota de nubuck camel y bota de cuero cognac sobre retazos de cuero",
  },
  sections: [],
};
