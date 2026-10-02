// TEXTOS LEGALES — términos y condiciones, política de privacidad.
//
// PROVISIONAL: borradores genéricos de referencia. Deben ser revisados por un
// abogado en Costa Rica antes de publicar el sitio. Al tener la versión
// aprobada, reemplazar los textos y poner `isDraft: false`.

import { brandInfo } from "@/content/marca";
import type { InfoPageContent } from "@/lib/page-content";

export const termsPage: InfoPageContent = {
  eyebrow: "Legal",
  title: "Términos y condiciones",
  intro: `Estas condiciones regulan el uso de este sitio y las compras realizadas a ${brandInfo.name} · ${brandInfo.tagline}.`,
  metaDescription: "Términos y condiciones de uso y compra de La Mochilera · Casa de Cuero.",
  isDraft: true,
  sections: [
    {
      heading: "Uso del sitio",
      paragraphs: [
        "Al navegar este sitio usted acepta estos términos. El contenido, las fotografías, el logo y los textos pertenecen a La Mochilera y no pueden reproducirse sin autorización.",
      ],
    },
    {
      heading: "Productos y precios",
      paragraphs: [
        "Los precios se expresan en colones costarricenses (₡). Hacemos lo posible por mostrar los colores con fidelidad, pero pueden variar según la pantalla y porque el cuero nunca es idéntico entre piezas.",
        "La disponibilidad de modelos y tallas se confirma al momento de coordinar la compra.",
      ],
    },
    {
      heading: "Compras",
      paragraphs: [
        "Las compras se coordinan por WhatsApp. El pedido queda confirmado cuando se acuerdan el producto, la talla, el costo de envío y el pago.",
      ],
    },
    {
      heading: "Envíos, cambios y garantía",
      paragraphs: [
        "Las condiciones de envío, cambios, devoluciones y garantía se detallan en sus páginas correspondientes dentro de la sección de Ayuda.",
      ],
    },
    {
      heading: "Contacto",
      paragraphs: [
        `Para cualquier consulta sobre estos términos, escríbanos por WhatsApp al ${brandInfo.whatsapp.label}.`,
      ],
    },
  ],
};

export const privacyPage: InfoPageContent = {
  eyebrow: "Legal",
  title: "Política de privacidad",
  intro:
    "Cuidamos los datos que nos comparte y los usamos solo para atender su compra y, si así lo desea, enviarle novedades.",
  metaDescription: "Política de privacidad y tratamiento de datos personales de La Mochilera · Casa de Cuero.",
  isDraft: true,
  sections: [
    {
      heading: "Qué datos recopilamos",
      bullets: [
        "Los datos que nos da al comprar o consultar: nombre, teléfono, correo y dirección de entrega.",
        "Su correo electrónico, si se suscribe al newsletter.",
        "Datos de navegación anónimos, para entender cómo se usa el sitio y mejorarlo.",
      ],
    },
    {
      heading: "Para qué los usamos",
      bullets: [
        "Coordinar y entregar sus pedidos.",
        "Responder sus consultas.",
        "Enviarle novedades, solo si se suscribió. Puede darse de baja en cualquier momento.",
      ],
    },
    {
      heading: "Sus derechos",
      paragraphs: [
        "De acuerdo con la Ley N.º 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales, usted puede solicitar acceder, corregir o eliminar sus datos en cualquier momento.",
        `Para hacerlo, escríbanos por WhatsApp al ${brandInfo.whatsapp.label}.`,
      ],
    },
    {
      heading: "Con quién los compartimos",
      paragraphs: [
        "No vendemos ni cedemos sus datos. Solo los compartimos con quienes nos ayudan a entregar su pedido, como el servicio de mensajería, y únicamente con ese fin.",
      ],
    },
  ],
};
