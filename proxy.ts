import { NextResponse, type NextRequest } from "next/server";
import {
  PANEL_KEY_COOKIE,
  PANEL_KEY_MAX_AGE_SECONDS,
  PANEL_KEY_PARAM,
  panelKey,
} from "@/backend/panel-access";

// Esconde el panel de administración: sin el enlace secreto (o la cookie que
// deja ese enlace), el panel y las rutas internas de los dueños responden 404
// igual que cualquier dirección inexistente. La contraseña sigue siendo la
// protección principal; esto evita que el panel siquiera se encuentre.
export async function proxy(request: NextRequest) {
  const key = await panelKey();
  const { nextUrl } = request;

  if (key && nextUrl.searchParams.get(PANEL_KEY_PARAM) === key) {
    // Primera visita con el enlace: se recuerda el navegador y se limpia la URL.
    const cleanUrl = nextUrl.clone();
    cleanUrl.searchParams.delete(PANEL_KEY_PARAM);
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(PANEL_KEY_COOKIE, key, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: PANEL_KEY_MAX_AGE_SECONDS,
    });
    return response;
  }

  if (key && request.cookies.get(PANEL_KEY_COOKIE)?.value === key) {
    return NextResponse.next();
  }

  if (nextUrl.pathname.startsWith("/api/")) {
    return new NextResponse("Not Found", { status: 404 });
  }
  // Muestra la misma página 404 que una dirección inventada.
  return NextResponse.rewrite(new URL("/pagina-no-encontrada", request.url));
}

// Next exige que el matcher sea texto fijo: si cambia ADMIN_ROUTE
// (BACKEND/panel-access.ts), cambiar también aquí.
// Rutas del panel y rutas internas que solo usa el panel (dueños, preferencias,
// bloqueos de edición). Las de la tienda (productos, fotos, clientes, pedidos)
// quedan fuera: las usa el sitio público.
export const config = {
  matcher: [
    "/gestion-mochilera",
    "/gestion-mochilera/:path*",
    "/api/users",
    "/api/users/:path*",
    "/api/payload-preferences/:path*",
    "/api/payload-locked-documents/:path*",
    "/api/payload-jobs/:path*",
    "/api/access",
  ],
};
