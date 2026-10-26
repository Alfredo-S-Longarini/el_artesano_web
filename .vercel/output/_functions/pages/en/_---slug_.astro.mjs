export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = ({ redirect }) => redirect("/", 301);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
