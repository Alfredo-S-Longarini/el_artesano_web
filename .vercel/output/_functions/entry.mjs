import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BoehYRX4.mjs';
import { manifest } from './manifest_CAw69zpt.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/send.astro.mjs');
const _page2 = () => import('./pages/en/_---slug_.astro.mjs');
const _page3 = () => import('./pages/prototipo.astro.mjs');
const _page4 = () => import('./pages/ruavisual.astro.mjs');
const _page5 = () => import('./pages/utilidades/links.astro.mjs');
const _page6 = () => import('./pages/utilidades/qr.astro.mjs');
const _page7 = () => import('./pages/utilidades/shorturl.astro.mjs');
const _page8 = () => import('./pages/utilidades.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/send.ts", _page1],
    ["src/pages/en/[...slug].ts", _page2],
    ["src/pages/prototipo.astro", _page3],
    ["src/pages/ruavisual.astro", _page4],
    ["src/pages/utilidades/links.astro", _page5],
    ["src/pages/utilidades/qr.astro", _page6],
    ["src/pages/utilidades/shorturl.astro", _page7],
    ["src/pages/utilidades/index.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "201f3410-38cf-4631-b54a-e1c6d3036a33",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
