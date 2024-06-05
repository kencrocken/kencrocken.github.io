import { defineConfig } from 'astro/config';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  base: "new-site",
  integrations: [icon({
    include: {
      "fa6-brands": ["linkedin", "github"],
      "fa6-solid": ["moon"],
    }
  })]
});