import type { APIRoute } from "astro";

// La versión en inglés se quitó por ahora: cualquier URL bajo /en redirige a la home en español
export const prerender = false;

export const GET: APIRoute = ({ redirect }) => redirect("/", 301);
