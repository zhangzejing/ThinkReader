import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { fileURLToPath } from 'node:url';
import { cp } from 'node:fs/promises';

export default defineConfig({
  base: process.env.PAGES_BASE || '/ThinkReader/',
  publicDir: false,
  plugins: [react(), { name: 'gallery-assets', async closeBundle() {
    // Publish final assets only; never include abandoned recordings or output downloads.
    for (const name of ['atlases','documents','mindmaps','previews','icon.svg'])
      await cp(`public/${name}`,`dist-pages/${name}`,{recursive:true});
    for (const name of ['attention','xro'])
      await cp(`public/slides/${name}-continuous.webp`,`dist-pages/slides/${name}-continuous.webp`,{recursive:true});

  } }],
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  css: { postcss: { plugins: [tailwindcss()] } },
  build: { outDir: 'dist-pages' },
});
