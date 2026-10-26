// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({

  site: 'https://www.elartesanoweb.com/',
  
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'server',
  integrations: [
    react(),
    // El prototipo de la nueva home no se indexa
    sitemap({ filter: (page) => !page.includes('/prototipo') }),
  ],
  adapter: vercel({
    webAnalytics: { enabled: true },
  })
});