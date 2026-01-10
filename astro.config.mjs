// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://jacopen.wells.jp",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sanity({
      projectId: "wza0icfm",
      dataset: "production",
      useCdn: true,
    }),
  ],
});
