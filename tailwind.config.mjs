/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                // Configuramos 'Lora' como la fuente Serif principal
                serif: ['Lora', 'serif'],
                // Configuramos 'Montserrat' como la fuente Sans principal (opcional)
                sans: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [],
}