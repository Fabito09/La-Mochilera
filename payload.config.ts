// Panel de administración (Payload) en /gestion-mochilera. Solo entran los dueños.
// Los datos viven en la base de datos Neon (Postgres) y las fotos en Vercel Blob.

import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { es } from "@payloadcms/translations/languages/es";
import { buildConfig } from "payload";
import { Media } from "@/cms/collections/media";
import { Orders } from "@/cms/collections/orders";
import { Products } from "@/cms/collections/products";
import { Users } from "@/cms/collections/users";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** Si se cambia, se renombra también la carpeta app/(payload)/gestion-mochilera. */
const ADMIN_ROUTE = "/gestion-mochilera";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    // Siempre claro: crema y café, como el sitio (ver app/(payload)/custom.scss).
    theme: "light",
    components: {
      // Barra de secciones arriba, en lugar del menú lateral desplegable.
      header: ["/cms/components/admin-top-nav#AdminTopNav"],
      Nav: "/cms/components/admin-top-nav#HiddenSideNav",
      graphics: {
        Logo: "/cms/components/admin-graphics#AdminLogo",
        Icon: "/cms/components/admin-graphics#AdminIcon",
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
  // /admin. La protección real es el inicio de sesión (ver cms/collections/users.ts).
  routes: { admin: ADMIN_ROUTE },
  collections: [Products, Orders, Media, Users],
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: "es",
  },
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    // Los cambios de estructura se aplican con migraciones (cms/migrations),
    // nunca automáticamente: la base de datos tiene datos reales del negocio.
    push: false,
    migrationDir: path.resolve(dirname, "cms/migrations"),
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
  typescript: { outputFile: path.resolve(dirname, "cms/payload-types.ts") },
});
