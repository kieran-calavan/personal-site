import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://kierancalavan.com',
  integrations: [tailwind({ applyBaseStyles: false })],
});
