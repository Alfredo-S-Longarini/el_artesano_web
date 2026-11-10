// Interruptor del "modo rediseño".
// true  → todas las rutas del sitio muestran la pantalla de rediseño
//         (src/pages/rediseno.astro) con estado HTTP 503 + Retry-After,
//         que le indica a Google que la pausa es temporal y no desindexa.
// false → el sitio vuelve a funcionar normal. Es lo único que hay que cambiar.
export const MODO_REDISENO = true;

// Ruta interna de la pantalla de rediseño
export const RUTA_REDISENO = '/rediseno';
