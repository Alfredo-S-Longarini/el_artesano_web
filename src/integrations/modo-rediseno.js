// Con el modo rediseño activo, ninguna ruta se prerenderiza: así cada pedido
// pasa por el middleware (src/middleware.ts), que responde con la pantalla de
// rediseño y un 503. Con el modo apagado, cada página conserva su `prerender`.
import { MODO_REDISENO } from '../config/sitio.js';

export default function modoRediseno() {
  return {
    name: 'modo-rediseno',
    hooks: {
      'astro:route:setup': ({ route }) => {
        if (MODO_REDISENO) route.prerender = false;
      },
    },
  };
}
