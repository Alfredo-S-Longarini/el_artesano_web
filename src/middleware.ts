import { defineMiddleware } from "astro:middleware";
import { MODO_REDISENO, RUTA_REDISENO } from "./config/sitio.js";

// Con el modo rediseño activo, cualquier página responde con la pantalla de
// rediseño y un 503 temporal. Los archivos de public/ (imágenes, robots.txt,
// favicons) y los assets de /_astro los sirve Vercel directamente y no pasan por acá.
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const enRediseno = pathname === RUTA_REDISENO || pathname === `${RUTA_REDISENO}/`;

  if (!MODO_REDISENO) {
    // Con el modo apagado, la pantalla de rediseño no existe para el público
    if (enRediseno) return context.redirect("/", 302);
    return next();
  }

  // Los endpoints de API no son páginas: se dejan pasar
  if (pathname.startsWith("/api/") || pathname.startsWith("/_")) return next();

  const respuesta = enRediseno ? await next() : await context.rewrite(RUTA_REDISENO);
  const headers = new Headers(respuesta.headers);
  headers.set("Retry-After", "604800"); // una semana, en segundos
  headers.set("Cache-Control", "no-store");
  return new Response(respuesta.body, { status: 503, headers });
});
