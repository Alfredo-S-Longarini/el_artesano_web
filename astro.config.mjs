// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import modoRediseno from './src/integrations/modo-rediseno.js';

// https://astro.build/config
export default defineConfig({

  site: 'https://www.elartesanoweb.com/',
  
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'server',
  integrations: [
    react(),
    // Pausa del sitio mientras se rediseña: se prende/apaga en src/config/sitio.js
    modoRediseno(),
    // El prototipo de la nueva home no se indexa
    sitemap({ filter: (page) => !page.includes('/prototipo') && !page.includes('/rediseno') }),
  ],
  adapter: vercel({
    webAnalytics: { enabled: true },
  })
});