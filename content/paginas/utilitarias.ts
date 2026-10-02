// PÁGINAS UTILITARIAS — carrito, cuenta, búsqueda y página no encontrada.
//
// PROVISIONAL: el carrito y la cuenta se reemplazan por los reales cuando se
// defina la plataforma de e-commerce. Hoy explican que la compra es por WhatsApp.

export const cartPage = {
  highlight: "Próximamente: compras en línea",
  eyebrow: "Carrito",
  title: "Su carrito",
  intro:
    "Por ahora las compras se coordinan personalmente por WhatsApp: elija su modelo y talla en la tienda y escríbanos. Muy pronto podrá comprar directamente desde el sitio.",
  metaDescription: "Carrito de compras de La Mochilera · Casa de Cuero.",
};

export const accountPage = {
  eyebrow: "Mi cuenta",
  title: "Cuentas de cliente, muy pronto",
  intro:
    "Estamos preparando la tienda en línea. Cuando esté lista podrá crear su cuenta, ver sus pedidos y guardar sus datos de envío.",
  metaDescription: "Cuenta de cliente de La Mochilera · Casa de Cuero.",
};

export const searchPage = {
  eyebrow: "Buscar",
  title: "Buscar en la tienda",
  inputLabel: "¿Qué está buscando?",
  inputPlaceholder: "Ej.: nubuck, caña alta, negro, CME01",
  emptyQueryMessage: "Escriba un modelo, color, tipo de cuero o código.",
  noResultsMessage: "No encontramos productos con esa búsqueda.",
  metaDescription: "Busque botas de cuero por modelo, color, tipo de cuero o código.",
};

export const notFoundPage = {
  eyebrow: "Error 404",
  title: "Este sendero no lleva a ningún lado",
  intro: "La página que busca no existe o cambió de lugar. Le proponemos volver a terreno conocido.",
};
