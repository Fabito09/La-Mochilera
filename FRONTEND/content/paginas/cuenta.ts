// Textos de "Mi cuenta": inicio de sesión, registro y perfil del cliente.

export const accountPage = {
  eyebrow: "Mi cuenta",
  title: "Mi cuenta",
  metaDescription: "Inicie sesión o cree su cuenta en La Mochilera · Casa de Cuero.",
  loginTitle: "Iniciar sesión",
  loginIntro: "Con su cuenta guarda sus datos de envío y ve el estado de sus pedidos.",
  newCustomerTitle: "¿Primera vez aquí?",
  newCustomerIntro:
    "Cree su cuenta en un minuto. La va a necesitar para comprar en línea cuando la tienda esté lista.",
  forgotPassword: "¿Olvidó su contraseña? Escríbanos por WhatsApp y le ayudamos a recuperarla.",
  welcome: (name: string) => `Hola, ${name}`,
  profileTitle: "Sus datos de envío",
  profileIntro: "Se usan para llenar su dirección automáticamente al comprar.",
  ordersTitle: "Sus pedidos",
  noOrders: "Todavía no tiene pedidos. Cuando compre, aparecen aquí con su estado.",
};

export const registerPage = {
  eyebrow: "Mi cuenta",
  title: "Crear cuenta",
  intro: "Complete sus datos. Solo los usamos para sus pedidos y nunca los compartimos.",
  metaDescription: "Cree su cuenta en La Mochilera · Casa de Cuero.",
  haveAccount: "¿Ya tiene cuenta?",
  privacyNotice: "Al crear su cuenta acepta nuestra",
};

/** Mensajes de error en "usted" (los de Payload vienen en "tú"). */
export const accountErrors = {
  wrongCredentials:
    "El correo o la contraseña no son correctos. Tras 5 intentos fallidos, la cuenta se bloquea 15 minutos.",
  emailTaken: "Ya existe una cuenta con ese correo. Inicie sesión con él.",
  passwordsDontMatch: "Las contraseñas no coinciden.",
  generic: "No pudimos completar la acción. Revise su conexión e inténtelo de nuevo.",
};

/** Mínimo de caracteres de la contraseña de un cliente. */
export const MIN_PASSWORD_LENGTH = 8;
