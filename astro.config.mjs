// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import tinaDirective from './astro-tina-directive/register.js';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tinaDirective()],
  vite: {
    plugins: [tailwindcss()],
  },
});