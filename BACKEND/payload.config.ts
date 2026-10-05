// Panel de administración (Payload) en /gestion-mochilera. Solo entran los dueños.
// Los datos viven en la base de datos Neon (Postgres) y las fotos en Vercel Blob.

import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { es } from "@payloadcms/translations/languages/es";
import { buildConfig } from "payload";
import { Customers } from "@/backend/collections/customers";
import { Media } from "@/backend/collections/media";
import { Orders } from "@/backend/collections/orders";
import { Products } from "@/backend/collections/products";
import { Users } from "@/backend/collections/users";
import { ADMIN_ROUTE } from "@/backend/panel-access";
import { siteUrl } from "@/content/marca";

const dirname = path.dirname(fileURLToPath(import.meta.url));


/**
 * Direcciones desde donde se aceptan sesiones (dueños y clientes). Una página
 * de otro sitio no puede usar la sesión de alguien: segunda barrera además de
 * las cookies SameSite. Incluye las versiones de prueba de Vercel y, fuera de
 * Vercel, la compu de desarrollo.
 */
const TRUSTED_ORIGINS = [
  siteUrl,
  ...[process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]
    .filter(Boolean)
    .map((host) => `https://${host}`),
  ...(process.env.VERCEL ? [] : ["http://localhost:3000", "http://localhost:3123"]),
];

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    // Siempre claro: crema y café, como el sitio (ver app/(payload)/custom.scss).
    theme: "light",
    components: {
      // Barra de secciones arriba, en lugar del menú lateral desplegable.
      header: ["/components/admin-top-nav#AdminTopNav"],
      Nav: "/components/admin-top-nav#HiddenSideNav",
      graphics: {
        Logo: "/components/admin-graphics#AdminLogo",
        Icon: "/components/admin-graphics#AdminIcon",
      },
    },
    meta: {
      titleSuffix: " · Panel La Mochilera",
      icons: [{ rel: "icon", url: "/icon.png" }],
      // El panel no debe aparecer en Google ni en otros buscadores.
      robots: { index: false, follow: false },
    },
  },
  // Dirección poco obvia a propósito: los robots que buscan paneles prueban
  // /admin. La protección real es el inicio de sesión (ver BACKEND/collections/users.ts).
  routes: { admin: ADMIN_ROUTE },
  collections: [Products, Orders, Customers, Media, Users],
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: "es",
  },
  secret: process.env.PAYLOAD_SECRET ?? "",
  csrf: TRUSTED_ORIGINS,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    // Los cambios de estructura se aplican con migraciones (BACKEND/migrations),
    // nunca automáticamente: la base de datos tiene datos reales del negocio.
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  plugins: [
    vercelBlobStorage({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: { disablePayloadAccessControl: true } },
      alwaysInsertFields: true,
      // Las fotos del celular pueden pesar más de lo que acepta el servidor:
      // se suben directo desde el navegador a Vercel Blob.
      clientUploads: true,
    }),
  ],
  graphQL: { disable: true },
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
