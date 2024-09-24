import { defineConfig } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://kencrocken.github.io",
  integrations: [
    icon({
      include: {
        "fa6-brands": ["linkedin", "github"],
        "fa6-solid": ["moon", "gears"],
      },
    }),
  ],
});
